import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {Row, TextComponent} from '../../../../components';
import {fontFamilies} from '../../../../constants/fontFamilies';

const WeekHeader = ({date}: {date: Date}) => {
  // Tính toán các ngày trong tuần
  const startOfWeek = moment(date).startOf('week'); // Bắt đầu tuần (Thứ 2)
  const daysOfWeek = Array.from({length: 7}, (_, i) =>
    startOfWeek.clone().add(i, 'days'),
  );

  const selectedDate = moment(date).startOf('day'); // Ngày được chọn

  return (
    <Row
      styles={{
        backgroundColor: '#046ac4',
        paddingLeft: 53,
      }}>
      {daysOfWeek.map((day, index) => {
        const isSelectedDate = selectedDate.isSame(day, 'day'); // Kiểm tra xem ngày có phải là ngày được chọn không
        return (
          <View
            key={index}
            style={{
              width: 66.2, // Kích thước cố định cho mỗi ô
              height: 50, // Chiều cao của ô
              justifyContent: 'center', // Căn giữa theo chiều dọc
              alignItems: 'center', // Căn giữa theo chiều ngang
              borderLeftWidth: 1,
              borderLeftColor: '#fff',
            }}>
            <TextComponent
              key={index}
              text={`${day.format('ddd')} ${day.format('DD')}`}
              font={
                isSelectedDate ? fontFamilies.bold : fontFamilies.semiBold
              }
              size={12}
              color={isSelectedDate ? 'orange' : '#fff'}
            />
          </View>
        );
      })}
    </Row>
  );
};

export default WeekHeader;
