import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentScreen from '../../screens/appointment/AppointmentHistory';

const AppointmentNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
    </Stack.Navigator>
  );
}

export default AppointmentNavigator