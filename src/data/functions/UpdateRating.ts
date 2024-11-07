import firestore from '@react-native-firebase/firestore';
import {Review} from '../../models/Review';
import {Doctor} from '../../models/Doctor';
const updateDoctorRating = async () => {
  try {
    // Lấy tất cả các đánh giá từ Firestore
    const reviewSnapshot = await firestore().collection('reviews').get();

    // Tạo mảng bao để lưu tổng rating và số lượng review cho từng bác sĩ
    const doctorRating: Record<string, {totalRating: number; count: number}> =
      {};

    reviewSnapshot.forEach((doc: any) => {
      const review = doc.data() as Review;
      const {doctorId, rating} = review;

      // cộng rating và đếm số lượng reviews
      if (!doctorRating[doctorId]) {
        doctorRating[doctorId] = {totalRating: 0, count: 0};
      }
      doctorRating[doctorId].totalRating += rating;
      doctorRating[doctorId].count++;
    });

    // Cập nhật thông tin bác sĩ với rating trung bình
    const doctorsSnapshot = await firestore().collection('doctors').get();
    doctorsSnapshot.forEach(async (doc: any) => {
      const doctor = doc.data() as Doctor;
      const {doctorId} = doctor;

      if (doctorRating[doctorId]) {
        const {totalRating, count} = doctorRating[doctorId];
        const ratingAverage = totalRating / count;
        await firestore().collection('doctors').doc(doctorId).update({
          ratingAverage: ratingAverage,
          numberOfReviews: count,
        });
      } else {
        await firestore().collection('doctors').doc(doctorId).update({
          ratingAverage: 0,
          numberOfReviews: 0,
        });
      }
    });

    console.log('Ratings updated successfully!');
  } catch (error) {
    console.log(error);
  }
};

export default updateDoctorRating;
