import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import {
  Button,
  ContainerComponent,
  Row,
  Section,
  TextComponent,
} from '../../../components';
import CompletedCard from './components/CompletedCard';
import UpcomingCard from './components/UpcomingCard';
import CancelCard from './components/CancelCard';
import {Appointment} from '../../../models/Appointment';
import {Doctor} from '../../../models/Doctor';
import firestore, {getDoc} from '@react-native-firebase/firestore';
import {fontFamilies} from '../../../constants/fontFamilies';
import auth from '@react-native-firebase/auth';
import {Specialization} from '../../../models/Specialization';
import { Patient } from '../../../models/Patient';

const DoctorAppointment = (props: any) => {
  const { navigation } = props;

  const user = auth().currentUser
  const [doctor, setDoctor] = useState<Doctor>();

  const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
    >([]);
  
  const [statusFilter, setStatusFilter] = useState('Upcoming'); // Trạng thái hiện tại
  const [showComplete, setShowComplete] = useState<boolean>(false);
  const [showUpcoming, setShowUpcoming] = useState<boolean>(true);
  const [showCancel, setShowCancel] = useState<boolean>(false);

  const [patients, setPatients] = useState<{[key: string]: Patient}>({});



  // get info doctor
  useEffect(() => {
    const unsubscribeDoctor = firestore()
      .collection('doctors')
      .where('email', '==', user?.email)
      .onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            const doctorData = snapshot.docs[0].data() as Doctor;
            setDoctor(doctorData);
          }
        },
        error => {
          console.log('Error listening to doctor changes:', error);
        },
      );

    return () => {
      unsubscribeDoctor();
    };
  }, []);

  useEffect(() => {
    const unsubcribe = getAllAppointmentByDoctorID();

    return () => {
      if (unsubcribe) unsubcribe();
    };
  }, [doctor]);

  // effect fiilter
  useEffect(() => {
    filterAppointments(statusFilter);
  }, [statusFilter, appointmentList]);

  // Thêm useEffect mới để fetch tất cả patients
  useEffect(() => {
    const fetchDoctorsAndSpecializations = async () => {
      try {
        // Fetch all doctors
        const patientsSnapshot = await firestore().collection('patients').get();
        const patientsData: {[key: string]: Patient} = {};
        patientsSnapshot.forEach(doc => {
          patientsData[doc.id] = doc.data() as Patient;
        });
        setPatients(patientsData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDoctorsAndSpecializations();
  }, []);

  // Hàm lọc cuộc hẹn dựa trên trạng thái
  const filterAppointments = (status: string) => {
    const filtered: Appointment[] = appointmentList.filter(
      appointment => appointment.status === status,
    );
    setFilteredAppointments(filtered);
    // console.log("-------------------")
    // console.log(filtered.length)
  };

  const getAllAppointmentByDoctorID = () => {
    if (!doctor) return;
    return firestore()
      .collection('appointments')
      .where('doctorId', '==', doctor?.doctorId)
      .onSnapshot(
        docSnapShot => {
          if (docSnapShot.empty) {
            console.log('Không có appointment');
          } else {
            const items: Appointment[] = []; // Tạo mảng hứng dữ liệu
            docSnapShot.forEach((item: any) => {
              const appointmentData = {
                id: item.id,
                ...item.data(),
                scheduleDate: item.data().scheduleDate.toDate(), // Chuyển đổi sang Date
                startTime: item.data().startTime.toDate(), // Chuyển đổi sang Date
                endTime: item.data().endTime.toDate(), // Chuyển đổi sang Date
              };
              items.push(appointmentData);
            });
            setAppointmentList(items);
          }
        },
        error => {
          console.log('Lỗi khi load dữ appointment:', error.message); // Log lỗi nếu có
        },
      );
  };

  const getPatientByAppointment = async (appointment: Appointment) => {
    const snap = await firestore()
      .collection('patients')
      .doc(appointment.patientId)
      .get(); // Sử dụng get() để lấy dữ liệu 1 lần

    if (snap.exists) {
      const patient = snap.data() as Patient;
      return patient; // Trả về giá trị bác sĩ
    } else {
      console.error(
        'Patient not found for appointment ID:',
        appointment.patientId,
      );
      return null;
    }
  };

  const handleCompleteButtonClick = () => {
    setShowUpcoming(false);
    setShowComplete(true);
    setShowCancel(false);
    setStatusFilter('Complete');
  };

  const handleUpcomingButtonClick = () => {
    setShowUpcoming(true);
    setShowComplete(false);
    setShowCancel(false);
    setStatusFilter('Upcoming');
  };

  const handleCancelButtonClick = () => {
    setShowUpcoming(false);
    setShowComplete(false);
    setShowCancel(true);
    setStatusFilter('Canceled');
  };


  return (
    <ContainerComponent>
      <TextComponent
        text="All Appointment"
        size={25}
        font={fontFamilies.semiBold}
        color="#0B8FAC"
        textAlign="center"
      />

      <Section styles={{marginTop: 10}}>
        <Row justifyContent="space-between">
          <TouchableOpacity
            style={[styles.filterButton, showComplete && styles.buttonActive]}
            onPress={handleCompleteButtonClick}>
            <TextComponent
              text="Complete"
              size={14}
              color="#ffffff"
              font="Poppins-Medium"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, showUpcoming && styles.buttonActive]}
            onPress={handleUpcomingButtonClick}>
            <TextComponent
              text="Upcoming"
              size={14}
              color="#ffffff"
              font="Poppins-Medium"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, showCancel && styles.buttonActive]}
            onPress={handleCancelButtonClick}>
            <TextComponent
              text="Canceled"
              size={14}
              color="#ffffff"
              font="Poppins-Medium"
            />
          </TouchableOpacity>
        </Row>
      </Section>

      {showComplete && (
        <FlatList
          data={filteredAppointments}
          renderItem={({item}) => (
            <CompletedCard                      
              appointment={item}
              patient={patients[item.patientId]}
            />
          )}
          keyExtractor={item => item.appointmentId}
          showsVerticalScrollIndicator={false}
        />
      )}

      {showUpcoming && (
        <FlatList
          data={filteredAppointments}
          renderItem={({item}) => (
            <UpcomingCard
              appointment={item}
              patient={patients[item.patientId]}
              onPressDetail={async () => {
                const patient = await getPatientByAppointment(item)
                if (patient) {
                  navigation.navigate('DoctorReport',
                    {
                      patient: {
                        ...patient,
                      },
                      doctor: doctor,
                      appointment: {
                        ...item,
                        scheduleDate: item.scheduleDate.toISOString(),
                        startTime: item.startTime.toISOString(),
                        endTime: item.endTime.toISOString()
                      }
                    });
                }
              }}
              onPressCancel={() => {
                navigation.navigate('CancelAppointment', {
                  data: {
                    ...item,
                    endTime: item.endTime.getTime(),
                    startTime: item.startTime.getTime(),
                    scheduleDate: item.scheduleDate.getTime(),
                  },
                });
              }}
            />
          )}
          keyExtractor={item => item.appointmentId}
          showsVerticalScrollIndicator={false}
        />
      )}

      {showCancel && (
        <FlatList
          data={filteredAppointments}
          renderItem={({item}) => (
            <CancelCard
              appointment={item}
              patient={patients[item.patientId]}
              onPress={() => {
                navigation.navigate('ReviewScreen', {
                  data: {
                    ...item,
                    endTime: item.endTime.getTime(), // hoặc endTime.toISOString()
                    startTime: item.startTime.getTime(),
                    scheduleDate: item.scheduleDate.getTime(),
                  },
                });
              }}
            />
          )}
          keyExtractor={item => item.appointmentId}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  topNavigator: {
    flexDirection: 'row',
    top: 0,
  },
  backButton: {
    height: 46,
    width: 46,
    left: 0,
    top: 0,
    marginLeft: 30,
  },

  backImage: {
    height: 25,
    width: 25,
    top: 10,
    left: 10,
    position: 'absolute',
  },
  title: {
    color: '#21a691',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    fontWeight: '700',
    position: 'relative',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#21a691',
    padding: 10,
    borderRadius: 20,
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  buttonActive: {
    backgroundColor: '#27403e',
    color: '#fff',
  },
});

export default DoctorAppointment;
