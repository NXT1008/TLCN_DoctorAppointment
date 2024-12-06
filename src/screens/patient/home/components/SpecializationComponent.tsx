import {View, Text, Image} from 'react-native';
import React, {ReactNode} from 'react';
import {Card, Space, TextComponent} from '../../../../components';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {Specialization} from '../../../../models/Specialization';

interface Props {
  data: Specialization;
  icon?: ReactNode;
}

const SpecializationComponent = (props: Props) => {
  const {data, icon} = props;
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
      {icon ? (
        icon
      ) : (
        <Image
          source={{uri: data.image}}
          resizeMode="contain"
          resizeMethod="resize"
          style={{width: 25, height: 25}}
        />
      )}
      <Space width={5}/>
      <TextComponent
        styles={{flexShrink: 1}}
        text={data.name ? data.name : ''}
        size={12}
        font={fontFamilies.regular}
        color="#000000"
      />
    </Card>
  );
};

export default SpecializationComponent;
