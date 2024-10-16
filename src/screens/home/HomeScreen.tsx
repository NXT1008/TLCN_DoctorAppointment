import {View, Text, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ContainerComponent, Row, Space, TextComponent } from '../../components';
import auth from '@react-native-firebase/auth'

const HomeScreen = () => {

  const user = auth().currentUser

  return (
    <ContainerComponent>
      <Row styles={{justifyContent: 'flex-start', paddingHorizontal: 15, paddingTop: 20}}>
        <Image source={require('../../assets/IconTab/profile.png')} />
        <Space width={15}/>
        <View>
          <TextComponent text="Hi, welcome back!"/>
          <TextComponent text={`${user?.email}`}/>
        </View>
        
      </Row>

    </ContainerComponent>
  );
};

export default HomeScreen;
