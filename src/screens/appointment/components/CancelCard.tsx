import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Doctor } from '../../../models/Doctor';
import { Card } from '../../../components';
import { Appointment } from '../../../models/Appointment';
import { Specialization } from '../../../models/Specialization';
import firestore from '@react-native-firebase/firestore'

interface Props {
  appointment: Appointment,
  onPress: () => void
}

const DoctorCard = (props: Props) => {
  const { appointment, onPress } = props;
  const [doctor, setDoctor] = useState<Doctor>();
  const [specialization, setSpectialization] = useState<Specialization>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get doctor and specialization data in parallel
        const doctorDoc = await firestore()
          .collection('doctors')
          .doc(appointment.doctorId)
          .get();

        if (!doctorDoc.exists) {
          console.error('Doctor document not found');
          return;
        }

        const doctorData = doctorDoc.data() as Doctor;
        setDoctor(doctorData);

        const specDoc = await firestore()
          .collection('specializations') 
          .doc(doctorData.specializationId)
          .get();

        if (!specDoc.exists) {
          console.error('Specialization document not found');
          return;
        }

        setSpectialization(specDoc.data() as Specialization);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Card styles={styles.cardContainer} shadowed>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../assets/images/doctor.png')}
          style={styles.profileImage}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor?.name}</Text>
          <Text style={styles.specialty}>{specialization?.name}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.detailsButton} onPress={onPress}>
          <Text style={styles.buttonText}>Add Review</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
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
    fontFamily: 'Poppins-Medium'
  },
  specialty: {
    fontSize: 14,
    color: '#27403e',
    fontWeight: '400',
    marginTop: 6,
    fontFamily: 'Poppins-Regular'
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
    fontFamily: 'Poppins-Medium'
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
