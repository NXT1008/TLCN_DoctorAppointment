import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/routers/MainNavigator';
import AuthNavigator from './src/routers/Navigator/AuthNavigator';
import auth from '@react-native-firebase/auth'

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {isLogin ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
