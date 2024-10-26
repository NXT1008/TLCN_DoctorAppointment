import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Row, Section } from '../../components';
import { ArrowLeft2 } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); 

const AddNewCard = () => {
    const navigation = useNavigation()
    const [cardNumber, setCardNumber] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [cardHolderName, setCardHolderName] = useState<string>('');

    const handleAddCard = () => {
        console.log('Card added', {
            cardNumber,
            expiryDate,
            cvv,
            cardHolderName
        });
    };

    return (
        <View style={styles.container}>
            <Section styles={styles.header}>
                <Row justifyContent='space-around'>
                    <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Add New Card</Text>
                </Row>
            </Section>
            <TextInput
                style={styles.input}
                placeholder="0000 0000 0000 0000"
                keyboardType="numeric"
                maxLength={16}
                value={cardNumber}
                onChangeText={setCardNumber}
            />
            <View style={styles.row}>
                <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    maxLength={5}
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                />
                <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="CSV/CVV"
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry={true}
                    value={cvv}
                    onChangeText={setCvv}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter Card Holder Name"
                value={cardHolderName}
                onChangeText={setCardHolderName}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddCard} disabled={!cardNumber || !expiryDate || !cvv || !cardHolderName}>
                <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
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
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        width: '100%',  
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    halfInput: {
        width: (width * 0.40), 
    },
    button: {
        backgroundColor: '#0B8FAC',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
        width: '100%', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddNewCard;
