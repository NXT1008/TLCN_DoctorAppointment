import {View, Text, Image, ViewStyle, StyleProp} from 'react-native';
import React, {ReactNode} from 'react';
import {Card, Space, TextComponent} from '../../../../components';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {Specialization} from '../../../../models/Specialization';

interface Props {
  data: Specialization;
  icon?: ReactNode;
  onPress?: () => void;
  isSelected?: boolean;
  stylesCard?: StyleProp<ViewStyle>;
}

const SpecializationComponent = (props: Props) => {
  const {data, icon, onPress, isSelected, stylesCard} = props;
  return (
    <Card
      onPress={onPress}
      color={isSelected ? '#c7eaed' : '#fff'}
      styles={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          shadowColor: 'rgba(10,157,0,0.5)',
          borderRadius: 15,
        },
        stylesCard,
      ]}>
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
      <Space width={10} />
      <TextComponent
        styles={{flexShrink: 1}}
        text={data.name ? data.name : ''}
        size={12}
        font={isSelected ? fontFamilies.medium : fontFamilies.regular}
        color={isSelected ? '#000000' : 'gray'}
      />
    </Card>
  );
};

export default SpecializationComponent;
