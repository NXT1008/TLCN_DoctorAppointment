import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Alert} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  Button,
  ContainerComponent,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Forbidden2, TickSquare} from 'iconsax-react-native';
import {colors} from '../../../constants/colors';
import {Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import ModalComponent from './components/ModalComponent';
import firestore from '@react-native-firebase/firestore';
import {Patient} from '../../../models/Patient';
import deleteAllData from '../../../data/functions/zResetData';
import uploadDataToFirestore from '../../../data/functions/UploadDataToFirebase';
import {Doctor} from '../../../models/Doctor';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [role, setRole] = useState('patient'); // thêm state role

  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email || !emailRegex.test(email)) {
      setErrorText('Please enter a valid email');
      setIsLoading(false);
      setIsError(true);
      return;
    }
    if (!password) {
      setErrorText('Please enter your password');
      setIsLoading(false);
      setIsError(true);
      return;
    } else {
      setIsLoading(true);
      setIsError(false);
      setErrorText('');

      // Login
      try {
        if (role === 'patient') {
          await auth()
            .signInWithEmailAndPassword(email, password)
            .then(userCredential => {
              const user = userCredential.user;
              setIsLoading(false);
            })
            .catch(error => {
              setIsLoading(false);
              setIsError(true);
              setErrorText('Login fail! Please check your email and password');
              console.log(error);
            });
        }
        else {
          // Doctor login using Firestore
          const doctorSnapshot = await firestore()
            .collection('doctors')
            .where('email', '==', email)
            .get();

          if (doctorSnapshot.empty) {
            throw new Error('Doctor not found');
          }

          const doctorData = doctorSnapshot.docs[0].data() as Doctor;
          if (doctorData.password !== password) {
            throw new Error('Invalid password');
          }

          // Update doctor's login status if needed
          await firestore()
            .collection('doctors')
            .doc(doctorSnapshot.docs[0].id)
            .update({isLogin: true});

          // Tạo một session cho bác sĩ trong Firebase Auth
          await auth().signInWithEmailAndPassword(email, password);

          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setErrorText('Invalid email or password');
      }
    }
  };

  return (
    <ContainerComponent isScroll>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Alert.alert('Back')}
          style={styles.backButton}>
          <Image
            source={require('../../../assets/images/back_arrow.png')}
            style={styles.backImage}></Image>
        </TouchableOpacity>

        <TextComponent
          text="Welcome To App!"
          color="#21a691"
          size={30}
          font={fontFamilies.medium}
          styles={{textAlign: 'center'}}
        />

        <Section
          styles={{marginHorizontal: 10, marginTop: 60, paddingBottom: 10}}>
          <TextComponent
            text="Email"
            size={18}
            color="#21a691"
            styles={{fontFamily: fontFamilies.medium, fontWeight: '600'}}
          />
          <Space height={8} />
          <Input
            value={email}
            onChange={val => {
              setEmail(val);
            }}
            clear
            prefix
            placeholder="Enter your email"
            color="#f4f6f9"
            inputStyles={{fontFamily: fontFamilies.regular, fontSize: 12}}
          />
        </Section>

        <Section styles={{marginHorizontal: 10, paddingBottom: 0}}>
          <TextComponent
            text="Password"
            size={18}
            color="#21a691"
            styles={{fontFamily: fontFamilies.medium, fontWeight: '600'}}
          />
          <Space height={8} />
          <Input
            value={password}
            password
            prefix
            onChange={val => {
              setPassword(val);
            }}
            placeholder="Enter your password"
            color="#f4f6f9"
            inputStyles={{fontFamily: fontFamilies.regular, fontSize: 12}}
          />
        </Section>

        {/* Login as */}
        <Section styles={{marginHorizontal: 10, marginBottom: 15}}>
          <TextComponent
            text="Login as"
            size={18}
            color="#21a691"
            styles={{fontFamily: fontFamilies.medium}}
          />
          <Space height={8} />
          <Row>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'patient' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('patient')}>
              <TextComponent
                text="Patient"
                color={role === 'patient' ? '#fff' : '#21a691'}
                size={14}
                font={fontFamilies.regular}
              />
            </TouchableOpacity>
            <Space width={10} />
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'doctor' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('doctor')}>
              <TextComponent
                text="Doctor"
                color={role === 'doctor' ? '#fff' : '#21a691'}
                size={14}
                font={fontFamilies.regular}
              />
            </TouchableOpacity>
          </Row>
        </Section>

        <Section styles={{marginTop: 0, marginVertical: 25, paddingBottom: 0}}>
          <Row>
            <Row>
              <TickSquare size={20} variant="Bold" color={colors.gray} />
              <Space width={8} />
              <TextComponent
                text="Remember me"
                color={colors.gray}
                size={13}
                font={fontFamilies.regular}
              />
            </Row>
            <Space width={80} />
            <Row>
              <Button
                styles={{marginTop: 8, marginBottom: 8}}
                title="Forgot password"
                type="link"
                textStyleProps={{
                  color: '#21a691',
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                }}
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}
              />
            </Row>
          </Row>
        </Section>
        <Button
          loading={isLoading}
          title="Sign In"
          styles={{
            backgroundColor: '#27403e',
            marginHorizontal: 25,
            borderRadius: 20,
          }}
          textStyleProps={{
            color: '#fff',
            fontFamily: 'Poppins-Medium',
          }}
          onPress={handleLogin}
        />

        <View style={{flexDirection: 'row'}}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}> Or </Text>
          <View style={styles.separatorLine} />
        </View>

        <View>
          <TouchableOpacity
            onPress={() => Alert.alert('Login with google')}
            style={styles.googleButton}>
            <View style={styles.ortherView}>
              <Image
                source={require('../../../assets/images/logo_google.png')}
                style={styles.logoImage}></Image>
              <Text style={styles.ortherText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert('Login with facebook');
              // deleteAllData()
              //uploadDataToFirestore();
            }}
            style={styles.facebookButton}>
            <View style={styles.ortherView}>
              <Image
                source={require('../../../assets/images/logo_facebook.png')}
                style={styles.logoImage}></Image>
              <Text style={styles.ortherText}>Continue with Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpView}>
          <Text style={styles.accountText}>Don't have an account?</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <ModalComponent
          isVisible={isError}
          message={errorText}
          onConfirm={() => setIsError(false)}
          type="one-button"
          icon={<Forbidden2 color="red" size={30} />}
        />
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    //justifyContent: 'center',
    flex: 1,
  },

  backButton: {
    height: 25,
    width: 25,
    left: 0,
    top: 0,
    marginTop: 25,
    marginLeft: 15,
  },

  backImage: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },

  button: {
    backgroundColor: '#27403e',
    height: 52,
    width: 'auto',
    borderRadius: 20,
    left: 0,
    position: 'relative',
    top: 0,
    marginLeft: 25,
    marginRight: 25,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    fontWeight: '500',
    left: 0,
    letterSpacing: -0.24,
    lineHeight: 20,
    position: 'relative',
    top: 0,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#21a691',
    alignItems: 'center',
    justifyContent: 'center',
  },

  roleButtonActive: {
    backgroundColor: '#21a691',
  },

  separatorLine: {
    backgroundColor: '#000',
    width: 153,
    height: 1,
    top: 0,
    marginLeft: 20,
    marginRight: 6,
    marginTop: 28.5,
  },
  separatorText: {
    color: '#21a691',
    height: 21,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
    left: 0,
    top: 0,
    letterSpacing: 0,
    textAlign: 'center',
    marginTop: 18,
    marginLeft: 5,
  },
  googleButton: {
    backgroundColor: '#ffffff',
    height: 52,
    width: 'auto',
    borderRadius: 30,
    left: 0,
    position: 'relative',
    top: 0,
    marginLeft: 25,
    marginRight: 25,
    borderColor: '#16171a',
    borderWidth: 1,
    marginTop: 19,
    color: '#000',
  },
  facebookButton: {
    backgroundColor: '#ffffff',
    height: 52,
    width: 'auto',
    borderRadius: 30,
    left: 0,
    position: 'relative',
    top: 0,
    marginLeft: 25,
    marginRight: 25,
    borderColor: '#16171a',
    borderWidth: 1,
    marginTop: 19,
  },
  ortherText: {
    color: '#21a691',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    fontWeight: '500',
    left: 0,
    letterSpacing: -0.24,
    lineHeight: 20,
    position: 'relative',
    top: 0,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 10,
    marginRight: 6,
  },

  ortherView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  logoImage: {
    height: 25,
    width: 25,
    left: 0,
    top: 0,
    marginTop: 12,
    marginRight: 16,
    marginBottom: 10,
  },

  accountText: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    letterSpacing: -0.3,
    left: 0,
    lineHeight: 15,
    textAlign: 'center',
    top: 0,
    color: '#000000',
  },
  signUpView: {
    flexDirection: 'row',
    marginTop: 29.2,
    marginLeft: 89,
    marginRight: 89,
    marginBottom: 20,
  },

  signUpText: {
    color: '#21a691',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    lineHeight: 15,
    letterSpacing: -0.3,
    fontSize: 13,
    left: 15,
    top: 0,
  },
});

export default LoginScreen;
