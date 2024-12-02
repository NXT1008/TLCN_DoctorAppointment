export interface Payment {
  paymentId: string; // ID thanh toán
  patientId?: string;
  doctorId?: string;
  appointmentId: string; // Tham chiếu đến ID của lịch hẹn đã thanh toán
  amount: number; // Số tiền thanh toán
  paymentMethod: string; // Phương thức thanh toán
  status: 'paid' | 'unpaid'; // Trạng thái của thanh toán
  timestamp?: Date; // Thời gian thanh toán
}
export interface PaymentMethod {
  methodId: string; // ID của phương thức thanh toán
  patientId: string; // Tham chiếu đến ID của người dùng
  cardNumber: string; // Số thẻ tín dụng (có thể mã hóa)
  cardHolder: string; // Tên chủ thẻ
  expiryDate: string; // Ngày hết hạn
  cvv: string; // CVV
  type: string; // Loại phương thức thanh toán 
  paymentType: 'Credit Card' | 'Bank Transfer'; // Loại phương thức thanh toán
}
