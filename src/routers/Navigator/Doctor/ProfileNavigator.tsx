import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorProfileScreen from '../../../screens/doctor/profile/ProfileScreen';

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={DoctorProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
