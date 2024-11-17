import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  ContainerComponent,
  Input,
  Row,
  Section,
  Select,
  Space,
  TextComponent,
} from '../../../../components';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {ArrowLeft2, Forbidden2, TickCircle} from 'iconsax-react-native';
import {Patient} from '../../../../models/Patient';
import firestore from '@react-native-firebase/firestore';
import ModalComponent from '../components/ModalComponent';
import {updateCurrentUser} from '@react-native-firebase/auth';
import { Doctor } from '../../../../models/Doctor';

const UpdateProfile = (props: any) => {
  const {doctor} = props.route.params;
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [infoUpdate, setInfoUpdate] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (doctor) {
      setName(doctor.name);
      setNickname(doctor.nickname ? doctor.nickname : '');
      setEmail(doctor.email);
      setPhone(doctor.phone);
      setGender(doctor.gender);
      setAddress(doctor.address ? doctor.address : '');
    }
  }, []);

  const handleUpdateProfile = async () => {
    // Update patient data here
    const oldDoctor: Doctor = doctor;
    const updatedDoctor: Doctor = {
      doctorId: oldDoctor.doctorId,
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      image: oldDoctor.image,    
      hospitalId: oldDoctor.hospitalId,
      specializationId: oldDoctor.specializationId,
    };
    await firestore()
      .collection('doctors')
      .doc(updatedDoctor.doctorId)
      .update(updatedDoctor)
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

export default UpdateProfile;
