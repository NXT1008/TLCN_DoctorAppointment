import firestore from '@react-native-firebase/firestore';

// Hàm để thêm field favoriteDoctors vào dữ liệu patient trong Firebase
async function updateBookSchedule() {
  try {
    // Lấy tất cả các document trong collection "patients"
    const patientsSnapshot = await firestore().collection('schedules').get();

    // Cập nhật từng document tuần tự
    for (const doc of patientsSnapshot.docs) {
      await doc.ref.update({
        isBook: false, // Khởi tạo mảng rỗng cho các bác sĩ yêu thích
      });
      console.log(`Field bisBook đã được thêm vào schedule: ${doc.id}`);
    }

    console.log('Field isBooks đã được thêm vào tất cả các schedules.');
  } catch (error) {
    console.error('Lỗi khi thêm field isBook:', error);
  }
}

// Gọi hàm để thêm field
export default updateBookSchedule;
