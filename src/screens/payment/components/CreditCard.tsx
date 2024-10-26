import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Alert } from 'react-native';
import { Card, Col, Row, TextComponent } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

type PaymentMethod = 'Credit Card' | null;

interface props{
    onSelectPaymentMethod: (method: PaymentMethod) => void;
    isDisabled : boolean
}


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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

const CreditCardComponent = ({onSelectPaymentMethod, isDisabled} :props) => {
    const navigation = useNavigation()
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
        return '**** **** **** ' + cardNumber.slice(-4); 
    };

    const handleCardSelect = (index: number) => {
        if (!isDisabled) {
            onSelectPaymentMethod('Credit Card');
        }
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
                <TouchableOpacity onPress={() =>{}}>
                    <Image source={require('../../../assets/images/add.png')}
                        style={styles.icon} />
                </TouchableOpacity>
            </Row>

            <View style={styles.scrollViewContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    {cards.map((card, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.cardWrapper,
                                selectedCardIndex === index && styles.selectedCard 
                            ]}
                            onPress={() =>handleCardSelect(index)}
                            disabled={isDisabled}>
                            <Image
                                source={getCardBackground(card.type)}
                                style={styles.cardBackground} />
                            <Text style={styles.cardType}>{card.type}</Text>
                            <Text style={styles.cardNumber}>{maskCardNumber(card.number)}</Text>
                            <Text style={styles.cardHolder}>{card.holder}</Text>
                            <Text style={styles.cardExpiry}>Exp: {card.expiry}</Text>
                        </TouchableOpacity>

                    ))

                    }
                </ScrollView>


            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      shadowColor: '#333',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
      padding: 10,
      borderRadius: 20,
      marginBottom: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    iconAndText: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 10,
      marginLeft: 5,
    },
    scrollViewContainer: {
      height: screenHeight * 0.2,
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Poppins-Medium',
      textAlign: 'left',
      padding: 10,
      color: '#21a691',
      justifyContent: 'space-around',
    },
    scrollContainer: {
      paddingHorizontal: 5,
    },
    cardWrapper: {
      marginHorizontal: 10,
      justifyContent: 'center',
      borderWidth: 0,
      borderColor: 'transparent',
      overflow: 'hidden',
      width: screenWidth * 0.75, 
    },
    selectedCard: {
      borderWidth: 2,
      borderColor: '#0B8FAC',
      borderRadius: 10,
    },
    cardBackground: {
      width: '100%', 
      height: '100%',
      borderRadius: 10,
      resizeMode: 'cover',
    },
    cardType: {
      position: 'absolute',
      top: '20%',
      left: '10%',
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Poppins-Regular',
    },
    cardNumber: {
      position: 'absolute',
      top: '40%',
      left: '10%',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Poppins-Regular',
    },
    cardHolder: {
      position: 'absolute',
      bottom: '15%',
      left: '10%',
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'Poppins-Regular',
    },
    cardExpiry: {
      position: 'absolute',
      bottom: '15%',
      right: '10%',
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'Poppins-Regular',
    },
  });

export default CreditCardComponent;
