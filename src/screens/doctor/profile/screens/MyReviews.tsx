import {View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Card,
  ContainerComponent,
  Row,
  Section,
  TextComponent,
} from '../../../../components';
import {ArrowLeft2} from 'iconsax-react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';
import DoctorReviewComponent from '../components/DoctorReviewComponent';
import FontAweSome from 'react-native-vector-icons/FontAwesome';
import {Review} from '../../../../models/Review';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Doctor } from '../../../../models/Doctor';

const DoctorReviews = (props: any) => {
  const [selectedRating, setSelectedRating] = useState('All');
  const [reviews, setReviews] = useState<Review[]>([]);
  const user = auth().currentUser;
  const [doctor, setDoctor] = useState<Doctor>();

  useEffect(() => {
    if (doctor?.doctorId) {
      const unsubscribe = firestore()
        .collection('reviews')
        .where('doctorId', '==', doctor?.doctorId)
        .onSnapshot(snapshot => {
          const reviewsData = snapshot.docs.map(doc => ({
            ...doc.data(),
            reviewId: doc.id,
          })) as Review[];
          setReviews(reviewsData);
        });
      return () => unsubscribe();
    }
  }, [doctor]);

  useEffect(() => {
    const unsubscribeDoctor = firestore()
      .collection('doctors')
      .where('email', '==', user?.email)
      .onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            const doctorData = snapshot.docs[0].data() as Doctor;
            setDoctor(doctorData);
          }
        },
        error => {
          console.error('Error listening to doctor changes:', error);
        },
    );
    
    return () => {
      unsubscribeDoctor();
      
    }
  }, []);

  const filteredData =
    selectedRating === 'All'
      ? reviews
      : reviews.filter(item => item.rating === parseFloat(selectedRating));

  return (
    <ContainerComponent isScroll style={{marginTop: -16}}>
      <Section styles={{paddingTop: 16}}>
        <Row justifyContent="flex-start">
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="My Reviews"
              size={25}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <Section>
        <Row>
          <ScrollView horizontal>
            {['All', '5', '4', '3', '2', '1'].map(rating => (
              <Card
                key={rating}
                styles={{
                  flexDirection: 'row',
                  justifyContent:
                    rating === 'All' ? 'space-between' : 'space-around',
                  paddingHorizontal: 8,
                  alignItems: 'baseline',
                  width: 60,
                  borderRadius: 20,
                  backgroundColor:
                    selectedRating === rating ? '#3da4a6' : '#fff',
                  borderColor: selectedRating === rating ? '#fff' : '#3da4a6',
                  borderWidth: selectedRating === rating ? 0 : 1,
                }}
                onPress={() => setSelectedRating(rating)}>
                <FontAweSome name="star" color={'#e6b800'} size={18} />
                <TextComponent
                  text={rating}
                  size={14}
                  font={fontFamilies.regular}
                  color={selectedRating === rating ? '#fff' : '#3da4a6'}
                />
              </Card>
            ))}
          </ScrollView>
        </Row>
      </Section>
      <Section>
        {filteredData.map((item, index) => (
          <DoctorReviewComponent key={index} data={item} />
        ))}
      </Section>
    </ContainerComponent>
  );
};

export default DoctorReviews;
