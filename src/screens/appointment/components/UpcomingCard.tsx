import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Appointment} from '../../../models/Appointment';
import DateDisplay from './DateDisplay';
import TimeDisplay from './TimeDisplay';

interface AppointmentCardProps {
  appointment: Appointment;
}
const UpcomingAppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../assets/images/doctor.png')}
          style={styles.profileImage}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{appointment.doctorId}</Text>
          <Text style={styles.specialty}>{appointment.specializationId}</Text>
        </View>
      </View>
      <View style={styles.appointmentInfo}>
        <DateDisplay date={appointment.schedule.date} />
        <>
          <TimeDisplay
            startTime={appointment.schedule.startTime}
            endTime={appointment.schedule.endTime}
          />
        </>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkButton}>
          <Text style={styles.checkIcon}>✓</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => {}}>
          <Text style={styles.cancelIcon}>✗</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#e6f0ff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flex: 1,
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
