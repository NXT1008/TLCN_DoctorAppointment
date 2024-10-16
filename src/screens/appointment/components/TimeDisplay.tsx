import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimeDisplayProps {
    startTime: Date;
    endTime: Date;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ startTime, endTime }) => {

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timeText}>{formatTime(startTime)} - {formatTime(endTime)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 18,
        width: 130,
        borderRadius: 13,
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timeText: {
        color: '#27403e',
        width: 102,
        fontSize: 12, 
        fontWeight: '600',
        letterSpacing: 0,
    },
});

export default TimeDisplay
