import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './BottomTab/TabNavigator';
import FAQsScreen from '../screens/patient/profile/screens/FAQsScreen';
import PrivacyPolicyScreen from '../screens/patient/profile/screens/PrivacyPolicyScreen';
import ReportScreen from '../screens/patient/profile/screens/ReportScreen';
import UpdateProfile from '../screens/patient/profile/screens/UpdateProfile';
import MyFavoritesDoctor from '../screens/patient/profile/screens/MyFavoritesDoctor';
import SettingScreen from '../screens/patient/profile/screens/SettingScreen';
import ReviewAllDoctors from '../screens/patient/doctor/ReviewAllDoctors';
import BookingScreen from '../screens/patient/booking/BookingScreen';
import DoctorDetail from '../screens/patient/doctor/DoctorDetail';
import { DoctorScreen, NotificationScreen } from '../screens/patient';
import PaymentScreen from '../screens/patient/payment/PaymentScreen';
import AddNewCardScreen from '../screens/patient/payment/AddNewCard';
import ChatScreen from '../screens/patient/chat/ChatScreen';
import MainChatScreen from '../screens/patient/chat/MainChatScreen';
import ReviewScreen from '../screens/patient/appointment/ReviewAppointment';
import CancelAppointment from '../screens/patient/appointment/CancelAppointment';
import ChangePassword from '../screens/patient/profile/screens/ChangePassword';
import PaymentHistory from '../screens/patient/profile/screens/PaymentMethodScreen';
import HealthReportScreen from '../screens/patient/profile/screens/HealthReport';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
      <Stack.Screen name="FAQsScreen" component={FAQsScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="HealthReportScreen" component={HealthReportScreen} />
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
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="CancelAppointment" component={CancelAppointment} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
