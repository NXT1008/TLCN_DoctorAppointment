import { Timestamp } from "@react-native-firebase/firestore";

export class FormatTime {
  static formatAvailableDate = (availableDate: Date | Timestamp): string => {
    let hour = 0;
    let minute = 0;

    if (availableDate instanceof Timestamp) {
      const date = new Date(availableDate.seconds * 1000);
      hour = date.getHours();
      minute = date.getMinutes();
    } else if (availableDate instanceof Date) {
      hour = availableDate.getHours();
      minute = availableDate.getMinutes();
    }

    // Đảm bảo định dạng giờ và phút
    const formattedHour = hour < 10 ? `0${hour}` : hour.toString();
    const formattedMinute = minute < 10 ? `0${minute}` : minute.toString();
    return `${formattedHour}:${formattedMinute}`; // Trả về chuỗi thời gian
  };

  
}