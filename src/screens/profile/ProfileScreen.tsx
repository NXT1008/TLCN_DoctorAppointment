import {Alert, Image, Touchable, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  GalleryEdit,
  PenAdd,
  Sms,
  UserEdit,
  Warning2,
} from 'iconsax-react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import ProfileComponent from './components/ProfileComponent';
import ModalComponent from './components/ModalComponent';
import deleteAllData from '../../data/zResetData';
import uploadDataToFirestore from '../../data/UploadDataToFirebase';
import firestore from '@react-native-firebase/firestore';
import {Patient} from '../../models/Patient';

const ProfileScreen = (props: any) => {
  const [user, setUser] = useState(auth().currentUser);

  useEffect(() => {
    // Lắng nghe sự thay đổi của trạng thái người dùng
    const unsubscribeAuth = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    // Hủy đăng ký listener khi component unmount
    return unsubscribeAuth;
  }, []);
  
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (!user?.uid) return; // Kiểm tra nếu user ID tồn tại trước khi gọi snapshot

    // Sử dụng onSnapshot để lắng nghe thay đổi thời gian thực
    const unsubscribe = firestore()
      .collection('patients')
      .doc(user.uid)
      .onSnapshot(
        docSnapshot => {
          if (docSnapshot.exists) {
            const patientData = docSnapshot.data() as Patient;
            setPatient(patientData); // Cập nhật state patient với dữ liệu mới
          } else {
            console.log('No such document!');
          }
        },
        error => {
          console.error('Error fetching patient:', error);
        },
      );

    // Hủy đăng ký listener khi component unmount
    return () => unsubscribe();
  }, [user?.uid]);

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
          <ArrowLeft2 color="#fff" />
          <TextComponent
            text="Profile"
            size={25}
            font={fontFamilies.semiBold}
            color="#0B8FAC"
          />
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('UpdateProfile', {patient});
            }}>
            <Edit color="#000" size={26} />
          </TouchableOpacity>
        </Row>
      </Section>
      <Section>
        <Row justifyContent="flex-start" styles={{paddingHorizontal: 20}}>
          <View>
            <Image
              source={require('../../assets/images/doctor.png')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                resizeMode: 'contain',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Update Image');
              }}>
              <View
                style={{
                  position: 'absolute',
                  height: 50,
                  width: 50,
                  bottom: -15,
                  right: -15,
                  backgroundColor: '#EBF0F0',
                  borderRadius: 100,
                  borderWidth: 5,
                  borderColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Edit2 color="#000" size={24} variant="Bold" />
              </View>
            </TouchableOpacity>
          </View>
          <Space width={30} />
          <Col>
            <TextComponent
              text={
                patient
                  ? patient.nickname
                    ? patient.nickname
                    : patient.name
                  : ''
              }
              size={20}
              font={fontFamilies.semiBold}
            />
            <TextComponent
              text={patient ? patient.gender : ''}
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
            text={
              patient
                ? patient.phone
                  ? patient.phone.slice(0, 4) +
                    '-' +
                    patient.phone.slice(4, 7) +
                    '-' +
                    patient.phone.slice(7)
                  : "Don't have"
                : ''
            }
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
            text={patient ? patient.email : ''}
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
          onPress={() => {
            props.navigation.navigate('ReportScreen');
          }}
        />
        <ProfileComponent
          text="Payment Methods"
          icon={<DocumentText color="#0B8FAC" />}
          onPress={() => {}}
        />
        <ProfileComponent
          text="My Favorites Doctors"
          icon={<DocumentText color="#0B8FAC" />}
          onPress={() => {
            props.navigation.navigate('MyfavoritesDoctor');
          }}
        />
        <ProfileComponent
          text="Privacy Polices"
          icon={<DocumentText color="#0B8FAC" />}
          onPress={() => {
            props.navigation.navigate('PrivacyPolicyScreen');
          }}
        />
        <ProfileComponent
          text="Settings"
          icon={<DocumentText color="#0B8FAC" />}
          onPress={() => {
            props.navigation.navigate('SettingScreen');
          }}
        />
        <ProfileComponent
          text="FAQs"
          icon={<DocumentText color="#0B8FAC" />}
          onPress={() => {
            props.navigation.navigate('FAQsScreen');
          }}
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
