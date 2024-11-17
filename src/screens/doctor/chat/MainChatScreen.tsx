import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import InputBar from './components/InputBar';
import MessageBubble from './components/MessageBuble';
import {ArrowLeft2} from 'iconsax-react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPhone, faVideo} from '@fortawesome/free-solid-svg-icons';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Doctor} from '../../../models/Doctor';
import firestore, {doc} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Conversation, Message} from '../../../models/chats/chat';
import {changeLanguage} from 'i18next';
import { Patient } from '../../../models/Patient';

const MainChatScreen = ({navigation, route}: any) => {
  const user = auth().currentUser;

  const {conv_Id} = route.params;

  //const doctor = data as Doctor;
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patient, setPatient] = useState<Patient>();

  const conversationId = conv_Id;

  // Hàm lấy doctor bằng conversationId nếu data chưa có
  const getDoctorByConversationId = async () => {
    if (!conversationId) return;

    try {
      // Get conversation document
      const conversationSnap = await firestore()
        .collection('conversations')
        .doc(conversationId)
        .get();

      if (!conversationSnap.exists) return;

      // Get doctor document using doctorId from conversation
      const {doctorId, patientId} = conversationSnap.data() as Conversation;
      const doctorSnap = await firestore()
        .collection('doctors')
        .doc(doctorId)
        .get();

      if (doctorSnap.exists) {
        setDoctor(doctorSnap.data() as Doctor);
      }

      const patientSnap = await firestore()
        .collection('patients')
        .doc(patientId)
        .get();
      if (patientSnap.exists) {
        setPatient(patientSnap.data() as Patient);
      }
    } catch (error) {
      console.error('Error fetching doctor and patient:', error);
    }
  };

  // useEffect chỉ gọi getDoctorByConversationId khi không có `data`
  useEffect(() => {
    if (conv_Id) {
      getDoctorByConversationId();
    }
  }, [conv_Id]);

  // State lưu trữ cuộc trò chuyện và tin nhắn
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null); // Thêm ref cho FlatList

  useEffect(() => {
    const unSubscribeConversation = firestore()
      .collection('conversations')
      .doc(conversationId)
      .onSnapshot(snap => {
        if (snap.exists) {
          const convData = snap.data();
          setConversation({
            conversationId: snap.id,
            doctorId: convData?.doctorId || '',
            patientId: convData?.patientId || '',
            lastMessage: convData?.lastMessage || '',
            lastMessageTimestamp:
              convData?.lastMessageTimestamp?.toDate() || new Date(),
            unReadCount: convData?.unReadCount || 0,
          });
        }
      });

    const unsubcribeMessage = firestore()
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .orderBy('timestamp', 'desc') // Changed to desc to get latest messages first
      .onSnapshot(snap => {
        const loadedMessage = snap.docs.map(doc => {
          const data = doc.data();
          return {
            messageId: doc.id,
            senderId: data.senderId,
            content: data.content,
            timestamp: data.timestamp?.toDate() || new Date(), // Added null check with default value
            status: data.status,
          } as Message;
        });
        setMessages(loadedMessage.reverse()); // Reverse to display in correct order
      });

    return () => {
      unSubscribeConversation();
      unsubcribeMessage();
    };
  }, [conversationId]);

  // useEffect để tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToIndex({
        index: messages.length - 1, // Cuộn đến tin nhắn cuối cùng
        animated: true,
      });
    }
  }, [messages]); // Theo dõi sự thay đổi của messages

  // useEffect để cuộn xuống khi giao diện được tải
  useEffect(() => {
    flatListRef.current?.scrollToEnd({animated: true}); // Cuộn xuống khi giao diện được tải
  }, []); // Chỉ chạy một lần khi component được mount

  // function send message
  const sendMessage = async (newMessageContent: any) => {
    try {
      // First update conversation
      await firestore()
        .collection('conversations')
        .doc(conversationId)
        .set(
          {
            patientId: patient?.patientId,
            doctorId: doctor?.doctorId || '',
            lastMessage: newMessageContent,
            lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
            updateAt: firestore.FieldValue.serverTimestamp(),
          },
          {merge: true},
        );

      // Then add message
      await firestore()
        .collection('conversations')
        .doc(conversationId)
        .collection('messages')
        .add({
          content: newMessageContent,
          senderId: doctor?.doctorId,
          timestamp: firestore.FieldValue.serverTimestamp(),
          status: 'sent',
        });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // render ui message
  const renderItem = ({item}: any) => (
    <MessageBubble
      message={item.content}
      isSent={item.senderId === doctor?.doctorId}
    />
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{`${patient?.name}`}</Text>
          <View style={styles.iconsContainer}>
            <FontAwesomeIcon
              icon={faPhone}
              size={20}
              color="#000"
              style={styles.icon}
            />
            <FontAwesomeIcon icon={faVideo} size={20} color="#000" />
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.messageId}
          contentContainerStyle={styles.messageList}
          initialScrollIndex={messages.length > 0 ? messages.length - 1 : 0} // Cuộn đến tin nhắn cuối
          onScrollToIndexFailed={info => {
            // Xử lý lỗi nếu chỉ mục cuộn không hợp lệ
            flatListRef.current?.scrollToOffset({
              offset: info.averageItemLength * info.index,
              animated: true,
            });
          }}
        />

        <InputBar onSend={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontFamily: fontFamilies.semiBold,
    color: '#21a691',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 15,
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export default MainChatScreen;
