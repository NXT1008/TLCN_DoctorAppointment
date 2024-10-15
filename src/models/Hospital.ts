export interface Hospital {
  hospitalId: string; // ID bệnh viện
  name: string; // Tên bệnh viện
  email: string;
  address: string;
}

// fake data
const newHospital: Hospital = {
  hospitalId: 'hospital_002',
  name: 'New General Hospital',
  email: 'hospital1@gmail.com',
  address: '456 Health St',
};

// Thêm dữ liệu vào Firestore hoặc Realtime Database
