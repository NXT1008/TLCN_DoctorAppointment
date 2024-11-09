import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CancelAppointment from '../../../screens/patient/appointment/CancelAppointment';

const DoctorReview = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DoctorReview" component={CancelAppointment} />
    </Stack.Navigator>
  );
};

export default DoctorReview;
