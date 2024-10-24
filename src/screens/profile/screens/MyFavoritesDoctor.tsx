import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  ContainerComponent,
  Row,
  Section,
  TextComponent,
} from '../../../components';
import {ArrowLeft2} from 'iconsax-react-native';
import {fontFamilies} from '../../../constants/fontFamilies';
import DoctorComponent from '../components/DoctorComponent';

const MyFavoritesDoctor = (props: any) => {
  return (
    <ContainerComponent isScroll>
      <Section styles={{marginBottom: 15}}>
        <Row justifyContent="flex-start">
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="Favorites Doctors"
              size={20}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <Section>
          <DoctorComponent onPress={() => {}} />
          <DoctorComponent onPress={() => {}} />
          <DoctorComponent onPress={() => {}} />
          <DoctorComponent onPress={() => {}} />
          <DoctorComponent onPress={() => {}} />
      </Section>
    </ContainerComponent>
  );
};

export default MyFavoritesDoctor;
