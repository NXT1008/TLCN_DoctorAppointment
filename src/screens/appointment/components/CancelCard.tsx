import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {User} from '../../../models/User';

interface DoctorProps {
  doctor: User;
}
const doctors: User[] = [
  {
    id: 'doctor01',
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
  },
  {
    id: 'patient01',
    name: 'Dr. Olivia Turner, M.D.',
    email: 'olivia@example.com',
    phone: '123-456-7890',
    role: 'patient',
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
  },
  {
    id: 'doctor02',
    name: 'Dr. Alexander Bennett, Ph.D.',
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
  },
];

const DoctorCard: React.FC<DoctorProps> = ({doctor}) => {
  const doctorsOnly: User[] = doctors.filter(
    doctor => doctor.role === 'doctor',
  );

  return (
    <View>
      {doctorsOnly.map(doctor => (
        <View key={doctor.id} style={styles.cardContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={require('../../../assets/images/doctor.png')}
              style={styles.profileImage}
            />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.specialty}>{doctor.specializationId}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.detailsButton} onPress={() => {}}>
              <Text style={styles.buttonText}>Add Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
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

export default DoctorCard;
