import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorHomeScreen from '../../../screens/doctor/home/DoctorHome';

const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={DoctorHomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
