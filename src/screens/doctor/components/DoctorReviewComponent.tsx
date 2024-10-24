import {View, Text, Image} from 'react-native';
import React from 'react';
import {Card, Col, Row, Space, TextComponent} from '../../../components';
import {Star, Star1} from 'iconsax-react-native';
import {fontFamilies} from '../../../constants/fontFamilies';
import {waitForPendingWrites} from '@react-native-firebase/firestore';

const DoctorReviewComponent = () => {
  return (
    <Card styles={{borderRadius: 20}} color="#F6F6F6">
      <Row>
        <Image
          source={require('../../../assets/images/doctor.png')}
          style={{width: 50, height: 50, borderRadius: 100}}
        />
        <Space width={15} />
        <Col>
          <TextComponent
            text="Patient Name"
            font={fontFamilies.semiBold}
            size={14}
          />
          <Row justifyContent="flex-start" styles={{marginBottom:3, marginTop:-2}}>
            <Star1 color="#000" size={12} />
            <Star1 color="#000" size={12} />
            <Star1 color="#000" size={12} />
            <Star1 color="#000" size={12} />
            <Star1 color="#000" size={12} />
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
        text="Responding to online reviews shows that you are actively engaged with your patients and value their feedback."
        font={fontFamilies.regular}
        size={12}
      />
    </Card>
  );
};

export default DoctorReviewComponent;
