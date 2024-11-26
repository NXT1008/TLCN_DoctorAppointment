import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messing from '@react-native-firebase/messaging';

const user = auth().currentUser

export class HandleNotification {
  // Kiểm tra user có quyền gửi nhận thông báo không
  static checkNotificationPermission = async () => {
    // lấy permission
    const authStatus = await messing().requestPermission();

    if (
      authStatus === messing.AuthorizationStatus.AUTHORIZED ||
      authStatus === messing.AuthorizationStatus.PROVISIONAL
    ) {
      this.getFcmToken()
    }
  };

  static getFcmToken = async () => {
    // lấy tokent từ Storage
    const fcmoken = await AsyncStorage.getItem('fcmtoken')

    // kiểm tra token đã được lưu trên storage chưa
    // nếu chưa thì sẽ lấy từ messing của firebase
    if (!fcmoken) {
      // lấy fcmtoken
      const token = await messing().getToken()

      // Nếu lấy được token thì lưu vào storage
      if (token) {
        await AsyncStorage.setItem('fcmtoken', token)
        // Cập nhật token vào firestore
        this.updateToken(token)
      }
    }
  };

  // Cập nhật token vào firestore
  static updateToken = async (token: string) => {

    const doctorData = await firestore().collection('doctors').where('email', '==', user?.email).get()
    if (!doctorData.empty) {
      
      const data: any = doctorData.docs[0].data()
      // nếu data không có token thì sẽ cập nhật
      if (!data.tokens || !data.tokens.includes(token)) {

        await messing()

        await firestore().doc(`doctors/${data?.id}`).update({
          tokens: firestore.FieldValue.arrayUnion(token) // thêm token vào mảng tokens
        })
      }
    }
  }
}
