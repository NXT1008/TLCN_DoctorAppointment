import { height } from '@fortawesome/free-solid-svg-icons/fa0';
import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

interface ActiveUserAvatarProps {
    name: string
    avatar: any;
}
const users = [
    { id: '1', name: 'Dr.Upul', avatar: require('../../../assets/images/doctor.png') },
    { id: '2', name: 'Dr.Silva', avatar: require('../../../assets/images/doctor.png') },
    { id: '3', name: 'Dr.Pawani', avatar: require('../../../assets/images/doctor.png') },
    { id: '4', name: 'Dr.Rayan', avatar: require('../../../assets/images/doctor.png') },
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const ActiveUserAvatar = (avatar: ActiveUserAvatarProps) => {


    const avatarSize = screenWidth * 0.15;
    const onlineDotSize = avatarSize * 0.25;

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {users.map(user => (
                    <TouchableOpacity key={user.id} onPress={() => { }}>
                        <View style={styles.avatarWrapper}>
                            <View style={[styles.avatarContainer, { width: avatarSize, height: avatarSize }]}>
                                <Image source={user.avatar} style={[styles.avatar, { width: avatarSize, height: avatarSize }]} />
                                <View style={[
                                    styles.onlineDot,
                                    {
                                        width: onlineDotSize,
                                        height: onlineDotSize,
                                        borderRadius: onlineDotSize / 2,
                                        right: onlineDotSize / 10,
                                        top: onlineDotSize / 30
                                    }]}
                                />
                            </View>
                            <Text style={styles.avatarName}>{user.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        height: screenHeight*0.2,
    },
    scrollContainer: {
        flexDirection: 'row',
        padding: 0,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        borderRadius: 1000,
    },
    onlineDot: {
        backgroundColor: '#21a691',
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#fff',
    },
    avatarWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    },
    avatarName: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
});

export default ActiveUserAvatar;
