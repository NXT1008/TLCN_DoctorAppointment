import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {Section, TextComponent} from '.';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const DateTime = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = new Date();
    if (selectedDate && selectedDate >= currentDate) {
      setSelectedDate(selectedDate);
      setMode('closed');
      setShow(false);
    }
  };

  const showMode = () => {
    setMode('date');
    setShow(true);
  };

    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);


    return (
        <Section styles={styles.dateSection}>
            {/* <TextComponent text='Date' font='Poppins-Medium' size={20} /> */}
            <TouchableOpacity style={styles.dateBox} onPress={showMode}>
                <Text style={styles.dateText}>
                    {selectedDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </Text>
            </TouchableOpacity>
            {mode === 'date' && show && (
                <DateTimePicker
                    testID="datePicker"
                    value={selectedDate}
                    mode={mode}
                    is24Hour={false}
                    display='default'
                    onChange={handleDateChange}
                    minimumDate={todayMidnight}
                />
            )}
        </Section>
    )
}

export default DateTime;
const styles = StyleSheet.create({
  dateSection: {
    marginBottom: 20,
  },
  dateBox: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
