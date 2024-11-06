import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  ContainerComponent,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../../../components';
import {ArrowLeft2} from 'iconsax-react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

const ResetPassword = ({navigation, route}: any) => {
  const {width, height} = Dimensions.get('window');
  const {email} = route.params;
  const [password, setpassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confimPassword, setconfimPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, seterrorText] = useState('');

  const handleResetPassword = async () => {
    if (!password) {
      Alert.alert('Please enter password we sent you in your email');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confimPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const user = auth().currentUser
      console.log(user)

      const credential = auth.EmailAuthProvider.credential(
        user?.email as string,
        password,
      );
      await user?.reauthenticateWithCredential(credential);      

      await user?.updatePassword(newPassword);
      Alert.alert(
        'Password Changed',
        'Your password has been updated successfully.',
      );
      // Đăng xuất sau khi đổi mật khẩu thành công
      await auth().signOut();
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to change password. Please try again.');
    }
  };

  return (
    <ContainerComponent>
      <Section styles={{paddingTop: 5}}>
        <Row justifyContent="flex-start">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="Reset Password"
              size={22}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <Section styles={{paddingHorizontal: 15}}>
        <TextComponent
          text="Check your email to get password we sent"
          font={fontFamilies.regular}
          size={14}
        />
        <Space height={50} />
        <Input
          password
          prefix
          value={password}
          onChange={val => {
            setpassword(val);
          }}
          placeholder="Enter password we sent you"
          label="Old Password"
          inputStyles={{fontFamily: fontFamilies.regular}}
          styles={{
            borderRadius: 10,
            backgroundColor: '#F4F6F9',
            borderColor: '#F4F6F9',
            height: 60,
          }}
          labelStyleProps={{
            fontFamily: fontFamilies.semiBold,
            fontSize: 16,
            marginTop: 15,
          }}
        />
        <Input
          password
          prefix
          value={newPassword}
          onChange={val => setnewPassword(val)}
          placeholder="Enter your new password"
          label="New Password"
          inputStyles={{fontFamily: fontFamilies.regular}}
          styles={{
            borderRadius: 10,
            backgroundColor: '#F4F6F9',
            borderColor: '#F4F6F9',
            height: 60,
          }}
          labelStyleProps={{
            fontFamily: fontFamilies.semiBold,
            fontSize: 16,
            marginTop: 15,
          }}
        />
        <Input
          password
          prefix
          value={confimPassword}
          onChange={val => setconfimPassword(val)}
          placeholder="Enter your new password"
          label="Confirm New Password"
          inputStyles={{fontFamily: fontFamilies.regular}}
          styles={{
            borderRadius: 10,
            backgroundColor: '#F4F6F9',
            borderColor: '#F4F6F9',
            height: 60,
          }}
          labelStyleProps={{
            fontFamily: fontFamilies.semiBold,
            fontSize: 16,
            marginTop: 15,
          }}
        />
      </Section>
      <Space height={height * 0.15} />
      <Section styles={{alignItems: 'center'}}>
        <Button
          title="Confirm"
          onPress={handleResetPassword}
          styles={{width: '70%', borderRadius: 15}}
          color="#18A0FB"
          textStyleProps={{fontFamily: fontFamilies.semiBold}}
        />
      </Section>
    </ContainerComponent>
  );
};

export default ResetPassword;
