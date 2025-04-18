import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppointmentScreen from '../../../screens/doctor/appointment/DoctorAppointment';
import {Appointment} from '../../../models/Appointment';

export type AppointmentStackParamList = {
  AppointmentScreen: undefined; // Không có tham số
  CancelAppointment: {appointment: Appointment}; // Nhận một cuộc hẹn làm tham số
  ReviewScreen: {appointment: Appointment}; // Tương tự
  DoctorDetailScreen: undefined;
  BookingScrren: undefined;
  DoctorReport: undefined;
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
    </Stack.Navigator>
  );
};

export default AppointmentNavigator;
