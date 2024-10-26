import {View, Text, Modal, Button, Dimensions} from 'react-native';
import React, {useState} from 'react';
import TextComponent from './TextComponent';
import {colors} from '../constants/colors';
import {ArrowDown2} from 'iconsax-react-native';
import {globalStyles} from '../styles/globalStyles';
import DatePicker from 'react-native-date-picker';
import Row from './Row';
import Space from './Space';

interface Props {
  type?: 'date' | 'time' | 'datetime';
  title?: string;
  placeholder?: string;
  selected?: Date;
  onSelect: (val: Date) => void;
}

const DateTimePickerComponent = (props: Props) => {
  const {selected, onSelect, placeholder, title, type} = props;

  const [isVisibleModalDateTime, setIsVisibleModalDateTime] = useState(false);
  const [date, setDate] = useState(selected ?? new Date());
  return (
    <>
      <View style={{marginBottom: 16}}>
        {title && <TextComponent text={title} />}
        <Row
          onPress={() => setIsVisibleModalDateTime(true)}
          styles={[
            {marginTop: title ? 8 : 0, paddingVertical: 16},
          ]}>
          <TextComponent
            flex={1}
            text={
              selected
                ? type === 'time'
                  ? `${selected.getHours()}:${selected.getMinutes()}`
                  : `${selected.getDate()}/${
                      selected.getMonth() + 1
                    }/${selected.getFullYear()}`
                : placeholder
                ? placeholder
                : ''
            }
            color={selected ? colors.text : '#676767'}
          />
          <ArrowDown2 size={20} color={colors.text} />
        </Row>
      </View>

      <Modal visible={isVisibleModalDateTime} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              margin: 20,
              width: '90%',
              backgroundColor: colors.white,
              padding: 20,
              borderRadius: 20,
            }}>
            <TextComponent text="Date time picker" color={'blue'} />
            <View>
              <DatePicker
                mode={type ? type : 'datetime'}
                date={date}
                onDateChange={val => setDate(val)}
                locale="vi"
              />
            </View>
            <Space height={20} />
            <Button
              title="Comfirm"
              onPress={() => {
                onSelect(date);
                setIsVisibleModalDateTime(false);
              }}
            />
            <Button
              title="Close"
              onPress={() => setIsVisibleModalDateTime(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DateTimePickerComponent;
