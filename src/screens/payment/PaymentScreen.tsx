import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import CreditCardComponent from './components/CreditCard';
import BankTransferComponent from './components/TransferBanking';
import { ArrowLeft2 } from 'iconsax-react-native';
import { Col, ContainerComponent, Row, Section, TextComponent } from '../../components';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type PaymentMethod = 'Credit Card' | 'Bank Transfer' | null;

const PaymentMethodComponent = (prop: any) => {
    const { navigation } = prop
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
    const [isCreditCardSelected, setIsCreditCardSelected] = useState<boolean>(false);
    const [isBankTransferSelected, setIsBankTransferSelected] = useState<boolean>(false);

    const handlePaymentMethodSelect = (method: PaymentMethod) => {
        setSelectedPaymentMethod(method);
        setIsCreditCardSelected(method === 'Credit Card');
        setIsBankTransferSelected(method === 'Bank Transfer')
    };

    return (
        <View style={styles.container}>
            <Section styles={styles.header}>
                <Row justifyContent='space-around'>
                    <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Payment</Text>
                </Row>
            </Section>
            <ContainerComponent isScroll>
                <CreditCardComponent
                    onSelectPaymentMethod={handlePaymentMethodSelect}
                    isDisabled={isBankTransferSelected}
                />

                <BankTransferComponent
                    onSelectPaymentMethod={handlePaymentMethodSelect}
                    isDisabled={isCreditCardSelected}
                />
            </ContainerComponent>

            <View style={styles.footer}>
                <Col>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.footerText}>Payment Medthod: </Text>
                        <Text style={styles.text}>{selectedPaymentMethod}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.footerText}>Amount: </Text>
                        {/* Thay amount vô nha */}
                        <Text style={styles.text}>$100</Text>
                    </View>
                </Col>

                <TouchableOpacity style={styles.payButton} onPress={() => prop.navigation.navigate('AddNewCard')}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PaymentMethodComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        width: screenWidth
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'space-between'
    },
    footerText: {
        color: '#000',
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular'
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#0B8FAC'
    },
    payButton: {
        backgroundColor: '#21a691',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 50,
        marginRight: 5,
        height: screenHeight * 0.08,
        width: screenWidth * 0.25
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});