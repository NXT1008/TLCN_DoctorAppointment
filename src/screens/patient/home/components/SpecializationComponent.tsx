import {View, Text, Image} from 'react-native';
import React, {ReactNode} from 'react';
import {Card, TextComponent} from '../../../../components';
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
          source={require('../../../../assets/IconTab/doctor.png')}
          resizeMode="contain"
          resizeMethod="resize"
          style={{width: 30, height: 30}}
        />
      )}
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
