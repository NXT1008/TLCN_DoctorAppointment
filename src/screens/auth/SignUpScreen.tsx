import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  ContainerComponent,
  Input,
  Section,
  Space,
  TextComponent,
  Button
} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';

import auth from '@react-native-firebase/auth';

const SignUpScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInWithEmail = async () => {
    if (!email || !password) {
      console.log("Rong")
    } else {
      setIsLoading(true);
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCridential => {
          const user = userCridential.user;
          if (user) {
            console.log(user);
          }

          // save user to firestore
          setIsLoading(false);
        })
        .catch((error: any) => {
          setIsLoading(false);
          console.log(error.message);
        });
    }
  };

  return (
    <ContainerComponent isScroll>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}} style={styles.backButton}>
          <Image
            source={require('../../assets/images/back_arrow.png')}
            style={styles.backImage}></Image>
        </TouchableOpacity>

<<<<<<< HEAD
        {/* <Text style={styles.welcomeText}>Register Your New Account!</Text> */}
        <TextComponent
          text="Register Your New Account!"
          color="#21a691"
          size={30}
          font={fontFamilies.medium}
          styles={{textAlign: 'center'}}
        />
=======
        <Text style={styles.welcomeText}>Register Your New Account!</Text>
>>>>>>> 447045d (push my project)

        <Section
          styles={{marginHorizontal: 10, marginTop: 60, paddingBottom: 0}}>
          <TextComponent
            text="Name"
            size={18}
            color="#21a691"
            styles={{fontFamily: fontFamilies.medium, fontWeight: '600'}}
          />
          <Space height={8} />
          <Input
            value={name}
            onChange={val => {
              setName(val);
            }}
            placeholder="Enter your name"
            clear
            color="#f4f6f9"
<<<<<<< HEAD
            inputStyles={{fontFamily: fontFamilies.regular, fontSize: 13}}
            prefix
=======
>>>>>>> 447045d (push my project)
          />
        </Section>

        <Section styles={{marginHorizontal: 10, paddingBottom: 0}}>
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
            placeholder="Enter your email"
            clear
            color="#f4f6f9"
<<<<<<< HEAD
            inputStyles={{fontFamily: fontFamilies.regular, fontSize: 13}}
            prefix
=======
>>>>>>> 447045d (push my project)
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
            onChange={val => {
              setPassword(val);
            }}
            placeholder="Enter your password"
            clear
            color="#f4f6f9"
<<<<<<< HEAD
            inputStyles={{fontFamily: fontFamilies.regular, fontSize: 13}}
            prefix
=======
>>>>>>> 447045d (push my project)
          />
        </Section>

        <Section styles={{marginHorizontal: 10, paddingBottom: 0}}>
          <TextComponent
            text="Confirm Password"
            size={18}
            color="#21a691"
            styles={{fontFamily: fontFamilies.medium, fontWeight: '600'}}
          />
          <Space height={8} />
          <Input
            value={confirmPassword}
            onChange={val => {
              setConfirmPassword(val);
            }}
            placeholder="Enter confirm password"
            clear
            color="#f4f6f9"
<<<<<<< HEAD
            inputStyles={{fontFamily: fontFamilies.regular, fontSize: 13}}
            prefix
=======
>>>>>>> 447045d (push my project)
          />
        </Section>

        <Button
<<<<<<< HEAD
          loading={isLoading}
          title="Sign Up"
=======
          loading = {isLoading}
          title="Sign In"
>>>>>>> 447045d (push my project)
          styles={{
            backgroundColor: '#27403e',
            marginHorizontal: 25,
            borderRadius: 20,
<<<<<<< HEAD
            marginTop: 20,
=======
            marginTop: 20
>>>>>>> 447045d (push my project)
          }}
          textStyleProps={{
            color: '#fff',
            fontFamily: 'Poppins-Medium',
          }}
          onPress={handleSignInWithEmail}
        />

        <View style={styles.signInView}>
          <Text style={styles.accountText}>Have an account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    //justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },

  backButton: {
    height: 46,
    width: 46,
    left: 0,
    top: 0,
    marginTop: 15,
    marginBottom: 1,
    marginLeft: 25,
  },

  backImage: {
    height: 25,
    width: 25,
    top: 10,
    left: 10,
    position: 'absolute',
  },

  welcomeText: {
    position: 'relative',
    color: '#21a691',
    height: 78,
    width: 375,
    fontFamily: fontFamilies.bold,
    fontSize: 35,
    fontWeight: '700',
    left: 0,
    letterSpacing: -0.24,
    lineHeight: 39,
    textAlign: 'center',
    top: 0,
    marginLeft: 2,
    marginRight: 2,
  },

  nameText: {
    color: '#21a691',
    height: 40,
    width: 55,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '600',
    left: 0,
    letterSpacing: 0,
    lineHeight: 40,
    position: 'relative',
    textAlign: 'center',
    top: 0,
    marginTop: 0,
    marginLeft: 25,
  },

  phoneText: {
    color: '#21a691',
    height: 40,
    width: 57,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '600',
    left: 0,
    letterSpacing: 0,
    lineHeight: 40,
    position: 'relative',
    textAlign: 'center',
    top: 0,
    marginLeft: 25,
    marginTop: 25,
  },

  textInput: {
    backgroundColor: '#f4f6f9',
    borderRadius: 10,
    height: 52,
    left: 0,
    position: 'relative',
    top: 0,
    width: 'auto',
    marginLeft: 25,
    marginRight: 25,
  },

  passwordText: {
    color: '#21a691',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    width: 'auto',
    height: 'auto',
    fontWeight: '600',
    left: 0,
    letterSpacing: 0,
    lineHeight: 40,
    position: 'relative',
    textAlign: 'left',
    top: 0,
    marginLeft: 25,
    marginTop: 25,
    backgroundColor: 'coral',
  },

  confirmPasswordText: {
    color: '#21a691',
    height: 40,
    width: 166,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '600',
    left: 0,
    letterSpacing: 0,
    lineHeight: 40,
    position: 'relative',
    textAlign: 'center',
    top: 0,
    marginLeft: 25,
    marginTop: 25,
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
    marginTop: 35,
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

  accountText: {
    color: '#000',
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: -0.3,
    left: 0,
    lineHeight: 15,
    textAlign: 'center',
    top: 0,
    marginBottom: 10,
  },
  signInView: {
    flexDirection: 'row',
    marginTop: 29.2,
    marginLeft: 89,
    marginRight: 89,
    marginBottom: 20,
    justifyContent: 'center',
  },

  signInText: {
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

export default SignUpScreen;
