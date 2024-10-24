import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './BottomTab/TabNavigator';
import DoctorDetail from '../screens/doctor/DoctorDetail';
import { NotificationScreen } from '../screens';
import PaymentScreen from '../screens/payment/PaymentScreen';
import BookingScreen from '../screens/booking/BookingScreen';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="DoctorDetailScreen" component={DoctorDetail} />
      <Stack.Screen name="BookingScreen" component={BookingScreen}/>
      <Stack.Screen name="Notification" component={NotificationScreen}/>
      <Stack.Screen name="Payment" component={PaymentScreen}/>
    </Stack.Navigator>
  );
};

export default MainNavigator;
