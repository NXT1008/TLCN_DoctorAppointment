import {ArrowLeft2} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  Card,
  ContainerComponent,
  Row,
  Section,
  TextComponent,
} from '../../../components';
import {Notification} from '../../../models/Notification';
import {Appointment} from '../../../models/Appointment';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {Patient} from '../../../models/Patient';
import {DateTime} from '../../../utils/DateTime';
import {FormatTime} from '../../../utils/formatTime';
import {fontFamilies} from '../../../constants/fontFamilies';
import ModalComponent from './components/ModalComponent';

const notificationsFake = [
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

const DEFAULT_APPOINTMENT: Appointment = {
  appointmentId: 'default',
  scheduleDate: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  status: 'unknown',
  patientId: 'default',
  doctorId: 'default',
  note: '',
};

interface NotificationWithAppointment {
  notification: Notification;
  appointment: Appointment;
}

const NotificationScreen = ({navigation, route}: any) => {
  const {patient} = route.params;
  const patientInfo = patient as Patient;

  const [notifications, setNotifications] = useState<
    NotificationWithAppointment[]
  >([]);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationWithAppointment>();

  const [isModalVisible, setModalVisible] = useState(false);

  // load all notifications of doctor
  useEffect(() => {
    const unsubcribeNotifications = firestore()
      .collection('notifications')
      .where('receiverId', '==', patientInfo.patientId)
      .onSnapshot(
        async snapshot => {
          if (!snapshot.empty) {
            const notificationDatas: Notification[] = [];
            snapshot.forEach((item: any) => {
              const data = item.data();
              // Chuyển đổi scheduleDate thành Date nếu cần
              const sendAt =
                data?.sendAt instanceof Date
                  ? data.sendAt
                  : (data?.sendAt as Timestamp).toDate();

              notificationDatas.push({
                notificationId: item.id,
                ...data,
                sendAt: sendAt,
              });
            });

            // Lấy thông tin appointment cho mỗi notification
            const detailNotification = await Promise.all(
              notificationDatas.map(async item => {
                const appointment = await fetchAppointmentByNotification(item);
                return {
                  notification: item,
                  appointment: appointment || ({} as Appointment),
                };
              }),
            );
            setNotifications(detailNotification);
          } else {
            console.log('🚀 ~ useEffect ~ No have notification');
          }
        },
        error => {
          console.log('🚀 ~ useEffect ~ error:', error);
        },
      );
    return () => {
      unsubcribeNotifications();
    };
  }, []);

  const fetchAppointmentByNotification = async (
    notification: Notification,
  ): Promise<Appointment> => {
    try {
      const snap = await firestore()
        .collection('appointments')
        .doc(notification.appointmentId)
        .get();

      if (snap.exists) {
        const data = snap.data();

        // Chuyển đổi scheduleDate thành Date nếu cần
        const scheduleDate =
          data?.scheduleDate instanceof Date
            ? data.scheduleDate
            : (data?.scheduleDate as Timestamp).toDate();

        return {
          appointmentId: snap.id,
          ...data,
          scheduleDate, // Thay thế scheduleDate đã chuyển đổi
        } as Appointment;
      }
      return DEFAULT_APPOINTMENT;
    } catch (error) {
      console.log('🚀 ~ fetchAppointmentByNotification ~ error:', error);
      return DEFAULT_APPOINTMENT;
    }
  };

  const onPressCancel = async () => {
    await firestore()
      .collection('notifications')
      .doc(selectedNotification?.notification.notificationId)
      .update({isReaded: true});
    setModalVisible(false);
  };

  // Hàm tính toán thời gian từ khi thông báo được gửi
  const getFormattedDate = (sendAt: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - sendAt.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)); // tính số ngày chênh lệch

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays <= 6) return `${diffDays} days ago`;
    return `${sendAt.getDate()}/${
      sendAt.getMonth() + 1
    }/${sendAt.getFullYear()}`; // Ngày tháng năm
  };

  // Nhóm thông báo lại theo ngày
  const groupNotificationsByDate = (
    notifications: NotificationWithAppointment[],
  ) => {
    const groups: {[key: string]: NotificationWithAppointment[]} = {};

    notifications.forEach(notification => {
      const dateKey = getFormattedDate(notification.notification.sendAt);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(notification);
    });

    return groups;
  };

  return (
    <ContainerComponent style={styles.container} isScroll>
      {selectedNotification && (
        <ModalComponent
          visible={isModalVisible}
          notification={selectedNotification}
          onPressCancel={onPressCancel}
        />
      )}
      <Section styles={styles.header}>
        <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Notification</Text>
      </Section>
      {notifications.length > 0 ? (
        Object.entries(groupNotificationsByDate(notifications)).map(
          ([date, groupedNotifications], index) => (
            <Section key={index}>
              {/* Hiển thị ngày */}
              <Row justifyContent="space-between" styles={{paddingRight: 8}}>
                <TextComponent
                  text={date}
                  font={fontFamilies.semiBold}
                  size={14}
                  styles={{marginBottom: 5}}
                />
                <View
                  style={{
                    backgroundColor: '#fcf0f0',
                    width: 30,
                    height: 30,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextComponent
                    text={groupedNotifications.length.toString()}
                    font={fontFamilies.semiBold}
                    color="#fc5b58"
                    size={14}
                  />
                </View>
              </Row>

              {groupedNotifications.map((item, idx) => (
                <Card
                  key={idx}
                  onPress={() => {
                    setSelectedNotification(item);
                    setModalVisible(true);
                  }}
                  styles={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                    backgroundColor: item.notification.isReaded
                      ? '#fff'
                      : '#e0f6ff',
                  }}>
                  <Image
                    source={
                      item.appointment.status === 'Completed'
                        ? require('../../../assets/images/present_calendar.png')
                        : require('../../../assets/images/past_calendar.png')
                    }
                    style={styles.icon}
                  />
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: fontFamilies.medium,
                      }}>
                      {item.notification.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#333',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {item.notification.body.slice(0, 44) + '...'}
                    </Text>
                    <Text
                      style={{
                        color: '#1b67c4',
                        fontSize: 12,
                        marginTop: 5,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {`${FormatTime.formatAvailableDate(
                        item.notification.sendAt,
                      )}`}
                    </Text>
                  </View>
                </Card>
              ))}
            </Section>
          ),
        )
      ) : (
        <Text
          style={{
            textAlign: 'center',
            color: '#999',
            marginTop: 20,
            fontFamily: 'Poppins-Regular',
          }}>
          No notifications
        </Text>
      )}
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
    fontFamily: 'Poppins-Bold',
  },
  icon: {
    marginRight: 10,
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
});

export default NotificationScreen;
