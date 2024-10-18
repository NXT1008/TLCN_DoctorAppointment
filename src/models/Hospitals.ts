export interface Hospital {
    id: string;  // ID bệnh viện
    name: string;  // Tên bệnh viện
    address: string;
    contact: string;  // Thông tin liên lạc (email hoặc số điện thoại)
    doctors: string[];  // Mảng các ID bác sĩ làm việc tại bệnh viện này
  }
  

  const newHospital: Hospital = {
    id: "hospital_002",
    name: "New General Hospital",
    address: "456 Health St",
    contact: "+987654321",
    doctors: []
  };
  
  // Thêm dữ liệu vào Firestore hoặc Realtime Database
  