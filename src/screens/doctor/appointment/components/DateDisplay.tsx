import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import moment from 'moment';

interface DateDisplayProps {
  date: Date;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  const formattedDate = moment(date).format('ddd, MMM D, YYYY');

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        height: 18,
        width: 112,
        backgroundColor: '#fff',
        left: 0,
        top: 0,
        borderRadius: 13
      },
    dateText: {
      fontSize: 12,               
      fontWeight: '600',        
      color: '#27403e',           
      textAlign: 'center',  
      letterSpacing: 0
    },
  });
export default DateDisplay;
