import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Appointment} from '../../../../models/Appointment';
import {Review} from '../../../../models/Review';
import {Card, Row, Space, TextComponent} from '../../../../components';
import {Doctor} from '../../../../models/Doctor';
import {Specialization} from '../../../../models/Specialization';
import firestore, {doc} from '@react-native-firebase/firestore';
import {fontFamilies} from '../../../../constants/fontFamilies';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  appointment: Appointment;
  doctor: Doctor;
  specialization: Specialization;
  onPressRebook: () => void;
  onPressAddReview: () => void;
}
const CompletedAppointmentCard = (prop: Props) => {
  const {appointment, onPressAddReview, onPressRebook, doctor, specialization} =
    prop;

  return (
    <Card styles={styles.appointmentContainer} shadowed>
      <View style={styles.profileInfo}>
        <Image
          source={require('../../../../assets/images/doctor.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.doctorName}>{doctor?.name}</Text>
          <Text style={styles.specialty}>{specialization?.name}</Text>
          <Row
            justifyContent="flex-start"
            alignItems="baseline"
            styles={{marginTop: 0, marginBottom: -5}}>
            <FontAwesome name="star" size={16} color="#21a691" />
            <Space width={5} />
            <TextComponent
              font={fontFamilies.regular}
              size={12}
              text={`${doctor?.ratingAverage?.toFixed(1)}`}
            />
          </Row>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.rebookButton} onPress={onPressRebook}>
          <Text style={styles.buttonText}>Re-Book</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addReviewButton}
          onPress={onPressAddReview}>
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
    fontFamily: fontFamilies.medium,
  },
  specialty: {
    fontSize: 14,
    color: '#27403e',
    marginTop: 6,
    fontFamily: 'Poppins-Regular',
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
    height: 30,
    width: 116,
    borderRadius: 18,
    marginTop: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addReviewButton: {
    backgroundColor: '#27403e',
    height: 30,
    width: 116,
    borderRadius: 18,
    marginTop: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
});

export default CompletedAppointmentCard;
