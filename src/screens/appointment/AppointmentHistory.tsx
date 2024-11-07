import React, { useEffect, useState } from 'react';
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
  TextComponent
} from '../../components'
import CompletedCard from './components/CompletedCard';
import UpcomingCard from './components/UpcomingCard';
import CancelCard from './components/CancelCard';
import {Doctor} from '../../models/Doctor';
import {Appointment} from '../../models/Appointment';
import firestore, {getDoc} from '@react-native-firebase/firestore';
import {fontFamilies} from '../../constants/fontFamilies';
import auth from '@react-native-firebase/auth';

const AppointmentScreen = (props: any) => {
  const {navigation} = props;
  const patientId = auth().currentUser?.uid;
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [statusFilter, setStatusFilter] = useState('Upcoming'); // Trạng thái hiện tại
  const [showComplete, setShowComplete] = useState<boolean>(false);
  const [showUpcoming, setShowUpcoming] = useState<boolean>(true);
  const [showCancel, setShowCancel] = useState<boolean>(false);

  useEffect(() => {
    const unsubcribe = getAllAppointmentByPatientID();

    return () => {
      if (unsubcribe) unsubcribe();
    };
  }, []);

  useEffect(() => {
    filterAppointments(statusFilter);
  }, [statusFilter, appointmentList]);

  // Hàm lọc cuộc hẹn dựa trên trạng thái
  const filterAppointments = (status: string) => {
    const filtered: Appointment[] = appointmentList.filter(
      appointment => appointment.status === status,
    );
    setFilteredAppointments(filtered);
  };

  const getAllAppointmentByPatientID = () => {
    return firestore()
      .collection('appointments')
      .where('patientId', '==', patientId)
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

  const getDoctorByAppointmentID = async (appointment: Appointment) => {
    const snap = await firestore()
      .collection('doctors')
      .doc(appointment.doctorId)
      .get(); // Sử dụng get() để lấy dữ liệu 1 lần

    if (snap.exists) {
      const doctor = snap.data() as Doctor;
      return doctor; // Trả về giá trị bác sĩ
    } else {
      console.error(
        'Doctor not found for appointment ID:',
        appointment.doctorId,
      );
      return null;
    }
  };

  // Hủy đăng ký listener khi component unmount

  const handleCompleteButtonClick = () => {
    setShowUpcoming(false);
    setShowComplete(true);
    setShowCancel(false);
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

  // Hiện tại là lấy tất cả Appointment của Patient do chưa truyền pId
  const getAppointmentByPatientID = async () => {
    await firestore()
      .collection('appointments')
      .get()
      .then(snap => {
        if (snap.empty) {
          console.log('Không có appointment');
        } else {
          const items: Appointment[] = []; // Tạo mảng hứng dữ liệu
          // duyệt từng item có trong snap, push vào trong list items
          snap.forEach((item: any) =>
            items.push({
              id: item.id,
              ...item.data(),
            }),
          );
          setAppointmentList(items);
        }
      })
      .catch(error => {
        console.log('Lỗi khi load dữ appointment' + error.message);
      });
  };

  return (
    <ContainerComponent>
      <TextComponent
        text="All Appointment"
        size={25}
        font={fontFamilies.semiBold}
        color="#0B8FAC"
        textAlign='center'
      />

      <Section styles={{marginTop: 10}}>
        <Row justifyContent='space-between'>
          <TouchableOpacity
            style={[styles.filterButton, showComplete && styles.buttonActive]}
            onPress={handleCompleteButtonClick}>
            <TextComponent 
             text= "Complete"
             size = {14}
             color='#ffffff'
             font = 'Poppins-Medium'
             />
          </TouchableOpacity>

          <TouchableOpacity
          style={[styles.filterButton, showUpcoming && styles.buttonActive]}
          onPress={handleUpcomingButtonClick}>
          <TextComponent
            text='Upcoming'
            size={14}
            color='#ffffff'
            font = 'Poppins-Medium'
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
              onPressRebook={async () => {
                const doctor = await getDoctorByAppointmentID(item);
                if (doctor) {
                  navigation.navigate('BookingScreen', {
                    data: doctor, // Truyền giá trị bác sĩ vào params
                  });
                } else {
                  console.error('Failed to get doctor data');
                }
              }}
              onPressAddReview={() =>
                navigation.navigate('ReviewScreen', {
                  data: {
                    ...item,
                    endTime: item.endTime.getTime(), // hoặc endTime.toISOString()
                    startTime: item.startTime.getTime(),
                    scheduleDate: item.scheduleDate.getTime(),
                  },
                })
              }
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
              onPressDetail={() => Alert.alert('Cập nhật Detail Appointment')}
              onPressOK={() => {
                Alert.alert('Hiển thị popup xác nhận hoàn thành cuộc hẹn');
              }}
              onPressCancel={() => {
                navigation.navigate('CancelAppointment', {
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

      {showCancel && (
        <FlatList
          data={filteredAppointments}
          renderItem={({item}) => (
            <CancelCard
              appointment={item}
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

export default AppointmentScreen;
