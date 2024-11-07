import { Timestamp } from "@react-native-firebase/firestore";

export interface Schedule {
  scheduleId: string;
  availableDate: Date | Timestamp; // Chỉnh sửa ở đây
  startTime: Date;
  endTime: Date;
  doctorId: string;
  isBook: boolean;
}
