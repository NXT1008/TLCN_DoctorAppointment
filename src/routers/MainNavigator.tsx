import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './BottomTab/TabNavigator';
import FAQsScreen from '../screens/profile/screens/FAQsScreen';
import PrivacyPolicyScreen from '../screens/profile/screens/PrivacyPolicyScreen';
import ReportScreen from '../screens/profile/screens/ReportScreen';
import UpdateProfile from '../screens/profile/screens/UpdateProfile';
import MyFavoritesDoctor from '../screens/profile/screens/MyFavoritesDoctor';
import SettingScreen from '../screens/profile/screens/SettingScreen';
import ReviewAllDoctors from '../screens/doctor/ReviewAllDoctors';
import BookingScreen from '../screens/booking/BookingScreen';
import DoctorDetail from '../screens/doctor/DoctorDetail';
import { NotificationScreen } from '../screens';
import PaymentScreen from '../screens/payment/PaymentScreen';
import AddNewCardScreen from '../screens/payment/AddNewCard';
import ChatScreen from '../screens/chat/ChatScreen';
import MainChatScreen from '../screens/chat/MainChatScreen';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="BookingScreen" component={BookingScreen}/>
      <Stack.Screen name="Notification" component={NotificationScreen}/>
      <Stack.Screen name="Payment" component={PaymentScreen}/>
      <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
      <Stack.Screen name="FAQsScreen" component={FAQsScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="MyfavoritesDoctor" component={MyFavoritesDoctor} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ReviewAllDoctors" component={ReviewAllDoctors} />
      <Stack.Screen name="AddNewCard" component={AddNewCardScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="MainChatScreen" component={MainChatScreen} />
      <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
