import {View, Text, Modal, Dimensions} from 'react-native';
import React, {useState} from 'react';
import TextComponent from '../../../../components/TextComponent';
import {colors} from '../../../../constants/colors';
import {ArrowDown2} from 'iconsax-react-native';
import {globalStyles} from '../../../../styles/globalStyles';
import DatePicker from 'react-native-date-picker';
import Row from '../../../../components/Row';
import Space from '../../../../components/Space';
import {fontFamilies} from '../../../../constants/fontFamilies';
import Button from '../../../../components/Button';

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
        {title && (
          <TextComponent text={title} font={fontFamilies.semiBold} size={14} />
        )}
        <Row
          justifyContent="space-between"
          onPress={() => setIsVisibleModalDateTime(true)}
          styles={[
            {
              marginTop: title ? 8 : 0,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 10,
              paddingHorizontal: 20,
            },
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
            color={selected ? '#000' : '#676767'}
            font={fontFamilies.regular}
            size={16}
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
              padding: 20,
              borderRadius: 20,
              backgroundColor: '#DEE3E7',
            }}>
            {/* <TextComponent text="Date time picker" color={'#000'} /> */}
            <View>
              <DatePicker
                mode={type ? type : 'datetime'}
                date={date}
                onDateChange={val => {
                  // Thêm 7 giờ vào thời gian được chọn để chuyển sang GMT+7
                  const vietnamTime = new Date(
                    val.getTime() + 7 * 60 * 60 * 1000,
                  );
                  setDate(vietnamTime); // Cập nhật thời gian với múi giờ Việt Nam
                }}
                locale="vi"
                theme="light"
              />
            </View>
            <Space height={20} />
            <Row justifyContent="space-between">
              <Button
                textStyleProps={{
                  fontFamily: fontFamilies.semiBold,
                  fontSize: 14,
                  color: '#fff',
                }}
                styles={{backgroundColor: '#a82700', width: '40%'}}
                title="Close"
                onPress={() => setIsVisibleModalDateTime(false)}
              />
              <Button
                textStyleProps={{
                  fontFamily: fontFamilies.semiBold,
                  fontSize: 14,
                  color: '#fff',
                }}
                styles={{backgroundColor: '#089e7b', width: '40%'}}
                title="Comfirm"
                onPress={() => {
                  onSelect(date);
                  setIsVisibleModalDateTime(false);
                }}
              />
            </Row>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DateTimePickerComponent;
