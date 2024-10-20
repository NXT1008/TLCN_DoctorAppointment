import {Alert, Image, Touchable, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Col,
  ContainerComponent,
  Divider,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../components';
import auth from '@react-native-firebase/auth';
import {
  Arrow,
  ArrowCircleLeft,
  ArrowLeft,
  ArrowLeft2,
  ArrowLeft3,
  ArrowRight,
  ArrowRight2,
  Back,
  Call,
  CallCalling,
  CallSlash,
  DocumentText,
  Edit,
  Edit2,
  Sms,
  UserEdit,
  Warning2,
} from 'iconsax-react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import ProfileComponent from './components/ProfileComponent';
import ModalComponent from './components/ModalComponent';

const ProfileScreen = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);

  const showAlert = () => {
    setAlertVisible(true);
  };

  const handleConfirm = async () => {
    setAlertVisible(false);
    auth().signOut();
  };

  const handleCancel = () => {
    // Xử lý khi nhấn Cancel
    setAlertVisible(false);
  };

  return (
    <ContainerComponent>
      <Section>
        <Row justifyContent="space-between">
          <ArrowLeft2 color="#000" />
          <TextComponent
            text="Profile"
            size={25}
            font={fontFamilies.semiBold}
            color="#0B8FAC"
          />
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Edit Profile');
            }}>
            <Edit color="#000" size={26} />
          </TouchableOpacity>
        </Row>
      </Section>
      <Section>
        <Row justifyContent="flex-start" styles={{paddingHorizontal: 20}}>
          <Image
            source={require('../../assets/images/doctor.png')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              resizeMode: 'contain',
            }}
          />
          <Space width={30} />
          <Col>
            <TextComponent
              text="UserName"
              size={20}
              font={fontFamilies.semiBold}
            />
            <TextComponent
              text="Gender"
              size={12}
              font={fontFamilies.regular}
            />
          </Col>
        </Row>
        <Space height={20} />
        <Row justifyContent="flex-start" styles={{paddingHorizontal: 30}}>
          <Call color="#000" />
          <Space width={20} />
          <TextComponent
            text="0793-988-509"
            size={12}
            font={fontFamilies.regular}
          />
        </Row>
        <Row
          justifyContent="flex-start"
          styles={{paddingHorizontal: 30, marginTop: 10}}>
          <Sms color="#000" />
          <Space width={20} />
          <TextComponent
            text="nguyenxuanthe@gmail.com"
            size={12}
            font={fontFamilies.regular}
          />
        </Row>
        <Divider />
      </Section>
      <Section styles={{paddingHorizontal: 20, marginTop: -10}}>
        <ProfileComponent
          text="My Report"
          icon={<DocumentText color="#0B8FAC" />}
          onPress={() => {}}
        />
        <ProfileComponent
          text="My Favorites Doctors"
          icon={<DocumentText color="#0B8FAC" />}
          onPress={() => {}}
        />
        <ProfileComponent
          text="Privacy Polices"
          icon={<DocumentText color="#0B8FAC" />}
          onPress={() => {}}
        />
        <ProfileComponent
          text="Settings"
          icon={<DocumentText color="#0B8FAC" />}
          onPress={() => {}}
        />
        <ProfileComponent
          text="FAQs"
          icon={<DocumentText color="#0B8FAC" />}
          onPress={() => {}}
        />
        <ProfileComponent
          text="Logout"
          icon={<DocumentText color="#0B8FAC" />}
          onPress={showAlert}
        />

        {/* {Show Popup} */}
        <ModalComponent
          isVisible={isAlertVisible}
          message="Do you want to exit?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          icon={<Warning2 color="#798001" size={30} />}
        />
      </Section>
    </ContainerComponent>
  );
};

export default ProfileScreen;
