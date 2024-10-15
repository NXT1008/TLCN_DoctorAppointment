export interface Review {
    reviewId: string;  // ID đánh giá
    appointmentId: string;  // Tham chiếu đến ID của lịch hẹn đã hoàn thành
    doctorId: string;  // Tham chiếu đến ID của bác sĩ
    patientId: string;  // Tham chiếu đến ID của bệnh nhân
    rating: number;  // Số sao đánh giá (1-5)
    comment: string;  // Nhận xét chi tiết từ bệnh nhân
  }
  