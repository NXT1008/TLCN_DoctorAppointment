import React, {useState} from 'react';
import {
  Card,
  ContainerComponent,
  Row,
  Section,
  TextComponent,
} from '../../components';
import {Image, StyleSheet, Text, Touchable, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import {
  ArrowLeft,
  ArrowLeft2,
  Medal,
  MedalStar,
  Star,
  Star1,
  UserEdit,
} from 'iconsax-react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

const DoctorDetailScreen = (props: any) => {
  const { navigation } = props;

  return (
    <ContainerComponent isScroll styleHeader={{marginTop: -16}}>
      <View
        style={{
          backgroundColor: '#f5f5f5',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          flexShrink: 1,
        }}>
        <View style={{paddingHorizontal: 20, marginTop: 16}}>
          <TouchableOpacity
            onPress={() => {
              navigation.back();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/images/doctor.png')}
          style={{
            width: 120,
            height: 120,
            borderRadius: 100,
            alignSelf: 'center',
            marginTop: -5,
            marginBottom: 15,
          }}
          resizeMode="contain"
        />
        <TextComponent
          text="Doctor Name"
          size={20}
          font={fontFamilies.semiBold}
          textAlign="center"
        />
        <TextComponent
          text="Specialization"
          size={12}
          font={fontFamilies.regular}
          textAlign="center"
          color="#6B779A"
          styles={{marginTop: -4}}
        />
        <Section styles={{marginTop: 5, paddingHorizontal: 5}}>
          <Row justifyContent="space-between" styles={{paddingBottom: 30}}>
            <Card
              styles={{
                width: '25%',
                alignItems: 'center',
                paddingTop: 0,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <View
                style={{
                  width: '80%',
                  height: '45%',
                  backgroundColor: '#7ACEFA4D',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: 10,
                  marginBottom: 5,
                }}>
                <UserEdit color="#0577e3" />
              </View>
              <TextComponent text="1000+" font={fontFamilies.semiBold} />
              <TextComponent
                text="Patients"
                font={fontFamilies.regular}
                size={10}
                color="gray"
              />
            </Card>
            <Card
              styles={{
                width: '25%',
                alignItems: 'center',
                paddingTop: 0,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <View
                style={{
                  width: '80%',
                  height: '45%',
                  backgroundColor: '#f5d7dc',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: 10,
                  marginBottom: 5,
                }}>
                <MedalStar color="#fc587c" />
              </View>
              <TextComponent text="10 Yrs" font={fontFamilies.semiBold} />
              <TextComponent
                text="Experience"
                font={fontFamilies.regular}
                size={10}
                color="gray"
              />
            </Card>
            <Card
              styles={{
                width: '25%',
                alignItems: 'center',
                paddingTop: 0,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <View
                style={{
                  width: '80%',
                  height: '45%',
                  backgroundColor: '#ffe4c2',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: 10,
                  marginBottom: 5,
                }}>
                <Star1 color="#ffa936" />
              </View>
              <TextComponent text="4.5" font={fontFamilies.semiBold} />
              <TextComponent
                text="Ratings"
                font={fontFamilies.regular}
                size={10}
                color="gray"
              />
            </Card>
          </Row>
        </Section>
      </View>
      <Section styles={{marginTop: 25}}>
        <TextComponent text="About Doctor" />
        <TextComponent
          text="Dr. Bellamy Nicholas is a top specialist at London Bridge Hospital at London. He has achieved several awards and recognition for is contribution and service in his own field. He is available for private consultation."
          numberOfLine={5}
        />
      </Section>
      <Section styles={{marginTop: 25}}>
        <TextComponent text="Working Time" />
        <TextComponent
          text="Mon - Sat (08:30 AM - 09:00 PM)"
          numberOfLine={5}
        />
      </Section>
      <Section styles={{marginTop: 25}}>
        <TextComponent text="Comunication" />
        <TextComponent
          text="Mon - Sat (08:30 AM - 09:00 PM)"
          numberOfLine={5}
        />
      </Section>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'coral',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 40,
    fontWeight: 'bold',
    marginRight: 10,
  },
  reviewDetails: {
    alignItems: 'flex-start',
  },
});

export default DoctorDetailScreen;
