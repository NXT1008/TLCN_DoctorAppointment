import {View, Text, TouchableOpacity, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  ContainerComponent,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../../../../components';
import {ArrowLeft2} from 'iconsax-react-native';
import {fontFamilies} from '../../../../../constants/fontFamilies';
import auth from '@react-native-firebase/auth';

const ForgotPassword = (props: any) => {
  const {width, height} = Dimensions.get('window');
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Forgot Password', 'Please enter your email address.');
      return;
    }
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Forgot Password',
        'Password reset email sent. Please check your inbox.',
      );
      props.navigation.navigate('ResetPassword', {email: email});
    } catch (error) {
      console.error(error);
      Alert.alert('Forgot Password', 'Failed to send reset email. Try again.');
    }
  }
  return (
    <ContainerComponent>
      <Section styles={{paddingTop: 5}}>
        <Row justifyContent="flex-start">
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="Forgot Password"
              size={22}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <Section styles={{paddingHorizontal: 30}}>
        <TextComponent
          text="Enter your email and check  your inbox to reset your password"
          size={16}
          font={fontFamilies.medium}
        />
        <Space height={80} />
        <Input
          value={email}
          onChange={val => {
            setEmail(val);
          }}
          placeholder="Enter your email"
          clear
          prefix
          inputStyles={{fontFamily: fontFamilies.regular}}
          styles={{
            backgroundColor: '#F4F6F9',
            borderRadius: 10,
            borderColor: '#F4F6F9',
            height: 60,
          }}
        />
        <Space height={height * 0.5} />
        <Button
          title="Send"
          onPress={handleForgotPassword}
          styles={{backgroundColor: '#18A0FB', borderRadius: 10}}
          textStyleProps={{fontFamily: fontFamilies.semiBold, color: '#fff'}}
        />
      </Section>
    </ContainerComponent>
  );
};

export default ForgotPassword;
