import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Appointment} from '../../../models/Appointment';
import {Review} from '../../../models/Review';
import { Card } from '../../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppointmentStackParamList } from '../../../routers/Navigator/AppointmentNavigator';

interface Props {
  appointment: Appointment;
  review?: Review;
  onPress() : void
}
const CompletedAppointmentCard = (prop: Props) => {
  const navigation = useNavigation<NavigationProp<AppointmentStackParamList>>();
  const {appointment, review, onPress} = prop
  return (
    <Card styles={styles.appointmentContainer} shadowed>
      <View style={styles.profileInfo}>
        <Image
          source={require('../../../assets/images/doctor.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.doctorName}>{appointment.doctorId}</Text>
          <Text style={styles.specialty}>specializationId...</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{review?.rating}</Text>
            <Image
              source={require('../../../assets/images/fill-star.png')}
              style={styles.ratingIcon}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.rebookButton} onPress={onPress}>
          <Text style={styles.buttonText}>Re-Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addReviewButton} onPress={() => navigation.navigate('ReviewScreen', {appointment})}>
          <Text style={styles.buttonText}>Add Review</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  appointmentContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  doctorName: {
    fontSize: 16,
    color: '#21a691',
    letterSpacing: 0,
    left: 0,
    top: 0,
    fontFamily: 'Poppins-Medium'
  },
  specialty: {
    fontSize: 14,
    color: '#27403e',
    marginTop: 6,
    fontFamily: 'Poppins-Regular'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginRight: 5,
  },
  ratingIcon: {
    width: 16,
    height: 16,
  },
  favouriteIcon: {
    width: 16,
    height: 16,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginRight: 17,
    marginLeft: 17,
  },
  rebookButton: {
    backgroundColor: '#21a691',
    height: 27,
    width: 116,
    borderRadius: 18,
    marginTop: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addReviewButton: {
    backgroundColor: '#27403e',
    height: 27,
    width: 116,
    borderRadius: 18,
    marginTop: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Medium'
  },
});

export default CompletedAppointmentCard;
