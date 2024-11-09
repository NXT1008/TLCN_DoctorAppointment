import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorHome from '../screens/doctor/home/DoctorHome';
import DoctorNotificationScreen from '../screens/doctor/notification/DoctorNotification';
import DoctorAppointmentScreen from '../screens/doctor/appointment/DoctorAppointment';
import DoctorReportScreen from '../screens/doctor/report/DoctorReport';
import DoctorTabNavigator from './BottomTab/DoctorTabNavigator';

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
      <Stack.Screen name="DoctorReport" component={DoctorReportScreen} />
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
