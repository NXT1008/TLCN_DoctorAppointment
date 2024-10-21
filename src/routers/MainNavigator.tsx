import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './BottomTab/TabNavigator';
import DoctorDetail from '../screens/doctor/DoctorDetail';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="DoctorDetailScreen" component={DoctorDetail} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
