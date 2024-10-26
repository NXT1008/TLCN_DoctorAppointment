import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface MessageItemProps {
  name: string;
  avatar: any;
  message: string;
  time: string;
  unread: number;
}

const MessageItem  = (message: MessageItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/doctor.png')} style={styles.avatar} />
      <View style={styles.messageDetails}>
        <Text style={styles.name}>{message.name}</Text>
        <Text style={styles.message}>{message.message}</Text>
      </View>
      <View style={styles.messageMeta}>
        <Text style={styles.time}>{message.time}</Text>
        {message.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{message.unread}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f0faff',
    borderRadius: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageDetails: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#777',
  },
  messageMeta: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  unreadBadge: {
    backgroundColor: '#21a691',
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 5,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default MessageItem;
