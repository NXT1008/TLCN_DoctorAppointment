import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Doctor } from '../../models/Doctor';
import { Patient } from '../../models/Patient';
import { Review } from '../../models/Review';
import { useNavigation } from '@react-navigation/native';
import { Row, Section } from '../../components';
import { ArrowLeft2 } from 'iconsax-react-native';

const mockDoctor: Doctor = {
  doctorId: 'doctor01',
  name: 'Dr. Olivia Turner, M.D.',
  email: 'olivia@example.com',
  phone: '123-456-7890',
  image: 'https://via.placeholder.com/150',
  specializationId: 'Dermato-Endocrinology',
  hospitalId: 'hosp001',
};

const mockPatient: Patient = {
  patientId: 'patient1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  image: '',
};

const ReviewScreen = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleAddReview = () => {
    const newReview: Review = {
      reviewId: '1',
      appointmentId: '123',
      doctorId: mockDoctor.doctorId,
      patientId: mockPatient.patientId,
      rating: rating,
      comment: comment,
    };

    console.log(newReview);
  };

  return (
    <View style={styles.container}>
      <Section styles={styles.header}>
        <Row justifyContent='space-around'>
          <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
          <Text style={styles.headerText}>Review</Text>
        </Row>
      </Section>
      <Text style={styles.description}>
        It is very important to take care of the patient, the patient will be
        followed by the patient, but this time it will happen that there is a
        lot of work and pain.
      </Text>

      <Image
        source={require('../../assets/images/doctor.png')}
        style={styles.image}
      />

      <Text style={styles.doctorName}>{mockDoctor.name}</Text>
      <Text style={styles.doctorSpecialty}>{mockDoctor.specializationId}</Text>

      <View style={styles.ratingContainer}>
        <View style={styles.heartContainer}>
          <Image
            source={require('../../assets/images/heart.png')}
            style={styles.heartIcon}
          />
        </View>

        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map(item => (
            <TouchableOpacity key={item} onPress={() => handleRating(item)}>
              <Image
                source={
                  item <= rating
                    ? require('../../assets/images/fill-star.png')
                    : require('../../assets/images/empty_star.png')
                }
                style={styles.starIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="Enter Your Comment Here..."
        multiline
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddReview}>
        <Text style={styles.addButtonText}>Add Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#21a691',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold'
  },
  description: {
    fontSize: 14,
    color: '#A3B1B4',
    marginVertical: 10,
    justifyContent: 'center',
    fontFamily: 'Poppins-Regular'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  doctorName: {
    fontSize: 18,
    textAlign: 'center',
    color: '#21a691',
    fontFamily: 'Poppins-Medium'
  },
  doctorSpecialty: {
    fontSize: 14,
    textAlign: 'center',
    color: '#BDBDBD',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular'
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  heartContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 13,
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    position: 'relative',
    width: 11,
    height: 10,
  },
  starContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 13,
    height: 22,
    width: 123,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 5,
  },
  starIcon: {
    width: 11,
    height: 11,
  },
  commentInput: {
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#E8F5E9',
    textAlignVertical: 'top',
    height: 100,
    marginVertical: 20,
    fontFamily: 'Poppins-Regular'
  },
  addButton: {
    backgroundColor: '#21a691',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium'
  },
});

export default ReviewScreen;
