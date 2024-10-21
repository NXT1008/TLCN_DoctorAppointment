import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Appointment } from '../../../models/Appointment';
import DateDisplay from './DateDisplay';
import TimeDisplay from './TimeDisplay';
import { Card } from '../../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppointmentStackParamList } from '../../../routers/Navigator/AppointmentNavigator';
import { Doctor } from '../../../models/Doctor';

interface Props {
  appointment: Appointment;
  onPress: () => void
}
const UpcomingAppointmentCard = (props: Props) => {
  const navigation = useNavigation<NavigationProp<AppointmentStackParamList>>();
  const { appointment, onPress } = props
  return (
    <Card styles={styles.cardContainer} shadowed>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../assets/images/doctor.png')}
          style={styles.profileImage}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{appointment.doctorId}</Text>
          <Text style={styles.specialty}>SpecializationId...</Text>
        </View>
      </View>
      <View style={styles.appointmentInfo}>
        <DateDisplay date={appointment.scheduleDate} />
        <>
          <TimeDisplay
            startTime={appointment.startTime}
            endTime={appointment.endTime}
          />
        </>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={onPress }>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkButton}
           onPress={() => {}}> 
          <Text style={styles.checkIcon}>✓</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('CancelAppointment', {appointment})}
          >
          <Text style={styles.cancelIcon}>✗</Text> 
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f4f6f9',
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#21a691',
    letterSpacing: 0,
    left: 0,
    top: 0,
  },
  specialty: {
    fontSize: 14,
    color: '#27403e',
    fontWeight: '400',
    marginTop: 6,
  },
  appointmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    alignItems: 'center',
  },
  appointmentDate: {
    marginRight: 10,
    color: '#333',
  },
  appointmentTime: {
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginRight: 12.8,
    marginLeft: 20,
  },
  detailsButton: {
    backgroundColor: '#27403e',
    height: 27,
    width: 174,
    borderRadius: 18,
    marginTop: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkButton: {
    backgroundColor: '#fff',
    height: 26,
    width: 26,
    borderRadius: 50,
    marginTop: 9,
  },
  cancelButton: {
    backgroundColor: '#fff',
    height: 26,
    width: 26,
    borderRadius: 50,
    marginTop: 9,
  },
  checkIcon: {
    color: '#27403e',
    fontSize: 18,
    textAlign: 'center',
  },
  cancelIcon: {
    color: '#27403e',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default UpcomingAppointmentCard;
