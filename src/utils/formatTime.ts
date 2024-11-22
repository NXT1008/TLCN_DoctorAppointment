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

  // format date to dd/mm/yyyy để hiển thị lên lịch
  static getFormattedDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // format date to dd/mm/yyyy để hiển thị lên lịch
  static getShortFormattedDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  static getStartOfWeek = (date: Date): Date => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek;
  };

  static getEndOfWeek = (date: Date): Date => {
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
    return endOfWeek;
  };

  static convertTo12HourFormat = (time: Date) => {
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12; // Convert hour to 12-hour format
    const hourWithPrefix = hour12 < 10 ? '0' + hour12 : hour12; // Add prefix 0 if hour < 10
    const minute = minutes < 10 ? '0' + minutes : minutes;
    return `${hourWithPrefix}:${minute} ${ampm}`;
  };
}