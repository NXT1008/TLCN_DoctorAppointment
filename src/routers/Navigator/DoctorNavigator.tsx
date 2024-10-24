import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DoctorScreen} from '../../screens';
import DoctorDetailScreen from '../../screens/doctor/DoctorDetail';
import BookingScreen from '../../screens/booking/BookingScreen';

const DoctorNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DoctorScreen" component={DoctorScreen} />
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
