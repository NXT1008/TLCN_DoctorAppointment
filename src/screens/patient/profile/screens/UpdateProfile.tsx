import firestore from '@react-native-firebase/firestore';
import { ArrowLeft2, Forbidden2, TickCircle } from 'iconsax-react-native';
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
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [infoUpdate, setInfoUpdate] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isError, setIsError] = useState(false);

  const [role, setRole] = useState('male'); // thêm state role

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
    if (name === '') {
      Toast.warn('Please enter your full name');
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
        <Input
          label="Gender"
          labelStyleProps={{
            paddingHorizontal: 5,
            fontFamily: fontFamilies.semiBold,
            fontSize: 14,
          }}
          styles={{marginTop: -5, marginBottom: 10, borderRadius: 15}}
          value={gender}
          onChange={setGender}
          placeholder="Enter your gender"
          placeholderColor="gray"
          inputStyles={{fontFamily: fontFamilies.regular, fontSize: 14}}
          prefix
          bordered={false}
          color="#F5F5F5"
        />
        <TextComponent
          text="Gender"
          font={fontFamilies.semiBold}
          styles={{marginTop: -5, marginBottom: 5}}
        />
        <Row>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'male' && styles.roleButtonActive,
            ]}
            onPress={() => setRole('male')}>
            <TextComponent
              text="Male"
              color={role === 'male' ? '#fff' : '#21a691'}
              size={14}
              font={fontFamilies.regular}
            />
          </TouchableOpacity>
          <Space width={10} />
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'female' && styles.roleButtonActive,
            ]}
            onPress={() => setRole('female')}>
            <TextComponent
              text="Female"
              color={role === 'female' ? '#fff' : '#21a691'}
              size={14}
              font={fontFamilies.regular}
            />
          </TouchableOpacity>
        </Row>
        <Space height={20}/>
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
    borderColor: '#21a691',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },

  roleButtonActive: {
    backgroundColor: '#21a691',
  },
});

export default UpdateProfile;
