import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Doctor} from '../../models/Doctor';
import {Patient} from '../../models/Patient';
import {Review} from '../../models/Review';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  ContainerComponent,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../components';
import {ArrowLeft2} from 'iconsax-react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Appointment} from '../../models/Appointment';
import firestore, {getDoc} from '@react-native-firebase/firestore';
import {Specialization} from '../../models/Specialization';

const ReviewScreen = ({navigation, route}: any) => {
  const {data} = route.params;
  const appointment = data as Appointment;
  const [doctor, setDoctor] = useState<Doctor>();
  const [specialization, setSpecialization] = useState<Specialization>();

  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      await getDoctorByAppointmentID();
    };
    fetchDoctorData();
  }, []);

  useEffect(() => {
    if (doctor) {
      const fetchSpecializationData = async () => {
        await getSpecializationByAppointmentID();
      };
      fetchSpecializationData();
    }
  }, [doctor]);

  const getDoctorByAppointmentID = async () => {
    await firestore()
      .collection('doctors')
      .doc(appointment.doctorId)
      .get()
      .then(snap => {
        const doctor = snap.data() as Doctor;
        setDoctor(doctor);
      });
  };

  const getSpecializationByAppointmentID = async () => {
    try {
      if (doctor) {
        const specDoc = await firestore()
          .collection('specializations')
          .doc(doctor?.specializationId)
          .get();
        if (specDoc.exists) {
          const specialization = specDoc.data() as Specialization;
          setSpecialization(specialization);
        } else {
          console.error('Specialization document not found');
        }
      }
    } catch (error) {
      console.error('Error fetching specialization:', error);
    }
  };

  const handleAddReview = async () => {
    const review: Review = {
      patientId: appointment.patientId,
      appointmentId: appointment.appointmentId,
      comment: comment,
      rating: rating,
      doctorId: appointment.doctorId,
      reviewId: '',
      reviewAt: new Date(),
    };

    setIsLoading(true);

    try {
      const reviewRef = await firestore().collection('reviews').add(review);
      const reviewId = reviewRef.id;
      await reviewRef.update({reviewId: reviewId});
      console.log('Review add successfully');
    } catch (error) {
      console.log('Cannot add review: ' + error);
    }

    // update star doctor
    try {
      const doctorRef = await firestore()
        .collection('doctors')
        .doc(appointment.doctorId);
      const item = (await doctorRef.get()).data() as Doctor;
      const oldAverage = item.ratingAverage || 0;
      const numberOfReview = item.numberOfReviews || 0;
      const newAverage =
        (oldAverage * numberOfReview + rating) / (numberOfReview + 1);

      await doctorRef.update({
        ratingAverage: newAverage,
        numberOfReviews: numberOfReview + 1,
      });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent
      isScroll
      style={{backgroundColor: '#fff', paddingHorizontal: 20}}>
      <Section styles={{marginBottom: 15}}>
        <Row justifyContent="flex-start">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="Review Doctor"
              size={20}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <TextComponent
        styles={{
          fontSize: 14,
          color: 'gray',
          marginVertical: 10,
          justifyContent: 'center',
          fontFamily: 'Poppins-Regular',
        }}
        text="It is very important to take care of the patient, the patient will be
        followed by the patient, but this time it will happen that there is a
        lot of work and pain."
      />

      <Image
        source={require('../../assets/images/doctor.png')}
        style={styles.image}
      />

      <TextComponent
        styles={{
          fontSize: 18,
          textAlign: 'center',
          color: '#21a691',
          fontFamily: fontFamilies.semiBold,
        }}
        text={`${doctor?.name}`}
      />
      <TextComponent
        styles={{
          fontSize: 14,
          textAlign: 'center',
          color: '#BDBDBD',
          fontFamily: 'Poppins-Regular',
        }}
        text={`${specialization?.name}`}
      />

      <View style={styles.ratingContainer}>
        <FontAwesome name="heart" color={'blue'} size={20} />

        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map(item => (
            <TouchableOpacity key={item} onPress={() => handleRating(item)}>
              {item <= rating ? (
                <FontAwesome name="star" color={'blue'} size={16} />
              ) : (
                <FontAwesome name="star-o" color={'blue'} size={16} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Input
        textAreal
        styles={styles.commentInput}
        inputStyles={{fontFamily: fontFamilies.regular, color: '#000'}}
        placeholder="Enter Your Comment Here..."
        placeholderColor="gray"
        value={comment}
        onChange={setComment}
      />
      <Space height={70} />
      <Section styles={{alignItems: 'center'}}>
        <Button
          title="Add Review"
          onPress={handleAddReview}
          styles={{
            backgroundColor: '#21a691',
            borderRadius: 15,
            width: '80%',
          }}
          textStyleProps={{
            fontFamily: fontFamilies.semiBold,
            fontSize: 16,
            color: '#fff',
          }}
        />
      </Section>
    </ContainerComponent>
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
    fontFamily: 'Poppins-Bold',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
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
    width: 15,
    height: 15,
  },
  commentInput: {
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#E8F5E9',
    textAlignVertical: 'top',
    height: 100,
    marginVertical: 30,
    fontFamily: 'Poppins-Regular',
  },
});

export default ReviewScreen;
