import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
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
import {fontFamilies} from '../../constants/fontFamilies';
import DoctorCard from './components/DoctorCard';
import Swiper from 'react-native-swiper';
import SwiperOne from './components/SwiperOne';
import Specialization from './components/Specialization';

const HomeScreen = (props: any) => {
  const user = auth().currentUser;
  
  return (
    <ContainerComponent isScroll>
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
            style={{width: 50, height: 50}}
          />
          <Space width={15} />
          <View>
            <TextComponent
              text="Hi, welcome back!"
              font={fontFamilies.regular}
              color="#00000066"
            />
            <TextComponent
              text={`${user?.email}`}
              font={fontFamilies.semiBold}
            />
          </View>
        </Row>
        <TouchableOpacity>
          <Image
            source={require('../../assets/IconTab/notification.png')}
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
          <TextComponent text="See All" font={fontFamilies.regular} size={12} />
        </Row>
      </Section>
      <Section>
        <Row>
          <ScrollView horizontal>
            <Specialization />
            <Specialization />
            <Specialization />
            <Specialization />
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
          <TextComponent text="See All" font={fontFamilies.regular} size={12} />
        </Row>
        <Space height={10} />
        <DoctorCard
          onPress={() => {
            props.navigation.navigate('DoctorDetailScreen');
          }}
        />
        <DoctorCard
          onPress={() => {
            props.navigation.navigate('DoctorDetailScreen');
          }}
        />
        <DoctorCard
          onPress={() => {
            props.navigation.navigate('DoctorDetailScreen');
          }}
        />
        <DoctorCard
          onPress={() => {
            props.navigation.navigate('DoctorDetailScreen');
          }}
        />
        <DoctorCard
          onPress={() => {
            props.navigation.navigate('DoctorDetailScreen');
          }}
        />
      </Section>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
});

export default HomeScreen;
