export interface Payment {
  paymentId: string; // ID thanh toán
  appointmentId: string; // Tham chiếu đến ID của lịch hẹn đã thanh toán
  amount: number; // Số tiền thanh toán
  paymentMethod: string; // Phương thức thanh toán
  status: 'paid' | 'unpaid'; // Trạng thái của thanh toán
}
