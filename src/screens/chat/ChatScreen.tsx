import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, FlatList, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import ActiveUserAvatar from './components/ActiveUser';
import MessageItem from './components/MessageItem';
import { Row, Section } from '../../components';
import { ArrowLeft2 } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';

const activeUsers = [
    { id: '1', name: 'Dr.Upul', avatar: require('../../assets/images/doctor.png') },
    { id: '2', name: 'Dr.Silva', avatar: require('../../assets/images/doctor.png') },
    { id: '3', name: 'Dr.Pawani', avatar: require('../../assets/images/doctor.png') },
    { id: '4', name: 'Dr.Rayan', avatar: require('../../assets/images/doctor.png') },
];

const messages = [
    { id: '1', name: 'Dr.Upul', avatar: require('../../assets/images/doctor.png'), message: 'Hi, how are you?', time: '12.50', unread: 2 },
    { id: '2', name: 'Dr.Silva', avatar: require('../../assets/images/doctor.png'), message: 'Alo mot hai ba bon nam sau', time: '12.50', unread: 3 },
    { id: '3', name: 'Dr.Pawani', avatar: require('../../assets/images/doctor.png'), message: 'Worem consectetur...', time: '12.50', unread: 0 },
    { id: '4', name: 'Dr.Rayan', avatar: require('../../assets/images/doctor.png'), message: 'Worem consectetur...', time: '12.50', unread: 0 },
];
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const ChatScreen = (prop: any) => {
    const {navigation} = prop 

    return (
        <KeyboardAvoidingView
            style={styles.container}>
            <View >
                <Section styles={styles.header}>
                    <Row justifyContent='space-around'>
                        <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
                        <Text style={styles.headerText}>Message</Text>
                    </Row>
                </Section>

                <View style={styles.searchContainer}>
                    <FontAwesomeIcon icon={faSearch} size={20} color="#999" style={styles.searchIcon} />
                    <TextInput placeholder="Search a Doctor" style={styles.searchInput} />
                    <FontAwesomeIcon icon={faMicrophone} size={20} color="#999" style={styles.microphoneIcon} />
                </View>

                <Text style={styles.activeNowText}>Active Now</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activeNowContainer}>
                    {activeUsers.map(user => (
                        <ActiveUserAvatar key={user.id} name={user.name} avatar={user.avatar} />
                    ))}
                </ScrollView>


                <Text style={styles.messagesText}>Messages</Text>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={()=> prop.navigation.navigate('MainChatScreen')}>
                            <MessageItem
                                name={item.name}
                                avatar={item.avatar}
                                message={item.message}
                                time={item.time}
                                unread={item.unread}
                            />
                        </TouchableOpacity>

                    )}
                    keyExtractor={(item) => item.id}
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
        fontFamily: 'Poppins-Bold'
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
        fontSize: 16,
    },
    microphoneIcon: {
        marginLeft: 10,
    },
    activeNowText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    activeNowContainer: {
        marginBottom: 0,
        height: screenHeight * 0.15
    },
    messagesText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        top: -10
    },
});

export default ChatScreen;
