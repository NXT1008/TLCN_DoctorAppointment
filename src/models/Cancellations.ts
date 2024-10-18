export interface Cancellation {
    id: string;  // ID của việc hủy lịch
    appointmentId: string;  // Tham chiếu đến ID của lịch hẹn bị hủy
    cancellationReason: string;  // Lý do hủy lịch hẹn
    canceledBy: 'doctor' | 'patient';  // Người hủy lịch
    canceledAt: string;  // Thời gian hủy lịch hẹn
  }
  