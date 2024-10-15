import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from '../Navigator/HomeNavigator';
import DoctorNavigator from '../Navigator/DoctorNavigator';
import ProfileNavigator from '../Navigator/ProfileNavigator';
import {Home2} from 'iconsax-react-native';
import {Row, TextComponent} from '../../components';
import { fontFamilies } from '../../constants/fontFamilies';
import AppointmentNavigator from '../Navigator/AppointmentNavigator';

const TabNavigator = () => {
  const styleImage = {height: 25, width: 25};

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        },
        tabBarIcon: ({focused, size, color}) => {
          color = '#000';
          size = 25;
          let icon = (
            <Image
              source={require('../../assets/IconTab/doctor.png')}
              style={styleImage}
              resizeMode="contain"
            />
          );
          switch (route.name) {
            case 'ProfileTab':
              icon = (
                <Image
                  source={require('../../assets/IconTab/profile.png')}
                  style={styleImage}
                  resizeMode="contain"
                />
              );
              break;
            case 'DoctorTab':
              icon = (
                <Image
                  source={require('../../assets/IconTab/doctor.png')}
                  style={styleImage}
                  resizeMode="contain"
                />
              );
              break;
            case 'HistoryTab':
              icon = (
                <Image
                  source={require('../../assets/IconTab/appointment.png')}
                  style={styleImage}
                  resizeMode="contain"
                />
              );
              break;
            default:
              icon = (
                <Image
                  source={require('../../assets/IconTab/home.png')}
                  style={styleImage}
                  resizeMode="contain"
                />
              );
          }

          return (
            <Row
              // Có focus thì trả ra tên tab + viền xung quanh
              styles={focused ? styles.wrapper : undefined}>
              <View style={styles.iconContainer}>{icon}</View>
              {focused && (
                <TextComponent
                  text={route.name.slice(0, -3)}
                  size={13}
                  styles={{paddingHorizontal: 10, color: '#63B4FF', fontFamily: fontFamilies.semiBold}}
                />
              )}
            </Row>
          );
        },
      })}>
      <Tab.Screen name="HomeTab" component={HomeNavigator} />
      <Tab.Screen name="DoctorTab" component={DoctorNavigator} />
      <Tab.Screen name="HistoryTab" component={AppointmentNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#63B4FF40',
    borderRadius: 10,
    height: 35,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
