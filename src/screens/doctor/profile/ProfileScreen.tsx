import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import {
  ArrowLeft2,
  Call,
  DocumentText,
  Edit,
  Edit2,
  Sms,
  Warning2,
  Star1
} from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  Col,
  ContainerComponent,
  Divider,
  Row,
  Section,
  Space,
  TextComponent
} from '../../../components';
import { fontFamilies } from '../../../constants/fontFamilies';
import { Doctor } from '../../../models/Doctor';
import ModalComponent from './components/ModalComponent';
import ProfileComponent from './components/ProfileComponent';

const ProfileScreen = (props: any) => {
  const user = auth().currentUser;

  const [doctor, setDoctor] = useState<Doctor>();
  const [image, setImage] = useState<string>('');

  const [isAlertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const unsubscribeDoctor = getInfoDoctor();

    return () => {
      unsubscribeDoctor();
    };
  }, []);

  const getInfoDoctor = () => {
    return firestore()
      .collection('doctors')
      .where('email', '==', user?.email)
      .onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            const doctorData = snapshot.docs[0].data() as Doctor;
            setDoctor(doctorData);
          } else {
            console.log('No such document!');
          }
        },
        error => {
          console.error('Error fetching doctor:', error);
        },
      );
  };

  const handleChooseImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    try {
      const result = await launchImageLibrary(options as ImageLibraryOptions);

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorMessage) {
        console.log('ImagePicker Error: ', result.errorMessage);
        return;
      }

      const imageUri = result?.assets?.[0]?.uri;
      if (!imageUri) {
        Alert.alert('Error', 'Failed to get image URI');
        return;
      }

      // Create form data
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'upload.jpg',
      });
      formData.append('upload_preset', 'DoctorAppointment');
      formData.append('folder', 'doctor-appointment/patient-avatars');

      // Upload to Cloudinary
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/xuanthe/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const downloadURL = response.data.secure_url;

      // Update Firestore
      await firestore().collection('doctors').doc(doctor?.doctorId).update({
        image: downloadURL,
      });

      setImage(downloadURL);
      getInfoDoctor();
      Alert.alert('Success', 'Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  const showAlert = () => {
    setAlertVisible(true);
  };

  const handleConfirm = async () => {
    setAlertVisible(false);
    auth().signOut();
  };

  const handleCancel = () => {
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
              props.navigation.navigate('UpdateProfile', {doctor});
            }}>
            <Edit color="#000" size={26} />
          </TouchableOpacity>
        </Row>
      </Section>
      <Section>
        <Row justifyContent="flex-start" styles={{paddingHorizontal: 20}}>
          <View>
            <Image
              source={
                doctor?.image
                  ? {uri: doctor.image}
                  : require('../../../assets/images/doctor.png')
              }
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                resizeMode: 'cover',
              }}
            />
            <TouchableOpacity onPress={handleChooseImage}>
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
              text={doctor ? doctor.name : ''}
              size={20}
              font={fontFamilies.semiBold}
            />
            <TextComponent
              text={doctor ? (doctor.gender ? doctor.gender : '') : ''}
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
              doctor
                ? doctor.phone
                  : `Don't have`
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
            text={doctor ? doctor.email : `Don't have`}
            size={12}
            font={fontFamilies.regular}
          />
        </Row>
        <Divider />
      </Section>
      <Section styles={{paddingHorizontal: 20, marginTop: -10}}>
        <ProfileComponent
          text="My Reviews"
          icon={<Star1 color="#0B8FAC" />}
          onPress={() => {
            props.navigation.navigate('DoctorReviews');
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
