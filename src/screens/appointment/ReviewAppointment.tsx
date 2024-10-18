import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Review} from '../../models/Review';
<<<<<<< HEAD
import {User} from '../../models/Patient';
=======
import {User} from '../../models/User';
>>>>>>> 447045d (push my project)
const mockDoctor: User = {
  id: 'doctor1',
  name: 'Dr. Olivia Turner, M.D.',
  email: 'olivia@example.com',
  phone: '123-456-7890',
  role: 'doctor',
  profileImage: 'https://via.placeholder.com/150',
  address: '123 Medical Street',
  specializationId: 'Dermato-Endocrinology',
  hospitals: [
    {
      hospitalId: 'hosp001',
      name: 'City General Hospital',
      location: 'Ho Chi Minh City',
    },
  ],
  ratings: 4.5,
  medicalHistory: [],
};

const mockPatient: User = {
  id: 'patient1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  role: 'patient',
  profileImage: '',
  address: '456 Residential Road',
  medicalHistory: ['No known conditions', 'Badly'],
  specializationId: '',
  hospitals: [],
  ratings: 0,
};

const ReviewScreen = () => {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleAddReview = () => {
    const newReview: Review = {
      id: '1',
      appointmentId: '123',
      doctorId: mockDoctor.id,
      patientId: mockPatient.id,
      rating: rating,
      comment: comment,
    };

    console.log(newReview);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavigator}>
        <TouchableOpacity
<<<<<<< HEAD
          onPress={() => {
            {
            }
          }}
          style={styles.backButton}>
          <Image
            source={require('../../assets/images/back_arrow.png')}
=======
          onPress={() => {{}}}
          style={styles.backButton}>
          <Image
            source={require('../assets/back_arrow.png')}
>>>>>>> 447045d (push my project)
            style={styles.backImage}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Review</Text>
      <Text style={styles.description}>
        It is very important to take care of the patient, the patient will be
        followed by the patient, but this time it will happen that there is a
        lot of work and pain.
      </Text>

<<<<<<< HEAD
      <Image
        source={require('../../assets/images/doctor.png')}
        style={styles.image}
      />
=======
      <Image source={require('../../assets/images/doctor.png')} style={styles.image} />
>>>>>>> 447045d (push my project)

      <Text style={styles.doctorName}>{mockDoctor.name}</Text>
      <Text style={styles.doctorSpecialty}>{mockDoctor.specializationId}</Text>

      <View style={styles.ratingContainer}>
        <View style={styles.heartContainer}>
          <Image
<<<<<<< HEAD
            source={require('../../assets/images/heart.png')}
=======
            source={require('../assets/heart.png')}
>>>>>>> 447045d (push my project)
            style={styles.heartIcon}
          />
        </View>

        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map(item => (
            <TouchableOpacity key={item} onPress={() => handleRating(item)}>
              <Image
                source={
                  item <= rating
<<<<<<< HEAD
                    ? require('../../assets/images/fill-star.png')
                    : require('../../assets/images/empty_star.png')
=======
                    ? require('../assets/fill-star.png')
                    : require('../assets/empty_star.png')
>>>>>>> 447045d (push my project)
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
  description: {
    fontSize: 14,
    color: '#A3B1B4',
    marginVertical: 10,
    justifyContent: 'center',
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
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#21a691',
  },
  doctorSpecialty: {
    fontSize: 14,
    textAlign: 'center',
    color: '#BDBDBD',
    marginBottom: 20,
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
    fontWeight: 'bold',
  },
});

export default ReviewScreen;
