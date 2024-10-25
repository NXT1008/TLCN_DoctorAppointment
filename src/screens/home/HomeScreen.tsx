import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  ContainerComponent,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../components';
import auth from '@react-native-firebase/auth';
import { fontFamilies } from '../../constants/fontFamilies';
import DoctorCard from './components/DoctorCard';
import Swiper from 'react-native-swiper';
import SwiperOne from './components/SwiperOne';
import SpecializationComponent from './components/SpecializationComponent';
import { Message, Messages1, Messages3 } from 'iconsax-react-native';
import firestore from '@react-native-firebase/firestore';
import { Specialization } from '../../models/Specialization';
import { Doctor } from '../../models/Doctor';
import { Patient } from '../../models/Patient';

const HomeScreen = (props: any) => {
  const user = auth().currentUser;
  const { width, height } = Dimensions.get('window');
  const [listSpecialization, setListSpecialization] = useState<
    Specialization[]
  >([]);
  const [listDoctor, setListDoctor] = useState<Doctor[]>([]);

  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const getCurrentPatient = async () => {
      await firestore()
        .collection('patients')
        .doc(user?.uid)
        .get()
        .then(snap => {
          if (!snap.exists) {
            console.log('No such document!');
          } else {
            const patient = snap.data() as Patient;
            setPatient(patient);
          }
        })
        .catch(e => {
          console.log(e);
        });
    };
    getCurrentPatient();
  }, [patient]);

  useEffect(() => {
    getAllSpecializations();
    getAllDoctors();
  }, []);

  const getAllSpecializations = async () => {
    await firestore()
      .collection('specializations')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('Không có specialization');
          return;
        }
        const items: Specialization[] = [];
        snapshot.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
          });
        });
        setListSpecialization(items);
      })
      .catch(error => {
        console.error('Error fetching specializations:', error); // Log lỗi
      });
  };

  const getAllDoctors = async () => {
    await firestore()
      .collection('doctors')
      .get()
      .then(snap => {
        if (snap.empty) {
          console.log('Không có bác sĩ');
          return;
        }
        const items: Doctor[] = [];
        snap.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
          });
        });
        setListDoctor(items);
      })
      .catch(error => {
        console.error('Error fetching doctor:', error); // Log lỗi
      });
  };

  return (
    <>
      <ContainerComponent isScroll style={{ marginTop: -16 }}>
        <View>
          <Row
            styles={{
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingTop: 20,
              width: '100%',
            }}>
            <Row>
              <Image
                source={require('../../assets/IconTab/profile.png')}
                style={{ width: 50, height: 50 }}
              />
              <Space width={15} />
              <View>
                <TextComponent
                  text="Hi, welcome back!"
                  font={fontFamilies.regular}
                  color="#00000066"
                />
                <TextComponent
                  text={`${patient
                      ? patient.nickname
                        ? patient.nickname
                        : patient.name
                      : ''
                    }`}
                  font={fontFamilies.semiBold}
                />
              </View>
            </Row>
            <TouchableOpacity>
              <Image
                source={require('../../assets/IconTab/notification.png')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </Row>

          <Swiper height={270} style={{ marginTop: 20 }} activeDotColor="#1399ba">
            <SwiperOne />
            <SwiperOne />
            <SwiperOne />
            <SwiperOne />
          </Swiper>
          <Section>
            <Row justifyContent="space-between">
              <TextComponent
                text="Doctor Speciality"
                size={20}
                font={fontFamilies.semiBold}
              />
              <TextComponent
                text="See All"
                font={fontFamilies.regular}
                size={12}
              />
            </Row>
          </Section>
          <Section>
            <Row>
              <ScrollView horizontal>
                {listSpecialization.slice(0, 5).map((item, index) => (
                  <SpecializationComponent key={index} data={item} />
                ))}
              </ScrollView>
            </Row>
          </Section>
          <Section>
            <Row justifyContent="space-between">
              <TextComponent
                text="Top Doctors"
                font={fontFamilies.semiBold}
                size={20}
              />
              <TextComponent
                text="See All"
                font={fontFamilies.regular}
                size={12}
              />
            </Row>
            <Space height={10} />
            {listDoctor.slice(0, 5).map((item, index) => (
              <DoctorCard
                key={index}
                data={item}
                onPress={() => {
                  props.navigation.navigate('DoctorDetail', { doctor: item });
                }}
              />
            ))}
          </Section>
        </View>
      </ContainerComponent>
      {/* {Chat box} */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('ScheduleScreen')}
        style={{
          position: 'absolute',
          backgroundColor: '#3baae3',
          width: 60,
          height: 60,
          borderRadius: 100,
          borderWidth: 5,
          borderColor: '#8ac6e6',
          justifyContent: 'center',
          alignItems: 'center',
          right: width * 0.017,
          top: height * 0.845,
        }}>
        <View>
          <Messages1 size="35" color="#fff" variant="Bold" />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default HomeScreen;
