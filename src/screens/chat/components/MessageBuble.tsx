import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageBubbleProps {
  message: string;
  isSent: boolean;
}

const MessageBubble = ({ message, isSent }: MessageBubbleProps) => {
  return (
    <View style={[styles.bubble, isSent ? styles.sentBubble : styles.receivedBubble]}>
      <Text style={isSent ? styles.sentText : styles.receivedText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  sentBubble: {
    backgroundColor: '#21a691',
    alignSelf: 'flex-end',
  },
  receivedBubble: {
    backgroundColor: '#f2f2f2',
    alignSelf: 'flex-start',
  },
  sentText: {
    color: '#fff',
  },
  receivedText: {
    color: '#000',
  },
});

export default MessageBubble;
