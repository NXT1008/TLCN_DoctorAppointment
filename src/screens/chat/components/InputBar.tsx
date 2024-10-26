import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone, faPaperPlane, faCamera } from '@fortawesome/free-solid-svg-icons';

const InputBar = ({ onSend }: any) => {

    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSend(message); 
            setMessage(''); 
        }
    };
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Write here" 
                style={styles.input} 
                value={message} 
                onChangeText={setMessage} 
            />
            <TouchableOpacity>
                <FontAwesomeIcon icon={faCamera} size={20} color="#999" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faMicrophone} size={20} color="#999" style={styles.iconMicrophone} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSend}>
                <FontAwesomeIcon icon={faPaperPlane} size={30} color="#21a691" style={styles.iconSend} />
            </TouchableOpacity>
        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 30,
        padding: 10,
        marginVertical: 10,
    },
    input: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 16,
    },
    icon: {
        marginHorizontal: 5,
    },
    iconMicrophone: {
        padding: 10,
        marginHorizontal: 5,
    },
    iconSend: {
        padding: 10,
        marginLeft: 10,
    },
});

export default InputBar;
