import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Card,
  Col,
  ContainerComponent,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../../components';
import auth from '@react-native-firebase/auth';
import {fontFamilies} from '../../../constants/fontFamilies';
import DoctorCard from './components/DoctorCard';
import Swiper from 'react-native-swiper';
import SwiperOne from './components/SwiperOne';
import SpecializationComponent from './components/SpecializationComponent';
import {Message, Messages1, Messages3} from 'iconsax-react-native';
import firestore from '@react-native-firebase/firestore';
import {Specialization} from '../../../models/Specialization';
import {Doctor} from '../../../models/Doctor';
import {Patient} from '../../../models/Patient';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = (props: any) => {
  const user = auth().currentUser;
  const {width, height} = Dimensions.get('window');
  const [listSpec, setListSpecialization] = useState<Specialization[]>([]);
  const [listDoctor, setListDoctor] = useState<Doctor[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const [loadingSpecialization, setLoadingSpecialization] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // useFocusEffect(
  //   useCallback(() => {
  //     getAllSpecializations();
  //     getAllDoctors();
  //     getPatientInfo();
  //   }, []),
  // );

  // Sử dụng useEffect để setup realtime listener
  useEffect(() => {
    // Tạo listener cho thông tin patient
    const unsubscribePatient = firestore()
      .collection('patients')
      .doc(user?.uid)
      .onSnapshot(
        snapshot => {
          if (snapshot.exists) {
            setPatient(snapshot.data() as Patient);
          }
        },
        error => {
          console.error('Error listening to patient changes:', error);
        },
      );

    // Tạo listener cho danh sách bác sĩ
    const unsubscribeDoctors = firestore()
      .collection('doctors')
      .orderBy('ratingAverage', 'desc')
      .limit(5)
      .onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            const items: Doctor[] = [];
            snapshot.forEach((item : any) => {
              items.push({
                id: item.id,
                ...item.data(),
              });
            });
            setListDoctor(items);
            setLoadingDoctors(false);
          }
        },
        error => {
          console.error('Error listening to doctors changes:', error);
          setLoadingDoctors(false);
        },
      );

    // Tạo listener cho specializations
    const unsubscribeSpec = firestore()
      .collection('specializations')
      .onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            const items: Specialization[] = [];
            snapshot.forEach((item : any) => {
              items.push({
                id: item.id,
                ...item.data(),
              });
            });
            setListSpecialization(items);
            setLoadingSpecialization(false);
          }
        },
        error => {
          console.error('Error listening to specializations changes:', error);
          setLoadingSpecialization(false);
        },
      );

    // Cleanup listeners khi component unmount
    return () => {
      unsubscribePatient();
      unsubscribeDoctors();
      unsubscribeSpec();
    };
  }, []);

  // const getPatientInfo = async () => {
  //   await firestore()
  //     .collection('patients')
  //     .doc(user?.uid)
  //     .get()
  //     .then(snapshot => {
  //       setPatient(snapshot.data() as Patient);
  //     });
  // };

  // const getAllSpecializations = async () => {
  //   setLoadingSpecialization(true);
  //   await firestore()
  //     .collection('specializations')
  //     .get()
  //     .then(snapshot => {
  //       if (snapshot.empty) {
  //         console.log('Không có specialization');
  //         return;
  //       }
  //       const items: Specialization[] = [];
  //       snapshot.forEach((item: any) => {
  //         items.push({
  //           id: item.id,
  //           ...item.data(),
  //         });
  //       });
  //       setLoadingSpecialization(false);
  //       setListSpecialization(items);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching specializations:', error); // Log lỗi
  //       setLoadingSpecialization(false);
  //     });
  // };

  // const getAllDoctors = async () => {
  //   setLoadingDoctors(true);
  //   await firestore()
  //     .collection('doctors')
  //     .orderBy('ratingAverage', 'desc')
  //     .limit(5)
  //     .get()
  //     .then(snap => {
  //       if (snap.empty) {
  //         console.log('Không có bác sĩ');
  //         return;
  //       }
  //       const items: Doctor[] = [];
  //       snap.forEach((item: any) => {
  //         items.push({
  //           id: item.id,
  //           ...item.data(),
  //         });
  //       });
  //       setLoadingDoctors(false);
  //       setListDoctor(items);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching doctor:', error); // Log lỗi
  //       setLoadingDoctors(false);
  //     });
  // };

  return (
    <>
      <ContainerComponent isScroll style={{marginTop: -16}}>
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
                source={
                  patient?.image
                    ? {uri: patient.image}
                    : require('../../../assets/IconTab/profile.png')
                }
                style={{width: 50, height: 50, borderRadius: 100}}
              />
              <Space width={15} />
              <View>
                <TextComponent
                  text="Hi, how are you today?"
                  font={fontFamilies.regular}
                  color="#00000066"
                />
                <TextComponent
                  text={`${patient?.name}`}
                  font={fontFamilies.semiBold}
                />
              </View>
            </Row>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/IconTab/notification.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </Row>

          <Swiper height={270} style={{marginTop: 20}} activeDotColor="#1399ba">
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
                {loadingSpecialization ? (
                  <ActivityIndicator color={'#000'} />
                ) : (
                  listSpec
                    .slice(0, 5)
                    .map((item, index) => (
                      <SpecializationComponent key={index} data={item} />
                    ))
                )}
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
            {loadingDoctors ? (
              <ActivityIndicator color={'#000'} />
            ) : (
              listDoctor.slice(0, 5).map((item, index) => (
                <DoctorCard
                  key={index}
                  data={item}
                  onPress={() => {
                    props.navigation.navigate('DoctorDetail', {doctor: item});
                  }}
                />
              ))
            )}
          </Section>
        </View>
      </ContainerComponent>
      {/* {Chat box} */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('ChatScreen')}
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