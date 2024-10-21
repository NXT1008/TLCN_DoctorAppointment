import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DoctorScreen} from '../../screens';
import DoctorDetailScreen from '../../screens/doctor/DoctorDetailScreen';

const DoctorNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DoctorScreen" component={DoctorScreen} />
      {/* <Stack.Screen
        name="DoctorDetailScreen"
        component={DoctorDetailScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
