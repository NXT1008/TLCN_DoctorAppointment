import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import CompletedCard from './components/CompletedCard';
import UpcomingCard from './components/UpcomingCard';
import CancelCard from './components/CancelCard';
import BottomNavigation from './components/BottomNavigation';
import {Patient} from '../../models/Patient';
import {Doctor} from '../../models/Doctor';

const appointments: Appointment[] = [
  {
    appointmentId: '1',
    patientId: 'p001',
    doctorId: 'd001',
    scheduleDate: new Date('2024-10-19T15:30:00'),
    startTime: new Date('2024-10-19T15:30:00'),
    endTime: new Date('2024-10-19T15:30:00'),
    status: 'completed',
    note: 'Hẹn gặp để kiểm tra sức khỏe tổng quát.',
  },
  {
    appointmentId: '2',
    patientId: 'p002',
    doctorId: 'd002',
    scheduleDate: new Date('2024-06-13'),
    startTime: new Date('2024-06-13T10:00:00'),
    endTime: new Date('2024-06-13T10:30:00'),
    status: 'booked',
    note: 'Hẹn gặp bác sĩ để kiểm tra da liễu.',
  },
  {
    appointmentId: '3',
    patientId: 'p003',
    doctorId: 'd001',
    scheduleDate: new Date('2024-06-14'),
    startTime: new Date('2024-06-14T11:00:00'),
    endTime: new Date('2024-06-14T11:30:00'),
    status: 'canceled',
    note: 'Hủy hẹn do lý do cá nhân.',
  },
  {
    appointmentId: '4',
    patientId: 'p004',
    doctorId: 'd003',
    scheduleDate: new Date('2024-06-15'),
    startTime: new Date('2024-06-15T14:00:00'),
    endTime: new Date('2024-06-15T14:30:00'),
    status: 'completed',
    note: 'Kiểm tra định kỳ sức khỏe cho bệnh nhân.',
  },
  {
    appointmentId: '5',
    patientId: 'p005',
    doctorId: 'd004',
    scheduleDate: new Date('2024-06-16'),
    startTime: new Date('2024-06-16T15:00:00'),
    endTime: new Date('2024-06-16T15:30:00'),
    status: 'booked',
    note: 'Khám sức khỏe tổng quát.',
  },
  {
    appointmentId: '6',
    patientId: 'p006',
    doctorId: 'd001',
    scheduleDate: new Date('2024-06-17'),
    startTime: new Date('2024-06-17T10:00:00'),
    endTime: new Date('2024-06-17T10:30:00'),
    status: 'completed',
    note: 'Hẹn gặp để kiểm tra tình trạng sức khỏe.',
  },
];
const doctors: Doctor[] = [
  {
    doctorId: 'doctor01',
    name: 'Dr. Olivia Turner, M.D.',
    email: 'olivia@example.com',
    phone: '123-456-7890',
    image: 'https://via.placeholder.com/150',
    specializationId: 'Dermato-Endocrinology',
    hospitalId: 'hosp001',
  },
  {
    doctorId: 'doctor02',
    name: 'Dr. Olivia Turner, M.D.',
    email: 'olivia@example.com',
    phone: '123-456-7890',
    image: 'https://via.placeholder.com/150',
    specializationId: 'Dermato-Endocrinology',
    hospitalId: 'hosp001',
  },
  {
    doctorId: 'doctor03',
    name: 'Dr. Alexander Bennett, Ph.D.',
    email: 'olivia@example.com',
    phone: '123-456-7890',
    image: 'https://via.placeholder.com/150',
    specializationId: 'Dermato-Endocrinology',
    hospitalId: 'hosp001',
  },
];

const AppointmentScreen: React.FC = () => {
  // const route = useRoute<RouteProp<RootStackParamList, 'AppointmentHistory'>>();
  // const { appointments, reviews } = route.params;

  const [showComplete, setShowComplete] = useState<boolean>(true);
  const [showUpcoming, setShowUpcoming] = useState<boolean>(false);
  const [showCancel, setShowCancel] = useState<boolean>(false);

  const handleCompleteButtonClick = () => {
    setShowUpcoming(false);
    setShowComplete(true);
    setShowCancel(false);
  };

  const handleUpcomingButtonClick = () => {
    setShowUpcoming(true);
    setShowComplete(false);
    setShowCancel(false);
  };

  const handleCancelButtonClick = () => {
    setShowUpcoming(false);
    setShowComplete(false);
    setShowCancel(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavigator}>
        <TouchableOpacity
          onPress={() => {
            {
            }
          }}
          style={styles.backButton}>
          <Image
            source={require('../../assets/images/back_arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>All Appointment</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, showComplete && styles.buttonActive]}
          onPress={handleCompleteButtonClick}>
          <Text style={styles.filterText}>Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, showUpcoming && styles.buttonActive]}
          onPress={handleUpcomingButtonClick}>
          <Text style={styles.filterText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, showCancel && styles.buttonActive]}
          onPress={handleCancelButtonClick}>
          <Text style={styles.filterText}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      {showComplete && (
        <FlatList
          data={appointments}
          renderItem={({item}) => (
            <CompletedCard appointment={item} review={undefined} />
          )}
          keyExtractor={item => item.appointmentId}
          showsVerticalScrollIndicator={false}
        />
      )}

      {showUpcoming && (
        <FlatList
          data={appointments}
          renderItem={({item}) => <UpcomingCard appointment={item} />}
          keyExtractor={item => item.appointmentId}
          showsVerticalScrollIndicator={false}
        />
      )}

      {showCancel && (
        <FlatList
          data={doctors}
          renderItem={({item}) => <CancelCard doctor={item} />}
          keyExtractor={item => item.doctorId}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
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
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
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
