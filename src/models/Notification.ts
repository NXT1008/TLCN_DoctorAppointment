export interface Notification {
  notificationId: string;
  senderId: string;
  name: string;
  receiverId: string;
  appointmentId: string;
  title: string;
  body: string;
  sendAt: Date;
  isReaded: boolean;
}
