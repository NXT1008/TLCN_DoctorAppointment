import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messing from '@react-native-firebase/messaging';
import {Doctor} from '../models/Doctor';
import {config} from '../constants/config';

const localhost = config.localhost;

export class HandleNotification {
  // Kiểm tra user có quyền gửi nhận thông báo không
  static checkNotificationPermission = async () => {
    // lấy permission
    const authStatus = await messing().requestPermission();

    if (
      authStatus === messing.AuthorizationStatus.AUTHORIZED ||
      authStatus === messing.AuthorizationStatus.PROVISIONAL
    ) {
      this.getFcmToken();
    }
  };

  static getFcmToken = async () => {
    // lấy tokent từ Storage
    await AsyncStorage.removeItem('fcmtoken');
    const fcmoken = await AsyncStorage.getItem('fcmtoken');

    if (!fcmoken) {
      const token = await messing().getToken();

      // Nếu lấy được token thì lưu vào storage
      if (token) {
        await AsyncStorage.setItem('fcmtoken', token);
        // Cập nhật token vào firestore
        this.updateToken(token);
      }
    }
  };

  // Cập nhật token vào firestore
  static updateToken = async (token: string) => {
    const user = auth().currentUser;
    const doctorData = await firestore()
      .collection('doctors')
      .where('email', '==', user?.email)
      .get();

    if (!doctorData.empty) {
      const data: any = doctorData.docs[0].data();
      console.log(data);

      // nếu data không có token thì sẽ cập nhật
      if (!data.tokens || !data.tokens.includes(token)) {
        await firestore().collection('doctors').doc(data.doctorId).update({
          //tokens: firestore.FieldValue.arrayUnion(token), // thêm token vào mảng tokens
          tokens: token,
        });
      }
    }
  };

  // Gửi thông báo từ doctor cho patient
  static sendNotificationDoctorToPatient = async ({
    senderId,
    name,
    receiverId,
    title,
    body,
    appointmentId,
  }: {
    senderId: string;
    name: string;
    receiverId: string;
    title: string;
    body: string;
    appointmentId: string;
  }) => {
    try {
      const response = await fetch(
        `http://${localhost}:3000/send-notification-doctor-to-patient`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId,
            name,
            receiverId,
            appointmentId,
            title, // Tiêu đề thông báo
            body, // Nội dung thông báo
          }),
        },
      );

      if (!response.ok) {
        // Log lỗi HTTP từ server (nếu response không thành công)
        const errorResponse = await response.text();
        console.error(
          `Lỗi từ server: ${response.status} - ${response.statusText}`,
        );
        console.error('Chi tiết lỗi từ server:', errorResponse);
        return;
      }

      const result = await response.json();
      console.log('Thông báo đã gửi:', result);
    } catch (error: any) {
      // Log chi tiết lỗi từ fetch
      console.log('-----------------------');
      console.error('Chi tiết lỗi:', error);
    }
  };
}

export class HandleNotificationPatient {
  // Kiểm tra user có quyền gửi nhận thông báo không
  static checkNotificationPermission = async () => {
    // lấy permission
    const authStatus = await messing().requestPermission();

    if (
      authStatus === messing.AuthorizationStatus.AUTHORIZED ||
      authStatus === messing.AuthorizationStatus.PROVISIONAL
    ) {
      this.getFcmToken();
    } else {
      console.log(
        '🚀 ~ HandleNotificationPatient ~ checkNotificationPermission= ~  Thông báo không được phép',
      );
    }
  };

  static getFcmToken = async () => {
    // lấy tokent từ Storage
    await AsyncStorage.removeItem('fcmTokenPatient');
    const fcmoken = await AsyncStorage.getItem('fcmTokenPatient');

    if (!fcmoken) {
      const token = await messing().getToken();

      if (token) {
        await AsyncStorage.setItem('fcmTokenPatient', token);

        this.updateToken(token);
      }
    }
  };

  // Cập nhật token vào firestore
  static updateToken = async (token: string) => {
    const user = auth().currentUser;
    const patientData = await firestore()
      .collection('patients')
      .doc(user?.uid)
      .get();

    if (patientData.exists) {
      const data: any = patientData.data();

      // nếu data không có token thì sẽ cập nhật
      if (!data.tokens || !data.tokens.includes(token)) {
        await firestore().collection('patients').doc(user?.uid).update({
          //tokens: firestore.FieldValue.arrayUnion(token), // thêm token vào mảng tokens
          tokens: token,
        });
      }
    }
  };

  // Gửi thông báo từ patient cho doctor
  static sendNotificationPatientToDoctor = async ({
    senderId,
    name,
    receiverId,
    title,
    body,
    appointmentId,
  }: {
    senderId: string;
    name: string;
    receiverId: string;
    title: string;
    body: string;
    appointmentId: string;
    }) => {
    
    try {
      const response = await fetch(
        `http://${localhost}:3000/send-notification-patient-to-doctor`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId,
            name,
            receiverId,
            appointmentId,
            title, // Tiêu đề thông báo
            body, // Nội dung thông báo
          }),
        },
      );
      // Log response status và URL
      console.log(
        'Request URL:',
        `http://${localhost}:3000/send-notification-patient-to-doctor`,
      );
      console.log('Response status:', response.status);

      if (!response.ok) {
        // Log lỗi HTTP từ server (nếu response không thành công)
        const errorResponse = await response.text();
        console.error(
          `Lỗi từ server: ${response.status} - ${response.statusText}`,
        );
        console.error('Chi tiết lỗi từ server:', errorResponse);
        return;
      }

      const result = await response.json();
      console.log('Thông báo đã gửi:', result);
    } catch (error: any) {
      // Log chi tiết lỗi từ fetch
      console.error('Error sending notification:', {
        message: error.message,
        stack: error.stack,
        // Nếu là network error, log thêm thông tin
        networkError: error.cause,
      });
    }
  };
}
