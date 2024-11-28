export interface Notification {
  senderId: string;
  receiverId: string;
  appointmentId: string;
  title: string;
  body: string;
  sendAt: Date;
}
