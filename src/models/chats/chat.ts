export interface Message {
  messageId: string; // ID duy nhất của tin nhắn (có thể là Firestore-generated ID)
  senderId: string; // ID của người gửi (bác sĩ hoặc bệnh nhân)
  content: string; // Nội dung tin nhắn
  timestamp: Date; // Thời gian gửi tin nhắn
  status: 'read' | 'unread'; // Trạng thái của tin nhắn (đã đọc hoặc chưa đọc)
}

export interface Conversation {
  conversationId: string; // ID duy nhất của cuộc trò chuyện (Firestore-generated ID)
  doctorId: string; // ID của bác sĩ
  patientId: string; // ID của bệnh nhân
  lastMessage: string; // Nội dung của tin nhắn gần đây nhất
  lastMessageTimestamp: Date; // Thời gian của tin nhắn gần đây nhất
  unReadCount: number; // Số lượng tin nhắn chưa đọc
}

export interface ChatDatabase {
  conversations: Conversation[]; // Danh sách các cuộc trò chuyện
  messages: Record<string, Message[]>; // Mảng tin nhắn cho từng cuộc trò chuyện, theo `conversationId`
}
