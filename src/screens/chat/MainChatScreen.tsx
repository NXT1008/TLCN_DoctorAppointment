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
import {fontFamilies} from '../../constants/fontFamilies';
import {Doctor} from '../../models/Doctor';
import firestore, {doc} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Conversation, Message} from '../../models/chats/chat';
import { changeLanguage } from 'i18next';

const MainChatScreen = ({navigation, route}: any) => {
  const patientId = auth().currentUser?.uid;

  const { data, conv_Id } = route.params;
  
  //const doctor = data as Doctor;
  const [doctor, setDoctor] = useState<Doctor | null>(data || null);

  const conversationId = conv_Id || (doctor ? `conv_${patientId}_${doctor.doctorId}` : null);

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
      const {doctorId} = conversationSnap.data() as Conversation;
      const doctorSnap = await firestore()
        .collection('doctors')
        .doc(doctorId)
        .get();

      if (doctorSnap.exists) {
        setDoctor(doctorSnap.data() as Doctor);
      }
    } catch (error) {
      console.error('Error fetching doctor:', error);
    }
  };

  // useEffect chỉ gọi getDoctorByConversationId khi không có `data`
  useEffect(() => {
    if (!data && conv_Id) {
      getDoctorByConversationId();
    }
  }, [conv_Id, data]);

  // State lưu trữ cuộc trò chuyện và tin nhắn
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

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

  const sendMessage = async (newMessageContent: any) => {
    try {
      // First update conversation
      await firestore().collection('conversations').doc(conversationId).set(
        {
          patientId: patientId,
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
          senderId: patientId,
          timestamp: firestore.FieldValue.serverTimestamp(),
          status: 'sent',
        });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderItem = ({item}: any) => (
    <MessageBubble
      message={item.content}
      isSent={item.senderId === patientId}
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
          <Text style={styles.headerText}>{`${doctor?.name}`}</Text>
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
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.messageId}
          contentContainerStyle={styles.messageList}
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
