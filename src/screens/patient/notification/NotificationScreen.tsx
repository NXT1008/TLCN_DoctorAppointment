import { ArrowLeft2 } from 'iconsax-react-native';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Card, ContainerComponent, Section} from '../../../components';
import {useNavigation} from '@react-navigation/native';


const notifications = [
  {
    date: '20 Sep, 2020',
    entries: [
      {
        id: 'calendar',
        doctorName: 'Mahbuba Islam',
        text: 'Your have appointment with {doctorName} at 9:00 pm today',
        time: 'Just Now',
      },
      {
        id: 'completed',
        text: 'Completed your profile to be better health consults.',
        linkText: 'Complete Profile',
        time: '25 Minutes ago',
      },
      {
        id: 'calendar',
        doctorName: 'Doctor A',
        text: 'Your have appointment with {doctorName} at 9:00 pm today',
        time: 'Just Now',
      },
    ],
  },
  {
    date: '19 Sep, 2020',
    entries: [
      {
        id: 'calendar',
        doctorName: 'Mahbuba Islam',
        text: 'Your have appointment with {doctorName} at 9:00 pm today',
        time: 'Just Now',
      },
      {
        id: 'completed',
        text: 'Completed your profile to be better health consults.',
        linkText: 'Complete Profile',
        time: '25 Minutes ago',
      },
      {
        id: 'calendar',
        doctorName: 'Doctor B',
        text: 'Your have appointment with {doctorName} at 9:00 pm today',
        time: 'Just Now',
      },
    ],
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation()
  return (
    <ContainerComponent style={styles.container} isScroll>

      <Section styles={styles.header}>
        <ArrowLeft2 color='#000' onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Notification</Text>
      </Section>


      {notifications.map((section, index) => (
        <Section key={index}>
          <Text style={styles.dateText}>
            {index === 0 ? `Today - ${section.date}` : section.date}
          </Text>


          {section.entries.map((entry, idx) => (
            <Card key={idx} styles={styles.notificationRow}>
              <Image
                source={
                  entry.id === 'calendar'
                    ? require('../../../assets/images/present_calendar.png')
                    : require('../../../assets/images/past_calendar.png')
                }
                style={styles.icon}
              />
              <View style={styles.notificationContent}>
                {/* cái này để thay tên bác sĩ vào */}
                <Text style={styles.notificationText}>
                  {entry.text.replace('{doctorName}', entry.doctorName || '')}{' '}
                  {entry.linkText && <Text style={styles.linkText}>{entry.linkText}</Text>}
                </Text> 
                <Text style={styles.timeText}>{entry.time}</Text>
              </View>
            </Card>
          ))}
        </Section>
      ))}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#21a691',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold'
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
    color: '#333',
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  linkText: {
    color: '#1E90FF',
    fontFamily: 'Poppins-Regular',

  },
  timeText: {
    color: '#555',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
});

export default NotificationScreen;
