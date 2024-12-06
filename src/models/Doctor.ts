export interface Doctor {
  doctorId: string; // Mã định danh duy nhất của bác sĩ
  name: string; // Tên đầy đủ của bác sĩ
  gender?: string;  
  email: string; // Địa chỉ email của bác sĩ
  phone: string; // Số điện thoại liên hệ của bác sĩ
  image: string; // URL dẫn đến ảnh đại diện của bác sĩ
  hospitalId: string; // Tham chiếu đến mã ID của bệnh viện nơi bác sĩ làm việc
  specializationId: string; // Tham chiếu đến mã ID của chuyên khoa mà bác sĩ thuộc về
  isLogin?: boolean;
  password?: string
  ratingAverage?: number; // Điểm đánh giá trung bình của bác sĩ
  numberOfReviews?: number; // Số lượng đánh giá của bác sĩ
  fee?: number;
  about?: string
}
 

// fake data
