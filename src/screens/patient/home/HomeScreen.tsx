import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Messages1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  ContainerComponent,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Doctor} from '../../../models/Doctor';
import {Patient} from '../../../models/Patient';
import {Specialization} from '../../../models/Specialization';
import {HandleNotificationPatient} from '../../../utils/handleNotification';
import DoctorCard from './components/DoctorCard';
import SpecializationComponent from './components/SpecializationComponent';
import SwiperOne from './components/SwiperOne';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging'
import SwiperOne2 from './components/SwiperOne2';
import SwiperOne3 from './components/SwiperOne3';
import SwiperOne4 from './components/SwiperOne4';
import updateDoctorRating from '../../../data/functions/UpdateRating';

const HomeScreen = (props: any) => {
  const user = auth().currentUser;
  const {width, height} = Dimensions.get('window');
  const [listSpec, setListSpecialization] = useState<Specialization[]>([]);
  const [listDoctor, setListDoctor] = useState<Doctor[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const [loadingSpecialization, setLoadingSpecialization] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  // Sử dụng useEffect để setup realtime listener
  useEffect(() => {
    // Kiểm tra token của user đăng nhập
    HandleNotificationPatient.checkNotificationPermission();

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
            snapshot.forEach((item: any) => {
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
      .limit(5)
      .onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            const items: Specialization[] = [];
            snapshot.forEach((item: any) => {
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

    // Lắng nghe sự thay đổi trong Firestore để kiểm tra có thông báo mới không
    let unsubscribeNotification: () => void = () => {}; // Đặt giá trị mặc định
    if (patient?.patientId) {
      unsubscribeNotification = firestore()
        .collection('notifications')
        .where('receiverId', '==', patient?.patientId)
        .where('isReaded', '==', false) // Kiểm tra các thông báo chưa đọc
        .onSnapshot(snapshot => {
          console.log("vào")
          //console.log(snapshot.docs[0].data())
          if (!snapshot.empty) {
            setHasNewNotification(true); // Có thông báo mới
          } else {
            setHasNewNotification(false); // Không có thông báo mới
          }
        });
    }

    // Cleanup listeners khi component unmount
    return () => {
      unsubscribePatient();
      unsubscribeDoctors();
      unsubscribeSpec();
      unsubscribeNotification();
    };
  }, []);

  useEffect(() => {
    const createNotificationChannel = async () => {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });
    };


    const unsubcribeOnMessage = messaging().onMessage(
      async (remoteMessage: any) => {
        const imageUrl = remoteMessage.notification?.android?.imageUrl;
        await notifee.displayNotification({
          title: remoteMessage.notification?.title || 'New Title',
          body: remoteMessage.notification?.body || 'New body',
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
            smallIcon: 'ic_launcher',
            pressAction: {id: 'default'},
            style: imageUrl
              ? {type: AndroidStyle.BIGPICTURE, picture: imageUrl}
              : undefined,
          },
        });
      },
    );

    return () => {
      createNotificationChannel()
      unsubcribeOnMessage()
    }
  }, []);

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
              <TouchableOpacity onPress={() => {
                //updateDoctorRating()
              }}>
                <Image
                  source={
                    patient?.image
                      ? {uri: patient.image}
                      : require('../../../assets/IconTab/profile.png')
                  }
                  style={{width: 50, height: 50, borderRadius: 100}}
                />
              </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Notification', {patient: patient});
              }}>
              <View
                style={{
                  position: 'absolute',
                  height: 9,
                  width: 9,
                  top: 1,
                  right: 1,
                  backgroundColor: hasNewNotification ? '#ff6f00' : '#fff',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <Image
                source={require('../../../assets/IconTab/notification.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#404040',
                }}
              />
            </TouchableOpacity>
          </Row>

          <Swiper
            height={270}
            style={{marginTop: 20}}
            activeDotColor="#1399ba"
            autoplay
            autoplayTimeout={3.5}
            loop>
            <SwiperOne2 />
            <SwiperOne />
            <SwiperOne3 />
            <SwiperOne4 />
          </Swiper>
          <Section>
            <Row justifyContent="space-between">
              <TextComponent
                text="Doctor Speciality"
                size={20}
                font={fontFamilies.semiBold}
              />
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('DoctorScreen');
                }}>
                <TextComponent
                  text="See All"
                  font={fontFamilies.regular}
                  size={12}
                />
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('DoctorScreen');
                }}>
                <TextComponent
                  text="See All"
                  font={fontFamilies.regular}
                  size={12}
                />
              </TouchableOpacity>
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
