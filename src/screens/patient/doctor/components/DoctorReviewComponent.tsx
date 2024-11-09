import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Space, TextComponent} from '../../../../components';
import {Star, Star1} from 'iconsax-react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {waitForPendingWrites} from '@react-native-firebase/firestore';
import FontAweSome from 'react-native-vector-icons/FontAwesome';
import {Review} from '../../../../models/Review';
import firestore from '@react-native-firebase/firestore';
import {Patient} from '../../../../models/Patient';

interface Props {
  data: Review;
}

const DoctorReviewComponent = (props: Props) => {
  const {data} = props;
  const review = data as Review;
  const [patientReview, setPatientReview] = useState<Patient>();

  useEffect(() => {
    getPatientByReviewID();
  }, []);

  const getPatientByReviewID = () => {
    firestore()
      .collection('patients')
      .doc(review.patientId)
      .onSnapshot(snap => {
        if (snap.exists) {
          setPatientReview(snap.data() as Patient);
        } else {
          console.error('DocReviewCompo.tsx: Patient not found');
        }
      });
  };

  return (
    <Card styles={{borderRadius: 20}} color="#F6F6F6">
      <Row>
        <Image
          source={require('../../../../assets/images/doctor.png')}
          style={{width: 50, height: 50, borderRadius: 100}}
        />
        <Space width={15} />
        <Col>
          <TextComponent
            text={`${patientReview?.name}`}
            font={fontFamilies.semiBold}
            size={14}
          />
          <Row
            justifyContent="flex-start"
            styles={{marginBottom: 3, marginTop: -2}}>
            {Array.from({length: 5}).map((_, index) => (
              <FontAweSome
                key={index}
                name="star"
                color={index < review.rating ? '#e6b800' : '#cccccc'} // màu vàng cho sao được chọn, xám cho sao chưa chọn
              />
            ))}
          </Row>
          <TextComponent
            text="Octobus 24, 2024"
            size={10}
            color="gray"
            font={fontFamilies.regular}
          />
        </Col>
      </Row>
      <Space height={10} />
      <TextComponent
        text={review.comment}
        font={fontFamilies.regular}
        size={12}
      />
    </Card>
  );
};

export default DoctorReviewComponent;
