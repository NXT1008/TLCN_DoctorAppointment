import firestore from '@react-native-firebase/firestore';

// Hàm để thêm field favoriteDoctors vào dữ liệu patient trong Firebase
async function addFavoriteDoctors() {
  try {
    // Lấy tất cả các document trong collection "patients"
    const patientsSnapshot = await firestore().collection('patients').get();

    // Cập nhật từng document tuần tự
    for (const doc of patientsSnapshot.docs) {
      await doc.ref.update({
        favoriteDoctors: [], // Khởi tạo mảng rỗng cho các bác sĩ yêu thích
      });
      console.log(`Field favoriteDoctors đã được thêm vào patient: ${doc.id}`);
    }

    console.log('Field favoriteDoctors đã được thêm vào tất cả các patients.');
  } catch (error) {
    console.error('Lỗi khi thêm field favoriteDoctors:', error);
  }
}

// Gọi hàm để thêm field
export default addFavoriteDoctors;
