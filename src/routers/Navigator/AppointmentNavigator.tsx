import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentScreen from '../../screens/appointment/AppointmentHistory';
import CancelAppointment from '../../screens/appointment/CancelAppointment';
import ReviewScreen from '../../screens/appointment/ReviewAppointment';
import { Appointment } from '../../models/Appointment';
import { Doctor } from '../../models/Doctor';
import DoctorDetailScreen from '../../screens/doctor/DoctorDetail';
import BookingScreen from '../../screens/booking/BookingScreen';
import DoctorReportScreen from '../../screens/doctor/DoctorReport';

export type AppointmentStackParamList = {
  AppointmentScreen: undefined;  // Không có tham số
  CancelAppointment: { appointment: Appointment };  // Nhận một cuộc hẹn làm tham số
  ReviewScreen: { appointment: Appointment };  // Tương tự
  DoctorDetailScreen: undefined
  BookingScrren: undefined
  DoctorReport: undefined
};

const AppointmentNavigator = () => {
  const Stack = createNativeStackNavigator();
  //const Stack = createNativeStackNavigator<AppointmentStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Stack.Screen name="CancelAppointment" component={CancelAppointment} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="DoctorDetailScreen" component={DoctorDetailScreen}/>
      <Stack.Screen name="BookingScreen" component={BookingScreen}/>
      <Stack.Screen name="DoctorReport" component={DoctorReportScreen}/>
    </Stack.Navigator>
  );
}

export default AppointmentNavigator