import {ArrowLeft2} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, ContainerComponent, Section} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {Appointment} from '../../../models/Appointment';
import firestore from '@react-native-firebase/firestore';
import {Doctor} from '../../../models/Doctor';
import {Notification} from '../../../models/Notification';

// Dữ liệu mẫu cuộc hẹn
const appointments: Appointment[] = [
  {
    appointmentId: '6',
    patientId: 'p006',
    doctorId: 'd001',
    scheduleDate: new Date('2024-10-31'),
    startTime: new Date('2024-10-31T23:39:00'),
    endTime: new Date('2024-10-31T23:50:00'),
    status: 'booked',
    note: 'Hẹn gặp để kiểm tra tình trạng sức khỏe.',
  },
  {
    appointmentId: '5',
    patientId: 'p005',
    doctorId: 'd004',
    scheduleDate: new Date('2024-06-16'),
    startTime: new Date('2024-06-16T15:00:00'),
    endTime: new Date('2024-06-16T15:30:00'),
    status: 'completed',
    note: 'Khám sức khỏe tổng quát.',
  },
];

interface NotificationWithAppointment {
  notification: Notification;
  appointment: Appointment;
}

const NotificationScreen = ({navigation, route}: any) => {
  const {doctor} = route.params;

  // Khai báo state notifications với kiểu dữ liệu Appointment
  const [notificationsFakeData, setNotificationsFakeData] = useState<
    Appointment[]
  >([]);
  const [notifications, setNotifications] = useState<
    NotificationWithAppointment[]
  >([]);

  useEffect(() => {
    const checkUpcomingAppointments = () => {
      const now = new Date(); // Lấy thời gian hiện tại

      const newNotifications: Appointment[] = appointments.filter(
        appointment => {
          if (appointment.status === 'booked') {
            const startTime = appointment.startTime; // Lấy thời gian bắt đầu
            const timeDifference =
              (startTime.getTime() - now.getTime()) / (60 * 1000); // Tính chênh lệch thời gian theo phút
            return timeDifference <= 15 && timeDifference >= 0; // Chỉ hiển thị nếu trong vòng 15 phút
          } else if (appointment.status === 'completed') {
            const endTime = appointment.endTime; // Lấy thời gian kết thúc
            return endTime <= now; // Nếu thời gian kết thúc đã qua
          }
          return false; // Trả về false nếu không thỏa mãn điều kiện
        },
      );

      // Thêm thông báo mới vào đầu danh sách
      setNotificationsFakeData(prevNotifications => [
        ...newNotifications,
        ...prevNotifications, // Các thông báo cũ vẫn được giữ lại
      ]);
    };

    // Kiểm tra cuộc hẹn ngay khi component được tải và mỗi phút sau đó
    checkUpcomingAppointments();
    const interval = setInterval(checkUpcomingAppointments, 60 * 1000); // Cập nhật mỗi phút

    // Xóa interval khi component bị hủy
    return () => clearInterval(interval);
  }, []);

  // load all notifications of doctor
  useEffect(() => {
    const unsubcribeNotifications = firestore()
      .collection('notifications')
      .where('receiverId', '==', doctor.doctorId)
      .onSnapshot(
        async snapshot => {
          if (!snapshot.empty) {
            const notificationDatas: Notification[] = [];
            snapshot.forEach((item: any) => {
              notificationDatas.push({
                id: item.id,
                ...item.data(),
              });
            });

            // Lấy thông tin appointment cho mỗi notification
            const detailNotification = await Promise.all(
              notificationDatas.map(async (item) => {
                const appointment = await fetchAppointmentByNotification(item)
                return {
                  item, appointment
                }
              })
            )
            // setNotifications(detailNotification)

            console.log('🚀 ~ useEffect ~ notificationDatas:', notificationDatas);
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
  ): Promise<Appointment | null> => {
    try {
      const snap = await firestore()
        .collection('appointments')
        .doc(notification.appointmentId)
        .get();

      if (snap.exists) {
        return snap.data() as Appointment;
      }
      return null;
    } catch (error) {
      console.log('🚀 ~ fetchAppointmentByNotification ~ error:', error);
      return null;
    }
  };

  return (
    <ContainerComponent style={styles.container} isScroll>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft2 color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notification</Text>
      </View>

      {notifications.length > 0 && (
        notifications.map( (item, index) => {
          
          return <></>
        })
      )}

      {notificationsFakeData.length > 0 ? (
        notificationsFakeData.map((entry, idx) => (
          <Section key={idx}>
            <Card styles={styles.notificationRow}>
              <Image
                source={
                  entry.status === 'booked'
                    ? require('../../../assets/images/present_calendar.png')
                    : require('../../../assets/images/past_calendar.png')
                }
                style={styles.icon}
              />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>
                  {entry.status === 'booked'
                    ? `You have an upcoming appointment on ${entry.scheduleDate.toLocaleDateString()} at ${entry.startTime.toLocaleTimeString()}` // Hiển thị ngày và giờ
                    : `Appointment completed: ${entry.note}`}
                </Text>
                <Text style={styles.timeText}>
                  {entry.status === 'booked'
                    ? 'In less than 15 minutes'
                    : `Completed on ${entry.endTime.toLocaleDateString()}`}
                </Text>
              </View>
            </Card>
          </Section>
        ))
      ) : (
        <Text style={styles.noNotifications}>No notifications</Text>
      )}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingTop: 20,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#21a691',
    fontFamily: 'Poppins-Bold',
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  icon: {
    width: 40,
    height: 40,
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
  timeText: {
    color: '#555',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
  noNotifications: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
  },
});

export default NotificationScreen;
