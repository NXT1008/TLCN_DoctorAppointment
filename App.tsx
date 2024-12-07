import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/routers/MainNavigator';
import AuthNavigator from './src/routers/Navigator/Patient/AuthNavigator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { StatusBar, View } from 'react-native';
import DoctorNavigator from './src/routers/DoctorNavigator';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | null>(null);
  useEffect(() => {
    const unsubcriber = auth().onAuthStateChanged(async user => {
      if (user) {
        // Kiểm tra xem user có phải là bác sĩ không
        const doctorDoc = await firestore()
          .collection('doctors')
          .where('email', '==', user.email)
          .get();

        if (!doctorDoc.empty) {
          setUserRole('doctor');
        } else {
          setUserRole('patient');
        }
        // Delay 1.5 giây trước khi chuyển màn hình
        setTimeout(() => {
          setIsLogin(true);
        }, 1500);
      } else {
        setIsLogin(false);
        setUserRole(null);
      }
    });
    return () => unsubcriber();
  }, []);

  return (
    <NavigationContainer>
      {!isLogin ? (
        <AuthNavigator />
      ) : userRole === 'doctor' ? (
        <DoctorNavigator />
      ) : (
        <MainNavigator />
      )}
    </NavigationContainer>
  );
};

export default App;
