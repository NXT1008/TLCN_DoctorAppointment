import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';

interface MessageItemProps {
  name: string;
  avatar: any;
  message: string;
  time: string;
  unread: number;
}

const MessageItem = (props: MessageItemProps) => {
  const {name, avatar, message, time, unread} = props
  return (
    <View style={styles.container}>
      <Image
        source={
          avatar ? {uri: avatar} : require('../../../../assets/images/doctor.png')
        }
        style={styles.avatar}
      />
      <View style={styles.messageDetails}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.messageMeta}>
        <Text style={styles.time}>{time}</Text>
        {unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{unread}</Text>
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
    fontSize: 14,
    color: '#0d9e81',
    fontFamily: fontFamilies.medium,
  },
  message: {
    fontSize: 12,
    color: '#777',
    fontFamily: fontFamilies.regular,
  },
  messageMeta: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 10,
    color: '#999',
    fontFamily: fontFamilies.regular,
  },
  unreadBadge: {
    backgroundColor: '#21a691',
    borderRadius: 100,
    height: 20,
    width: 20,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: fontFamilies.regular,
  },
});

export default MessageItem;
