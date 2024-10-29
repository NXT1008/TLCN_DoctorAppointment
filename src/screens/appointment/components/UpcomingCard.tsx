import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Appointment} from '../../../models/Appointment';
import DateDisplay from './DateDisplay';
import TimeDisplay from './TimeDisplay';
import {Card, TextComponent} from '../../../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppointmentStackParamList} from '../../../routers/Navigator/AppointmentNavigator';
import {Doctor} from '../../../models/Doctor';
import {Specialization} from '../../../models/Specialization';
import firestore from '@react-native-firebase/firestore';
import { specializations } from '../../../data';

interface Props {
  appointment: Appointment;
  onPressDetail: () => void;
  onPressOK: () => void;
  onPressCancel: () => void;
}
const UpcomingAppointmentCard = (props: Props) => {
  const {appointment, onPressDetail, onPressOK, onPressCancel} = props;
  const [doctor, setDoctor] = useState<Doctor>();
  const [specialization, setSpectialization] = useState<Specialization>();

  // Lấy doctor ra trước
  useEffect(() => {
    getDoctorByAppointmentID();
  }, [])

  // có doctor thì lấy spec
  useEffect(() => {
    if (doctor) {
      getSpecializationByDoctorID();
    }
  }, [doctor]);

  const getDoctorByAppointmentID = async () => {
    await firestore().collection('doctors').doc(appointment.doctorId)
      .onSnapshot(snap => {
        if (snap.exists) {
          setDoctor(snap.data() as Doctor);
        } else {
          console.error('Doctor document not found');
        }
      })
  };

  const getSpecializationByDoctorID = () => {
    firestore().collection('specializations').doc(doctor?.specializationId).onSnapshot(snap => {
      if (snap.exists) {
        setSpectialization(snap.data() as Specialization);
      }
      else {
        console.error('Specialization document not found');
      }
    })
  };

  return (
    <Card styles={styles.cardContainer} shadowed>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../assets/images/doctor.png')}
          style={styles.profileImage}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor?.name}</Text>
          <Text style={styles.specialty}>{specialization?.name }</Text>
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
        <TouchableOpacity style={styles.detailsButton} onPress={onPressDetail}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkButton} onPress={onPressOK}>
          <Text style={styles.checkIcon}>✓</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onPressCancel}>
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
    fontFamily: 'Poppins-Medium',
  },
  specialty: {
    fontSize: 14,
    color: '#27403e',
    fontWeight: '400',
    marginTop: 6,
    fontFamily: 'Poppins-Regular',
  },
  appointmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
  },
  appointmentDate: {
    marginRight: 10,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  appointmentTime: {
    color: '#333',
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Medium',
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
