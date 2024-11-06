import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/routers/MainNavigator';
import AuthNavigator from './src/routers/Navigator/AuthNavigator';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
//--------------
import uploadDataToFirebase from './src/data/UploadDataToFirebase'

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  // Đẩy dữ liệu từ local lên firebase
  useEffect(() => {
    const uploadDataOnce = async () => {
      const doc = await firestore().collection('metadata').doc('initialDataUpload').get();

      if (!doc.exists) {
        try {
          await uploadDataToFirebase(); // Gọi hàm upload dữ liệu
          await firestore().collection('metadata').doc('initialDataUpload').set({ uploaded: true }); // Đánh dấu là dữ liệu đã được upload
          console.log("Upload success!")
        } catch (error) {
          console.error('Error uploading data:', error);
        }
      }
    };

    uploadDataOnce();
  }, []); // Chỉ chạy khi component được mount

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
