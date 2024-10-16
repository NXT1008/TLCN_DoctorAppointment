import firestore from '@react-native-firebase/firestore';
import {
  appointments,
  cancellations,
  doctors,
  hospitals,
  patients,
  payments,
  reviews,
  schedules,
  specializations,
} from './SampleData'; // Import file sampledata.ts

async function uploadDataToFirestore() {
  try {
    // Upload Specializations
    for (const specialization of specializations) {
      await firestore()
        .collection('specializations')
        .doc(specialization.specializationId.toString())
        .set(specialization);
    }

    // Upload Hospitals
    for (const hospital of hospitals) {
      await firestore()
        .collection('hospitals')
        .doc(hospital.hospitalId.toString())
        .set(hospital);
    }

    // Upload Doctors
    for (const doctor of doctors) {
      await firestore()
        .collection('doctors')
        .doc(doctor.doctorId.toString())
        .set(doctor);
    }

    // Upload Schedules
    for (const schedule of schedules) {
      await firestore()
        .collection('schedules')
        .doc(schedule.scheduleId.toString())
        .set(schedule);
    }

    // Upload Patients
    for (const patient of patients) {
      await firestore()
        .collection('patients')
        .doc(patient.patientId.toString())
        .set(patient);
    }

    // Upload Appointments
    for (const appointment of appointments) {
      await firestore()
        .collection('appointments')
        .doc(appointment.appointmentId.toString())
        .set(appointment);
    }

    // Upload Reviews
    for (const review of reviews) {
      await firestore()
        .collection('reviews')
        .doc(review.reviewId.toString())
        .set(review);
    }

    // Upload Payments
    for (const payment of payments) {
      await firestore()
        .collection('payments')
        .doc(payment.paymentId.toString())
        .set(payment);
    }

    // Upload Cancellations
    for (const cancellation of cancellations) {
      await firestore()
        .collection('cancellations')
        .doc(cancellation.cancellationId.toString())
        .set(cancellation);
    }

    console.log('Dữ liệu đã được tải lên Firebase thành công!');
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu lên Firebase: ', error);
  }
}

export default uploadDataToFirestore;
