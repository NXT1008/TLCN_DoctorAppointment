import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Card, ContainerComponent } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import Container from '../../../components/ContainerComponent';

type PaymentMethod = 'Bank Transfer' | null;

interface props{
    onSelectPaymentMethod: (method: PaymentMethod) => void;
}

const BankTransferComponent = ({onSelectPaymentMethod} :props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountHolder, setAccountHolder] = useState('');
    const [transferAmount, setTransferAmount] = useState('');

    const handleToggleDropdown = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            // Chọn phương thức thanh toán khi mở rộng
            onSelectPaymentMethod('Bank Transfer');
        }else {
            // Nếu bỏ chọn, gửi null về parent component
            onSelectPaymentMethod(null);
        }
    };

    const handleTransfer = () => {
        if (accountNumber && bankName && accountHolder && transferAmount) {
            Alert.alert('Transfer Successful', `Amount ${transferAmount} has been transferred.`);
        } else {
            Alert.alert('Error', 'Please fill all fields.');
        }
    };

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={handleToggleDropdown} style={styles.dropdownHeader}>
                <View style={styles.iconAndText}>
                    <FontAwesomeIcon icon={faBuilding} size={20} style={styles.icon} />
                    <Text style={styles.title}>Bank Transfer</Text>
                </View>
                <Text style={styles.toggleText}>{isExpanded ? '●' : '○'}</Text>
            </TouchableOpacity>

            {isExpanded && (
                <Container style={styles.formContainer} isScroll>
                    <TextInput
                        style={styles.input}
                        placeholder="Bank Name"
                        value={bankName}
                        onChangeText={setBankName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Account Number"
                        keyboardType="numeric"
                        value={accountNumber}
                        onChangeText={setAccountNumber}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Account Holder Name"
                        value={accountHolder}
                        onChangeText={setAccountHolder}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Transfer Amount"
                        keyboardType="numeric"
                        value={transferAmount}
                        onChangeText={setTransferAmount}
                    />
                </Container>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        shadowColor: '#333',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 5,
        padding: 5,
        borderRadius: 20,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 61
    },
    iconAndText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
        marginLeft: 5
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        textAlign: 'left',
        padding: 10,
        color: '#21a691',
    },
    toggleText: {
        fontSize: 24,
        color: '#21a691',
    },
    formContainer: {
        marginTop: 10,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#21a691',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BankTransferComponent;
