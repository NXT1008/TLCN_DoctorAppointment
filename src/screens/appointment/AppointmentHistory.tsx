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
} from '../../components';
import CompletedCard from './components/CompletedCard';
import UpcomingCard from './components/UpcomingCard';
import CancelCard from './components/CancelCard';
import {Doctor} from '../../models/Doctor';
import {Appointment} from '../../models/Appointment';
import firestore from '@react-native-firebase/firestore';
import {fontFamilies} from '../../constants/fontFamilies';
import auth from '@react-native-firebase/auth';

const AppointmentScreen = (props: any) => {
  const {navigation} = props;
  const patientId = auth().currentUser?.uid;
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [statusFilter, setStatusFilter] = useState(''); // Trạng thái hiện tại

  useEffect(() => {
    const unsubcribe = getAllAppointmentByPatientID();

    return () => {
      if (unsubcribe) unsubcribe();
    };
  }, []);

  const [showComplete, setShowComplete] = useState<boolean>(true);
  const [showUpcoming, setShowUpcoming] = useState<boolean>(false);
  const [showCancel, setShowCancel] = useState<boolean>(false);

  // Hàm lọc cuộc hẹn dựa trên trạng thái
  const filterAppointments = (status: string) => {
    setStatusFilter(status);
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
            console.log(appointmentList);
          }
        },
        error => {
          console.log('Lỗi khi load dữ appointment:', error.message); // Log lỗi nếu có
        },
      );
  };

  // Hủy đăng ký listener khi component unmount

  const handleCompleteButtonClick = () => {
    setShowUpcoming(false);
    setShowComplete(true);
    setShowCancel(false);
    setStatusFilter('Completed');
  };

  const handleUpcomingButtonClick = () => {
    setShowUpcoming(true);
    setShowComplete(false);
    setShowCancel(false);
    setStatusFilter('Upcomming');
  };

  const handleCancelButtonClick = () => {
    setShowUpcoming(false);
    setShowComplete(false);
    setShowCancel(true);
    setStatusFilter('Cancel');
  };

  // Hiện tại là lấy tất cả Appointment của Patient do chưa truyền pId

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
              text="Cancelled"
              size={14}
              color="#ffffff"
              font="Poppins-Medium"
            />
          </TouchableOpacity>
        </Row>
      </Section>

      {showComplete && (
        <FlatList
          data={appointmentList}
          renderItem={({item}) => (
            <CompletedCard
              appointment={item}
              review={undefined}
              onPressRebook={() => navigation.navigate('BookingScreen')}
              onPressAddReview={() => navigation.navigate('ReviewScreen')}
            />
          )}
          keyExtractor={item => item.appointmentId}
          showsVerticalScrollIndicator={false}
        />
      )}

      {showUpcoming && (
        <FlatList
          data={appointmentList}
          renderItem={({item}) => (
            <UpcomingCard
              appointment={item}
              onPressDetail={() => Alert.alert('Cập nhật Detail Appointment')}
              onPressOK={() => {
                Alert.alert('Hiển thị popup xác nhận hoàn thành cuộc hẹn');
              }}
              onPressCancel={() => {
                navigation.navigate('CancelAppointment');
              }}
            />
          )}
          keyExtractor={item => item.appointmentId}
          showsVerticalScrollIndicator={false}
        />
      )}

      {showCancel && (
        <FlatList
          data={appointmentList}
          renderItem={({item}) => (
            <CancelCard
              appointment={item}
              onPress={() => {
                navigation.navigate('ReviewScreen');
              }}
            />
          )}
          keyExtractor={item => item.doctorId}
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
