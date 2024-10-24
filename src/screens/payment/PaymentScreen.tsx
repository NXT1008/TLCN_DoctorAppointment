import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard, faBuilding, faWallet, faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons';
import CreditCardComponent from './components/CreditCard';
import BankTransferComponent from './components/TransferBanking';
import { ArrowLeft2, Card } from 'iconsax-react-native';
import { Col, ContainerComponent, Row, Section, TextComponent } from '../../components';

type PaymentMethod = 'Credit Card' | 'Bank Transfer' | null;

const PaymentMethodComponent = (prop: any) => {
    const { navigation } = prop
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

    const handlePaymentMethodSelect = (method: PaymentMethod) => {
        setSelectedPaymentMethod(method);
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
                <CreditCardComponent onSelectPaymentMethod={handlePaymentMethodSelect} />

                <BankTransferComponent onSelectPaymentMethod={handlePaymentMethodSelect} />
            </ContainerComponent>

            <View style={styles.footer}>
                <Col>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.footerText}>Payment Medthod: </Text>
                        <Text style={styles.text}>{selectedPaymentMethod}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.footerText}>Amount: </Text>
                        {/* Thay amount vô nha */}
                        <Text style={styles.text}>$100</Text>
                    </View>
                </Col>

                <TouchableOpacity style={styles.payButton}>
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
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular'
    },
    text:{
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#0B8FAC'
    },
    payButton: {
        backgroundColor: '#21a691',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 30,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});