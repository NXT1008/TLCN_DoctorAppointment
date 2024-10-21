import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './BottomTab/TabNavigator';
import DoctorDetailScreen from '../screens/doctor/DoctorDetailScreen';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="DoctorDetailScreen" component={DoctorDetailScreen} />
    </Stack.Navigator>
  );
}

export default MainNavigator