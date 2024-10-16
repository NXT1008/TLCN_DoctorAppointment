import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View, type StyleProp, type ViewStyle} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../constants/colors';
import {globalStyles} from '../styles/global/globalStyles';
import {replaceName} from '../utils/replaceName';
import Card from './Card';
import Col from './Col';
import Row from './Row';
import Space from './Space';
import Text from './TextComponent';
import type {SelectModel} from './models/SelectModel';

export interface SelectProps {
  options: SelectModel[];
  multible?: boolean;
  selected?: string | string[];
  onSelect: (val: string | string[]) => void;
  styles?: StyleProp<ViewStyle>;
  placeholder?: string;
}

const Select = (props: SelectProps) => {
  const {options, multible, selected, onSelect, styles, placeholder} = props;

  const [searchKey, setSearchKey] = useState('');
  const [itemsSelected, setItemsSelected] = useState<string[]>([]);
  const [buttonHeight, setButtonHeight] = useState<number>();
  const [isShow, setIsShow] = useState(false);
  const [results, setResults] = useState<SelectModel[]>([]);

  const inpRef = useRef<TextInput>(null);

  useEffect(() => {
    setResults(options);
  }, [options]);

  useEffect(() => {
    !isShow && setSearchKey('');
  }, [isShow]);

  useEffect(() => {
    if (!searchKey) {
      setResults(options);
    } else {
      const items = options.filter(
        element =>
          typeof element.label === 'string' &&
          replaceName(element.label).includes(replaceName(searchKey)),
      );

      setResults(items);
    }
  }, [searchKey, options]);

  useEffect(() => {
    setItemsSelected(
      selected ? (typeof selected === 'string' ? [selected] : selected) : [],
    );
  }, [selected]);

  const handleSelect = (val: string) => {
    const items = [...itemsSelected];
    const index = items.findIndex(element => element === val);

    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push(val);
    }
    onSelect(items);
    setSearchKey('');
  };

  const renderText = (val: string, index: number) => {
    const item = results.find(element => element.value === val);

    const text =
      typeof item?.label === 'string' ? (
        <Text text={item?.label as string} size={12} />
      ) : (
        item?.label
      );

    return multible ? (
      <Row
        onPress={() => {
          const items = [...itemsSelected];
          items.splice(index, 1);
          setItemsSelected(items);
        }}
        key={`selected${val}`}
        styles={{
          backgroundColor: '#f3f3f3',
          paddingVertical: 2,
          borderRadius: 100,
          paddingHorizontal: 12,
          marginRight: 6,
          marginBottom: 6,
        }}>
        {text}

        <Space width={4} />
        <AntDesign name="close" size={16} color={colors.gray700} />
      </Row>
    ) : (
      text
    );
  };

  return (
    <View
      style={{
        position: 'relative',
      }}>
      <View
        onLayout={event => {
          setButtonHeight(event.nativeEvent.layout.height);
        }}>
        <Row
          styles={[
            globalStyles.inputContainer,
            {borderRadius: 12, alignItems: 'flex-start'},
            styles,
          ]}>
          <View style={[globalStyles.row, {flex: 1, flexWrap: 'wrap'}]}>
            {itemsSelected.length > 0 &&
              itemsSelected.map((item, index) => renderText(item, index))}

            <TextInput
              onFocus={() => setIsShow(true)}
              onBlur={() => setIsShow(false)}
              style={[globalStyles.input, {flex: 1, minWidth: 100}]}
              placeholder={
                itemsSelected.length === 0
                  ? placeholder
                    ? placeholder
                    : 'Chọn'
                  : ''
              }
              value={searchKey}
              onChangeText={val => setSearchKey(val)}
              ref={inpRef}
            />
          </View>
          <Space width={12} />
          <Feather name="search" size={20} color={colors.gray400} />
        </Row>
      </View>
      {isShow ? (
        <View
          style={{
            position: 'absolute',
            top: buttonHeight ? buttonHeight + 4 : 'auto',
            zIndex: 1,
            right: 0,
            left: 0,
          }}>
          <Card
            color="white"
            styles={{
              maxHeight: 300,
              overflow: 'scroll',
            }}>
            {results.length > 0 ? (
              results.map((item, index) =>
                typeof item.label === 'string' ? (
                  <Row
                    onPress={() => {
                      if (multible) {
                        handleSelect(item.value);
                      } else {
                        onSelect(item.value);
                        setIsShow(false);
                        inpRef.current?.blur();
                      }
                    }}
                    key={item.value}
                    justifyContent="flex-start"
                    styles={{
                      marginBottom: index < options.length - 1 ? 12 : 0,
                    }}>
                    <Col>
                      <Text
                        color={
                          itemsSelected.includes(item.value)
                            ? colors.primary
                            : colors.text
                        }
                        text={item.label}
                      />
                    </Col>
                    {itemsSelected.includes(item.value) && (
                      <Feather name="check" size={18} color={colors.primary} />
                    )}
                  </Row>
                ) : (
                  item.label
                ),
              )
            ) : (
              <Text text="No data" color={colors.gray} />
            )}
          </Card>
        </View>
      ) : null}
    </View>
  );
};

export default Select;
