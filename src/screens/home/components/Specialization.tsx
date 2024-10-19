import { View, Text, Image } from 'react-native'
import React from 'react'
import { Card, TextComponent } from '../../../components';
import { fontFamilies } from '../../../constants/fontFamilies';

const Specialization = () => {
  return (
    <Card
      onPress={() => {}}
      color="#c7eaed"
      styles={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        shadowColor: 'rgba(10,157,0,0.5)',
        borderRadius: 15,
      }}>
      <Image
        source={require('../../../assets/IconTab/doctor.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{width:30, height:30}}
      />
      <TextComponent
        styles={{flexShrink:1}}
        text="Specialization"
        size={12}
        font={fontFamilies.regular}
        color="#000000"
      />
    </Card>
  );
}

export default Specialization