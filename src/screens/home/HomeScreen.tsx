<<<<<<< HEAD
import {View, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Card,
  Col,
  ContainerComponent,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../components';
import auth from '@react-native-firebase/auth';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import { Car } from 'iconsax-react-native';

const HomeScreen = () => {
  const user = auth().currentUser;

  return (
    <ContainerComponent>
      <Row
        styles={{
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingTop: 20,
          width: '100%',
        }}>
        <Row>
          <Image source={require('../../assets/IconTab/profile.png')} />
          <Space width={15} />
          <View>
            <TextComponent text="Hi, welcome back!" />
            <TextComponent text={`${user?.email}`} />
          </View>
        </Row>
        <TextComponent text="Icon" />
      </Row>

      <Section styles={{marginTop: 15}}>
        <Input
          value=""
          onChange={() => {}}
          radius={15}
          prefix
          iconClear
          placeholder="Search a Doctor"
          styles={{backgroundColor: '#D9D9D94D'}}
          bordered
        />
      </Section>
      <Card>
        <Row styles={{justifyContent: 'space-between'}}>
          <Col>
            <TextComponent
              text="Medical Center"
              size={22}
              styles={{fontFamily: fontFamilies.bold}}
            />
            <TextComponent
              text="Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
              size={12}
              numberOfLine={4}
              styles={{fontFamily: fontFamilies.regular}}
            />
          </Col>
          <Image source={require('../../assets/images/doctor.png')} />
        </Row>
      </Card>
      <TextComponent text="...." textAlign='center' />
      <Section>
        <Row justifyContent='space-between'>
          <TextComponent text='Categories' />
          <TextComponent text='See All' />
        </Row>
      </Section>
      <Section>
        <Card styles={{width: 150, height: 80, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
          <TextComponent text='Denteeth'/>
        </Card>
      </Section>
=======
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

>>>>>>> 447045d (push my project)
    </ContainerComponent>
  );
};

export default HomeScreen;
