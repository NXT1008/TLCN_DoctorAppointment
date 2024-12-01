import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messing from '@react-native-firebase/messaging';
import {Doctor} from '../models/Doctor';

const user = auth().currentUser;
const localhost = '192.168.1.5';

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
    const fcmoken = await AsyncStorage.getItem('fcmtoken');

    // kiểm tra token đã được lưu trên storage chưa
    // nếu chưa thì sẽ lấy từ messing của firebase
    if (!fcmoken) {
      // lấy fcmtoken
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
    const doctorData = await firestore()
      .collection('doctors')
      .where('email', '==', user?.email)
      .get();

    if (!doctorData.empty) {
      const data: any = doctorData.docs[0].data();

      // nếu data không có token thì sẽ cập nhật
      if (!data.tokens || !data.tokens.includes(token)) {
        console.log('Không có tokens');
        await firestore()
          .collection('doctors')
          .doc(data.doctorId)
          .update({
            tokens: firestore.FieldValue.arrayUnion(token), // thêm token vào mảng tokens
          });
      }
    }
  };

  // Gửi thông báo từ doctor cho patient
  static sendNotificationDoctorToPatient = async ({
    senderId,
    receiverId,
    title,
    body,
    appointmentId,
  }: {
    senderId: string;
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

    // kiểm tra token đã được lưu trên storage chưa
    // nếu chưa thì sẽ lấy từ messing của firebase
    if (!fcmoken) {
      // lấy fcmTokenPatient
      const token = await messing().getToken();

      // Nếu lấy được token thì lưu vào storage
      if (token) {
        await AsyncStorage.setItem('fcmTokenPatient', token);
        // Cập nhật token vào firestore
        this.updateToken(token);
      }
    }
  };

  // Cập nhật token vào firestore
  static updateToken = async (token: string) => {
    const patientData = await firestore()
      .collection('patients')
      .doc(user?.uid)
      .get();

    if (patientData.exists) {
      const data: any = patientData.data();

      // nếu data không có token thì sẽ cập nhật
      if (!data.tokens || !data.tokens.includes(token)) {
        await firestore()
          .collection('patients')
          .doc(user?.uid)
          .update({
            tokens: firestore.FieldValue.arrayUnion(token), // thêm token vào mảng tokens
          });
      }
    }
  };

  // Gửi thông báo từ patient cho doctor
  static sendNotificationPatientToDoctor = async ({
    senderId,
    receiverId,
    title,
    body,
    appointmentId,
  }: {
    senderId: string;
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
