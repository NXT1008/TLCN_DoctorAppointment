import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Text } from 'react-native';
import InputBar from './components/InputBar';
import MessageBubble from './components/MessageBuble';
import { ArrowLeft2 } from 'iconsax-react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';


const MainChatScreen = () => {
    const navigation = useNavigation()
    const [messages, setMessages] = useState([
        { id: '1', message: 'Rorem ipsum dolor sit  adipiscing elit.', isSent: false },
        { id: '2', message: 'Rorem ipsum dolor sit  adipiscing elit.', isSent: true },
        { id: '3', message: 'Rorem ipsum dolor sit  adipiscing elit.', isSent: false },
        { id: '4', message: 'Rorem ipsum dolor sit  adipiscing elit.', isSent: true },
        { id: '5', message: 'Rorem adipiscing elit.', isSent: true },
        { id: '6', message: 'Rorem ipsum dolor sit  adipiscing elit.', isSent: false },
        { id: '7', message: '2 3 4 5 6 7 8 9 .', isSent: true },
    ]);

    const addMessage = (newMessage: any) => {
        const messageId = (messages.length + 1).toString();
        setMessages([...messages, { id: messageId, message: newMessage, isSent: true }]);
       
    };
    const renderItem = ({ item }: any) => (
        <MessageBubble message={item.message} isSent={item.isSent} />
    );
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft2 color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Doctor Name</Text>
                    <View style={styles.iconsContainer}>
                        <FontAwesomeIcon icon={faPhone} size={20} color="#000" style={styles.icon} />
                        <FontAwesomeIcon icon={faVideo} size={20} color="#000" />
                    </View>
                </View>



                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.messageList}
                />

                <InputBar onSend={addMessage} />
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
        fontWeight: 'bold',
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
