import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatScreen from '../../../screens/patient/chat/ChatScreen';

const Stack = createNativeStackNavigator();

const DoctorNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
