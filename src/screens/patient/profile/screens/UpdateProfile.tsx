import firestore from '@react-native-firebase/firestore';
import { ArrowLeft2, Forbidden2, PasswordCheck, TickCircle } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Button,
  ContainerComponent,
  Input,
  Row,
  Section,
  Space,
  TextComponent
} from '../../../../components';
import { fontFamilies } from '../../../../constants/fontFamilies';
import { Patient } from '../../../../models/Patient';
import ModalComponent from '../components/ModalComponent';
import Toast from 'toastify-react-native'
import ToastComponent from '../components/ToastComponent'

const UpdateProfile = (props: any) => {
  const {patient} = props.route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');
  const [infoUpdate, setInfoUpdate] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setEmail(patient.email);
      setPhone(patient.phone);
      setGender(patient.gender);
      setAddress(patient.address ? patient.address : '');
    }
  }, []);

  const handleUpdateProfile = async () => {
    if (name === '') {
      Toast.warn('Please enter your full name');
      return;
    }
    if (email === '') {
      Toast.warn('Please enter your email');
      return;
    }
    if (phone === '') {
      Toast.warn('Please enter your phone');
      return;
    }
    if (phone.length !== 10 && phone.length !== 11) {
      Toast.warn('Phone must be exactly 10 or 11 digits');
      return;
    }
    if (address === '') {
      Toast.warn('Please enter your address');
      return;
    }

    // Update patient data here
    const oldPatient: Patient = patient;
    const updatedPatient: Patient = {
      patientId: oldPatient.patientId,
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      image: oldPatient.image,
      address: address,
    };
    await firestore()
      .collection('patients')
      .doc(updatedPatient.patientId)
      .update(updatedPatient)
      .then(() => {
        setInfoUpdate('Update success');
        setIsError(false);
      })
      .catch(e => {
        setInfoUpdate(e);
        setIsError(true);
      });
    setIsShowModal(true);
  };

  return (
    <ContainerComponent isScroll>
      <ToastComponent />
      <Section>
        <Row justifyContent="flex-start">
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="Edit Profile"
              size={20}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <Section styles={{paddingHorizontal: 20}}>
        <Input
          label="Full Name"
          labelStyleProps={{
            paddingHorizontal: 5,
            fontFamily: fontFamilies.semiBold,
            fontSize: 14,
          }}
          styles={{marginTop: -5, marginBottom: 10, borderRadius: 15}}
          value={name}
          onChange={setName}
          placeholder="Enter your full name"
          placeholderColor="gray"
          inputStyles={{fontFamily: fontFamilies.regular, fontSize: 14}}
          prefix
          bordered={false}
          color="#F5F5F5"
        />
        <Input
          label="Email"
          labelStyleProps={{
            paddingHorizontal: 5,
            fontFamily: fontFamilies.semiBold,
            fontSize: 14,
          }}
          styles={{marginTop: -5, marginBottom: 10, borderRadius: 15}}
          value={email}
          onChange={setEmail}
          placeholder="Enter your email name"
          placeholderColor="gray"
          inputStyles={{fontFamily: fontFamilies.regular, fontSize: 14}}
          prefix
          bordered={false}
          color="#F5F5F5"
        />
        <Input
          label="Phone"
          labelStyleProps={{
            paddingHorizontal: 5,
            fontFamily: fontFamilies.semiBold,
            fontSize: 14,
          }}
          styles={{marginTop: -5, marginBottom: 10, borderRadius: 15}}
          value={phone}
          onChange={setPhone}
          placeholder="Enter your phone"
          placeholderColor="gray"
          inputStyles={{fontFamily: fontFamilies.regular, fontSize: 14}}
          prefix
          bordered={false}
          color="#F5F5F5"
        />
        <TextComponent
          text="Gender"
          font={fontFamilies.semiBold}
          styles={{marginTop: -5, marginBottom: 5, paddingLeft: 5}}
        />
        <Row styles={{paddingHorizontal: 5}}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              gender === 'Male' && styles.roleButtonActive,
            ]}
            onPress={() => setGender('Male')}>
            <TextComponent
              text="Male"
              color={gender === 'Male' ? '#fff' : '#0ea6c7'}
              size={14}
              font={fontFamilies.medium}
            />
          </TouchableOpacity>
          <Space width={10} />
          <TouchableOpacity
            style={[
              styles.roleButton,
              gender === 'Female' && styles.roleButtonActive,
            ]}
            onPress={() => setGender('Female')}>
            <TextComponent
              text="Female"
              color={gender === 'Female' ? '#fff' : '#0ea6c7'}
              size={14}
              font={fontFamilies.medium}
            />
          </TouchableOpacity>
        </Row>
        <Space height={20} />
        <Input
          label="Address"
          labelStyleProps={{
            paddingHorizontal: 5,
            fontFamily: fontFamilies.semiBold,
            fontSize: 14,
          }}
          styles={{marginTop: -5, marginBottom: 10, borderRadius: 15}}
          value={address}
          onChange={setAddress}
          placeholder="Enter your address"
          placeholderColor="gray"
          inputStyles={{fontFamily: fontFamilies.regular, fontSize: 14}}
          prefix
          bordered={false}
          color="#F5F5F5"
        />
        <Space height={100} />
        <Button
          title="Update"
          color="#0B8FAC"
          styles={{marginTop: 10, marginHorizontal: 50}}
          textStyleProps={{fontFamily: fontFamilies.medium, fontSize: 16}}
          onPress={handleUpdateProfile}
        />
        <ModalComponent
          isVisible={isShowModal}
          message={infoUpdate}
          onConfirm={() => {
            setIsShowModal(false);
            props.navigation.goBack();
          }}
          type="one-button"
          icon={
            isError ? (
              <Forbidden2 color="red" size={30} />
            ) : (
              <TickCircle color="green" size={30} />
            )
          }
        />
      </Section>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  roleButton: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0ea6c7',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },

  roleButtonActive: {
    backgroundColor: '#0db4d9',
  },
});

export default UpdateProfile;
