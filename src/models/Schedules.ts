export interface TimeSlot {
    startTime: string;  // Giờ bắt đầu
    endTime: string;  // Giờ kết thúc
  }
  
  export interface AvailableDate {
    date: string;  // Ngày mà bác sĩ có sẵn
    timeSlots: TimeSlot[];  // Mảng các khung giờ có sẵn trong ngày
  }
  
  export interface Schedule {
    id: string;  // ID lịch làm việc
    doctorID: string;  // Tham chiếu đến ID của bác sĩ
    availableDates: AvailableDate[];  // Mảng các ngày và khung giờ bác sĩ có sẵn
  }
  