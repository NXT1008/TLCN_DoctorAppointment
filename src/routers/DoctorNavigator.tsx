import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorHome from '../screens/doctor/home/DoctorHome';
import DoctorNotificationScreen from '../screens/doctor/notification/DoctorNotification';
import DoctorAppointmentScreen from '../screens/doctor/appointment/DoctorAppointment';
import DoctorReportScreen from '../screens/doctor/report/DoctorReport';
import DoctorTabNavigator from './BottomTab/DoctorTabNavigator';
import UpdateProfile from '../screens/doctor/profile/screens/UpdateProfile';
import ChatScreen from '../screens/doctor/chat/ChatScreen';
import MainChatScreen from '../screens/doctor/chat/MainChatScreen';
import CancelAppointment from '../screens/doctor/appointment/CancelAppointment';
import DoctorReviews from '../screens/doctor/profile/screens/MyReviews';
import FAQsScreen from '../screens/doctor/profile/screens/FAQsScreen';
import SettingScreen from '../screens/patient/profile/screens/SettingScreen';
import ChangePassword from '../screens/patient/profile/screens/ChangePassword';

const Stack = createNativeStackNavigator();

const DoctorNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DoctorNavigator" component={DoctorTabNavigator} />
      <Stack.Screen name="DoctorHome" component={DoctorHome} />
      <Stack.Screen
        name="DoctorNotification"
        component={DoctorNotificationScreen}
      />
      <Stack.Screen
        name="DoctorAppointment"
        component={DoctorAppointmentScreen}
      />
      <Stack.Screen name="CancelAppointment" component={CancelAppointment} />

      <Stack.Screen name="DoctorReport" component={DoctorReportScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />

      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="MainChatScreen" component={MainChatScreen} />
      <Stack.Screen name="DoctorReviews" component={DoctorReviews} />
      <Stack.Screen name="FAQsScreen" component={FAQsScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} /> 
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
