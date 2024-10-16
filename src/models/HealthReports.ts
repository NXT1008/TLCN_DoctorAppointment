export interface HealthReport {
    id: string;  // ID của báo cáo sức khỏe
    patientId: string;  // Tham chiếu đến ID của bệnh nhân
    height: string;  // Chiều cao
    weight: string;  // Cân nặng
    heartRate: string;  // Nhịp tim
    bloodPressure: string;  // Huyết áp
    bloodType: string;  // Nhóm máu
    reportDate: string;  // Ngày báo cáo
  }
  