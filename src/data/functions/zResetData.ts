import firestore from '@react-native-firebase/firestore';

async function deleteAllData() {
  try {
    // Xóa dữ liệu từ collection Specializations
    const specializationsSnapshot = await firestore()
      .collection('specializations')
      .get();
    for (const doc of specializationsSnapshot.docs) {
      await firestore().collection('specializations').doc(doc.id).delete();
    }

    // Xóa dữ liệu từ collection Hospitals
    const hospitalsSnapshot = await firestore().collection('hospitals').get();
    for (const doc of hospitalsSnapshot.docs) {
      await firestore().collection('hospitals').doc(doc.id).delete();
    }

    // Xóa dữ liệu từ collection Doctors
    const doctorsSnapshot = await firestore().collection('doctors').get();
    for (const doc of doctorsSnapshot.docs) {
      await firestore().collection('doctors').doc(doc.id).delete();
    }

    // Xóa dữ liệu từ collection Schedules
    const schedulesSnapshot = await firestore().collection('schedules').get();
    for (const doc of schedulesSnapshot.docs) {
      await firestore().collection('schedules').doc(doc.id).delete();
    }

    // Xóa dữ liệu từ collection Patients
    const patientsSnapshot = await firestore().collection('patients').get();
    for (const doc of patientsSnapshot.docs) {
      await firestore().collection('patients').doc(doc.id).delete();
    }

    // Xóa dữ liệu từ collection Appointments
    const appointmentsSnapshot = await firestore()
      .collection('appointments')
      .get();
    for (const doc of appointmentsSnapshot.docs) {
      await firestore().collection('appointments').doc(doc.id).delete();
    }

    // Xóa dữ liệu từ collection Reviews
    const reviewsSnapshot = await firestore().collection('reviews').get();
    for (const doc of reviewsSnapshot.docs) {
      await firestore().collection('reviews').doc(doc.id).delete();
    }

    // Xóa dữ liệu từ collection Payments
    const paymentsSnapshot = await firestore().collection('payments').get();
    for (const doc of paymentsSnapshot.docs) {
      await firestore().collection('payments').doc(doc.id).delete();
    }

    // Xóa dữ liệu từ collection Cancellations
    const cancellationsSnapshot = await firestore()
      .collection('cancellations')
      .get();
    for (const doc of cancellationsSnapshot.docs) {
      await firestore().collection('cancellations').doc(doc.id).delete();
    }

    console.log('Dữ liệu đã được xóa khỏi Firebase thành công!');
  } catch (error) {
    console.error('Lỗi khi xóa dữ liệu khỏi Firebase: ', error);
  }
}

export default deleteAllData;
