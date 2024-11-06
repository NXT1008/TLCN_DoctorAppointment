import { ArrowLeft2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, ContainerComponent, Section } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { Appointment } from '../../../models/Appointment';


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

const NotificationScreen = () => {
  const navigation = useNavigation();
  
  // Khai báo state notifications với kiểu dữ liệu Appointment
  const [notifications, setNotifications] = useState<Appointment[]>([]);

  useEffect(() => {
    const checkUpcomingAppointments = () => {
      const now = new Date(); // Lấy thời gian hiện tại

      const newNotifications: Appointment[] = appointments.filter((appointment) => {
        if (appointment.status === 'booked') {
          const startTime = appointment.startTime; // Lấy thời gian bắt đầu
          const timeDifference = (startTime.getTime() - now.getTime()) / (60 * 1000); // Tính chênh lệch thời gian theo phút
          return timeDifference <= 15 && timeDifference >= 0; // Chỉ hiển thị nếu trong vòng 15 phút
        } else if (appointment.status === 'completed') {
          const endTime = appointment.endTime; // Lấy thời gian kết thúc
          return endTime <= now; // Nếu thời gian kết thúc đã qua
        }
        return false; // Trả về false nếu không thỏa mãn điều kiện
      });

      // Thêm thông báo mới vào đầu danh sách
      setNotifications((prevNotifications) => [
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

  return (
    <ContainerComponent style={styles.container} isScroll>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft2 color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notification</Text>
      </View>

      {notifications.length > 0 ? (
        notifications.map((entry, idx) => (
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
