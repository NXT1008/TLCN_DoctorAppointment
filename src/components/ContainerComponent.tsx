import {ArrowLeft2} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/global/globalStyles';
import RowComponent from './Row';
import TextComponent from './TextComponent';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  children: ReactNode;
  isScroll?: boolean;
  style?: StyleProp<ViewStyle>;
  styleHeader?: StyleProp<ViewStyle>;
}

const Container = (props: Props) => {
  const {title, back, right, children, isScroll, style, styleHeader} = props;

  const navigation: any = useNavigation();

  return (
    <View
      style={[globalStyles.container, {flex: 1}, style]}
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 50}
    >
      {/* Header container */}
      <RowComponent
        styles={[
          {
            paddingHorizontal: 16,
            paddingBottom: 16,
            justifyContent: 'center',
            alignItems: 'center',
          },
          styleHeader,
        ]}>
        {back && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <View style={{flex: 1, zIndex: -1}}>
          {title && (
            <TextComponent
              flex={0}
              font={fontFamilies.bold}
              size={16}
              text={title}
              styles={{textAlign: 'center', marginLeft: back ? -24 : 0}}
            />
          )}
        </View>
        {right && (
          <View style={{position: 'absolute', right: 16}}>{right}</View>
        )}
      </RowComponent>
      {isScroll ? (
        <ScrollView style={{flex: 1, flexGrow: 1}}>{children}</ScrollView>
      ) : (
        <View style={{flex: 1}}>{children}</View>
      )}
    </View>
  );
};

export default Container;
