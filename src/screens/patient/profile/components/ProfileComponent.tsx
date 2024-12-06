import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {ReactNode} from 'react';
import {Row, Space, TextComponent} from '../../../../components';
import {ArrowRight2, DocumentText} from 'iconsax-react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';

interface Props {
  text: string;
  image: any
  onPress: () => void;
}

const ProfileComponent = (props: Props) => {
  const {text, onPress, image} = props;

  return (
      <Row justifyContent="space-between" styles={{marginBottom: 15}} onPress={onPress}>
        <Row justifyContent="space-between">
          <View
            style={{
              backgroundColor: '#E6F4F2',
              width: 45,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
          <Image source={image} style={{width: 25, height: 25}} />
          </View>
          <Space width={12} />
          <TextComponent text={text} font={fontFamilies.medium} size={16} />
        </Row>
        <ArrowRight2 color="#000" size={22} />
      </Row>
  );
};

export default ProfileComponent;
