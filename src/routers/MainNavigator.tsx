import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './BottomTab/TabNavigator';
import DoctorDetail from '../screens/doctor/DoctorDetail';
import FAQsScreen from '../screens/profile/screens/FAQsScreen';
import PrivacyPolicyScreen from '../screens/profile/screens/PrivacyPolicyScreen';
import ReportScreen from '../screens/profile/screens/ReportScreen';
import UpdateProfile from '../screens/profile/screens/UpdateProfile';
import MyFavoritesDoctor from '../screens/profile/screens/MyFavoritesDoctor';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="DoctorDetailScreen" component={DoctorDetail} />
      <Stack.Screen name="FAQsScreen" component={FAQsScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="MyfavoritesDoctor" component={MyFavoritesDoctor} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
