import { Timestamp } from "@react-native-firebase/firestore";

export interface Schedule {
  scheduleId: string;
  availableDate: Date | Timestamp; // Chỉnh sửa ở đây
  startTime: Date | Timestamp;
  endTime: Date | Timestamp;
  doctorId: string;
  isBook: boolean;
}
