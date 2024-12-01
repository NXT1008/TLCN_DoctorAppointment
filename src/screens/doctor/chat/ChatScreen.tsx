import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faMicrophone} from '@fortawesome/free-solid-svg-icons';
import ActiveUserAvatar from './components/ActiveUser';
import MessageItem from './components/MessageItem';
import {Row, Section} from '../../../components';
import {ArrowLeft2} from 'iconsax-react-native';
import {fontFamilies} from '../../../constants/fontFamilies';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Doctor} from '../../../models/Doctor';

const activeUsers = [
  {
    id: '1',
    name: 'Dr.Upul',
    avatar: require('../../../assets/images/doctor.png'),
  },
  {
    id: '2',
    name: 'Dr.Silva',
    avatar: require('../../../assets/images/doctor.png'),
  },
  {
    id: '3',
    name: 'Dr.Pawani',
    avatar: require('../../../assets/images/doctor.png'),
  },
  {
    id: '4',
    name: 'Dr.Rayan',
    avatar: require('../../../assets/images/doctor.png'),
  },
  {
    id: '5',
    name: 'Dr.Aaaa',
    avatar: require('../../../assets/images/doctor.png'),
  },
];


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ChatScreen = (prop: any) => {
  const {navigation} = prop;
  const user = auth().currentUser;
  const [doctor, setDoctor] = useState<Doctor>();
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    // Tạo listener cho thông tin doctor theo email đã login
    const unsubscribeDoctor = firestore()
      .collection('doctors')
      .where('email', '==', user?.email)
      .onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            const doctorData = snapshot.docs[0].data() as Doctor;
            setDoctor(doctorData);
          }
        },
        error => {
          console.error('Error listening to doctor changes:', error);
        },
      );

    return () => {
      unsubscribeDoctor();
    };
  }, []);


  // lấy toàn bộ conversations
  useEffect(() => {
    if (!doctor?.doctorId) return;

    const unsubscribe = firestore()
      .collection('conversations')
      .where('doctorId', '==', doctor.doctorId)
      .orderBy('lastMessageTimestamp', 'desc')
      .onSnapshot(async snapshot => {
        if (!snapshot) return;

        // Sử dụng Promise.all để đợi toàn bộ dữ liệu bác sĩ được tải
        const conversationsPromises = snapshot.docs.map(async doc => {
          const data = doc.data();
          if (!data) return null;

          const patientId = data.patientId;
          if (!patientId) return null;

          try {
            const patientDoc = await firestore()
              .collection('patients')
              .doc(patientId)
              .get();
            const patientData = patientDoc.data();
            return {
              conversationId: doc.id,
              patientName: patientData?.name || 'Unknown Patient',
              lastMessage: data.lastMessage || '',
              timestamp: data.lastMessageTimestamp?.toDate() || new Date(),
              avatar: patientData?.image || '',
              unReadCount: data.unReadCount || 0,
            };
          } catch (error) {
            console.error('Error loading doctor data:', error);
            return null;
          }
        });

        // Lọc bỏ các hội thoại không hợp lệ
        const loadedConversations = (
          await Promise.all(conversationsPromises)
        ).filter(Boolean);
        setConversations(loadedConversations);
      });

    return () => unsubscribe();
  }, [doctor?.doctorId]);

  const handleConversationPress = async (conversationId: string) => {
    await firestore()
      .collection('conversations')
      .doc(conversationId)
      .update({unReadCount: 0});

    // Cập nhật trạng thái cục bộ để hiển thị trên UI
    setConversations(prevConversations =>
      prevConversations.map(conversation =>
        conversation.conversationId === conversationId
          ? {...conversation, unread: 0}
          : conversation,
      ),
    );

    navigation.navigate('MainChatScreen', {
      conv_Id: conversationId,
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Section styles={styles.header}>
          <Row justifyContent="space-around">
            <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
            <Text style={styles.headerText}>Message</Text>
          </Row>
        </Section>

        <View style={styles.searchContainer}>
          <FontAwesomeIcon
            icon={faSearch}
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search a Patient Name"
            style={styles.searchInput}
            placeholderTextColor="gray"
          />
          <FontAwesomeIcon
            icon={faMicrophone}
            size={20}
            color="#999"
            style={styles.microphoneIcon}
          />
        </View>

        <Text style={styles.messagesText}>Messages</Text>
        <FlatList
          data={conversations}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleConversationPress(item.conversationId)}>
              <MessageItem
                name={item.patientName}
                avatar={item.avatar}
                message={item.lastMessage}
                time={
                  item.timestamp
                    ? new Date(item.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''
                }
                unread={item.unReadCount}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.conversationId}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#21a691',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontFamilies.regular,
    color: 'gray',
  },
  microphoneIcon: {
    marginLeft: 10,
  },
  activeNowText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fontFamilies.semiBold,
    color: '#000',
  },
  activeNowContainer: {
    marginBottom: 0,
    height: screenHeight * 0.15,
  },
  messagesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    top: -10,
  },
});

export default ChatScreen;
