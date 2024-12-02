import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  ContainerComponent,
  Row
} from '../../../../components';
import { fontFamilies } from '../../../../constants/fontFamilies';
import { PaymentMethod } from '../../../../models/Payment';

type PaymentMethods = 'Credit Card' | null;

interface Props {
  onPressAddCard: () => void;
  data: PaymentMethod[];
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

const CreditCardComponent = (props: Props) => {
  const {onPressAddCard, data} = props;
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );
  const getCardBackground = (type: string) => {
    switch (type) {
      case 'Visa':
        return require('../../../../assets/images/visaCard_background.png');
      case 'MasterCard':
        return require('../../../../assets/images/masterCard_background.png');
      case 'American Express':
        return require('../../../../assets/images/aeCard_background.png');
      default:
        return require('../../../../assets/images/defaultCard_background.png');
    }
  };

  const maskCardNumber = (cardNumber: string) => {
    return '**** **** **** ' + cardNumber.slice(-4);
  };

  return (
    <ContainerComponent style={styles.container}>
      <Row justifyContent="space-between" styles={{marginTop: -20}}>
        <Row
          styles={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 10,
          }}>
          <FontAwesomeIcon icon={faCreditCard} size={20} style={{}} />
          <Text style={styles.title}>Credit Cards</Text>
        </Row>
        <TouchableOpacity onPress={onPressAddCard}>
          <Image
            source={require('../../../../assets/images/add.png')}
            style={{}}
          />
        </TouchableOpacity>
      </Row>
      <ScrollView
        style={{
          width: '100%',
          marginBottom: 20,
          borderRadius: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {data.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cardWrapper,
              selectedCardIndex === index && styles.selectedCard,
            ]}>
            <Image
              source={getCardBackground(card.type)}
              style={styles.cardBackground}
            />
            <Text style={styles.cardType}>{card.type}</Text>
            <Text style={styles.cardNumber}>
              {maskCardNumber(card.cardNumber)}
            </Text>
            <Text style={styles.cardHolder}>{card.cardHolder}</Text>
            <Text style={styles.cardExpiry}>
              Exp: {card.expiryDate.slice(0, 2)}/{card.expiryDate.slice(2, 4)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    height: screenHeight * 0.315, // Giới hạn chiều cao
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
    padding: 10,
    color: '#21a691',
    justifyContent: 'space-around',
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    overflow: 'hidden',
    width: screenWidth * 0.83, // Tăng từ 0.75 lên 0.85
    height: screenHeight * 0.2, // Tăng từ 0.175 lên 0.25
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
    fontFamily: 'Poppins-Regular',
  },
  cardNumber: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  cardHolder: {
    position: 'absolute',
    bottom: '15%',
    left: '10%',
    color: '#fff',
    fontSize: 14,
    fontFamily: fontFamilies.semiBold,
  },
  cardExpiry: {
    position: 'absolute',
    bottom: '15%',
    right: '10%',
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default CreditCardComponent;
