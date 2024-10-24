import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Alert } from 'react-native';
import { Card, Col, Row, TextComponent } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

type PaymentMethod = 'Credit Card' | null;

interface props{
    onSelectPaymentMethod: (method: PaymentMethod) => void;
}

const screenWidth = Dimensions.get('window').width;
const cards = [
    {
        number: '1234 1234 1234 1234',
        holder: 'John Doe',
        expiry: '12/24',
        type: 'Visa',
    },
    {
        number: '0000 1234 1234 5678',
        holder: 'Jane Smith',
        expiry: '08/23',
        type: 'MasterCard',
    },
    {
        number: '1111 1234 1234 9876',
        holder: 'Alice Johnson',
        expiry: '05/22',
        type: 'American Express',
    },
];

const CreditCardComponent = ({onSelectPaymentMethod} :props) => {
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

    const getCardBackground = (type: string) => {
        switch (type) {
            case 'Visa':
                return require('../../../assets/images/visaCard_background.png');
            case 'MasterCard':
                return require('../../../assets/images/masterCard_background.png');
            case 'American Express':
                return require('../../../assets/images/aeCard_background.png');
            default:
                return require('../../../assets/images/defaultCard_background.png');
        }
    };

    const maskCardNumber = (cardNumber: string) => {
        return '**** **** **** ' + cardNumber.slice(-4);  // Giữ 4 số cuối
    };

    const handleCardSelect = (index: number) => {
        // Kiểm tra xem thẻ đang được chọn hay không
        setSelectedCardIndex(prevIndex => {
            const newIndex = prevIndex === index ? null : index;
            // Nếu có thẻ được chọn thì cập nhật phương thức thanh toán
            if (newIndex !== null) {
                onSelectPaymentMethod(`Credit Card`);
            } else {
                // Nếu bỏ chọn, gửi null về parent component
                onSelectPaymentMethod(null);
            }
            return newIndex;
        });
    };

    return (
        <View style={styles.container}>
            <Row justifyContent="space-between">
                <View style={styles.iconAndText}>
                    <FontAwesomeIcon icon={faCreditCard} size={20} style={styles.icon} />
                    <Text style={styles.title}>Credit Cards</Text>
                </View>
                <TouchableOpacity onPress={() => Alert.alert('Add new card')}>
                    <Image source={require('../../../assets/images/add.png')}
                        style={styles.icon} />
                </TouchableOpacity>
            </Row>

            <View style={styles.scrollViewContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    {cards.map((card, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.cardWrapper}
                            onPress={() =>handleCardSelect(index)}>
                            <Image
                                source={getCardBackground(card.type)}
                                style={styles.card_background} />
                            <Text style={styles.cardType}>{card.type}</Text>
                            <Text style={styles.cardNumber}>{maskCardNumber(card.number)}</Text>
                            <Text style={styles.cardHolder}>{card.holder}</Text>
                            <Text style={styles.cardExpiry}>Exp: {card.expiry}</Text>
                        </TouchableOpacity>

                    ))

                    }
                </ScrollView>


            </View>
            {selectedCardIndex !== null && (
                <Row>
                    <TextComponent 
                    text='You are choosing'
                    font='Poppins-Regular'
                    styles={styles.selectedCardText}/>
                        
                    <TextComponent
                        text={maskCardNumber(cards[selectedCardIndex].number)}
                        color='#0B8FAC'
                        font='Poppins-Medium'/>
                </Row>

            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        shadowColor: '#333',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 5,
        padding: 5,
        borderRadius: 20,
        marginBottom: 20
    },
    iconAndText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
        marginLeft: 5
    },
    scrollViewContainer: {
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        textAlign: 'left',
        padding: 10,
        color: '#21a691',

        justifyContent: 'space-around'
    },
    scrollContainer: {
        paddingHorizontal: 5,
    },
    cardWrapper: {
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    card_background: {
        width: screenWidth * 0.75,
        height: 150,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    cardType: {
        position: 'absolute',
        top: 20,
        left: 30,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
    },
    cardNumber: {
        position: 'absolute',
        top: 60,
        left: 55,
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
    },
    cardHolder: {
        position: 'absolute',
        top: 110,
        left: 30,
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
    },
    cardExpiry: {
        position: 'absolute',
        top: 110,
        right: 30,
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
    },
    selectedCardText: {
        textAlign: 'left',
        fontSize: 16,
        color: '#333',
        marginRight: 5
    },
});

export default CreditCardComponent;
