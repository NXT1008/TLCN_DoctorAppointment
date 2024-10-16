import React from 'react';
import {
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {colors} from '../constants/colors';
import type {SelectModel} from './models/SelectModel';
import {globalStyles} from '../styles/global/globalStyles';
import Col from './Col';
import Row from './Row';
import Text from './TextComponent';

export interface RadioButtonProps {
  data: SelectModel[];
  onSelect: (val: string) => void;
  selected?: string;
  selectedColor?: string;
  type?: 'horizontal' | 'vertical' | 'button';
  labelStyleProps?: TextStyle;
  buttonContainerColor?: string;
  buttonStyleProps?: StyleProp<ViewStyle>;
}

const RadioGroup = (props: RadioButtonProps) => {
  const {
    data,
    selected,
    onSelect,
    selectedColor,
    type,
    labelStyleProps,
    buttonContainerColor,
    buttonStyleProps,
  } = props;

  const radioContainer: StyleProp<ViewStyle> =
    type && type === 'horizontal'
      ? {
          flexDirection: 'row',
          flexWrap: 'wrap',
        }
      : undefined;

  const renderRadio = (val: string) => {
    const isSelected = selected === val;

    return (
      <View
        style={[
          globalStyles.center,
          {
            borderRadius: 100,
            width: 18,
            height: 18,
            borderWidth: 1,
            borderColor: isSelected
              ? selectedColor ?? colors.blue500
              : colors.gray500,
            marginRight: 8,
          },
        ]}>
        {isSelected && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 100,
              backgroundColor: selectedColor ?? colors.blue500,
            }}
          />
        )}
      </View>
    );
  };

  return !type || type !== 'button' ? (
    <View style={[radioContainer]}>
      {data.map(item => (
        <Row
          justifyContent="flex-start"
          onPress={() => onSelect(item.value)}
          styles={{
            marginBottom: !type || type !== 'horizontal' ? 16 : 0,
            paddingHorizontal: type === 'horizontal' ? 12 : 0,
          }}>
          {renderRadio(item.value)}
          {typeof item.label === 'string' ? (
            <Text text={item.label} styles={labelStyleProps} />
          ) : (
            item.label
          )}
        </Row>
      ))}
    </View>
  ) : (
    <Row
      styles={{
        backgroundColor: buttonContainerColor ?? colors.gray200,
        borderRadius: 100,
      }}>
      {data.map(item => (
        <Col
          onPress={() => onSelect(item.value)}
          styles={[
            globalStyles.center,
            selected === item.value ? globalStyles.shadow : undefined,

            {
              margin: 4,
              padding: 10,
              backgroundColor:
                selected === item.value
                  ? colors.white
                  : buttonContainerColor ?? colors.gray200,
              borderRadius: 100,
            },
            buttonStyleProps,
          ]}>
          {typeof item.label === 'string' ? (
            <Text text={item.label} />
          ) : (
            item.label
          )}
        </Col>
      ))}
    </Row>
  );
};

export default RadioGroup;
