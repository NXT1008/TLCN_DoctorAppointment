import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentScreen from '../../screens/appointment/AppointmentHistory';
import CancelAppointment from '../../screens/appointment/CancelAppointment';
import ReviewScreen from '../../screens/appointment/ReviewAppointment';

const AppointmentNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Stack.Screen name="CancelAppointment" component={CancelAppointment} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
    </Stack.Navigator>
  );
}

export default AppointmentNavigator