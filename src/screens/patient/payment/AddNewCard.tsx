import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import {Button, Row, Section, Space, TextComponent} from '../../../components';
import {ArrowLeft2} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontFamilies} from '../../../constants/fontFamilies';
import {PaymentMethod} from '../../../models/Payment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('window');

const AddNewCard = ({navigation, route}: any) => {
  const patientId = auth().currentUser?.uid;
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [cardHolderName, setCardHolderName] = useState<string>('');
  const [cardType, setCardType] = useState<string>('');

  const [modalVisible, setModalVisible] = useState(false);

  const cardOptions = [
    {label: 'Visa', value: 'Visa'},
    {label: 'MasterCard', value: 'MasterCard'},
    {label: 'American Express', value: 'American Express'},
    {label: 'None', value: 'None'},
  ];
  const handleSelectCardType = (value: string) => {
    setCardType(value);
    setModalVisible(false);
  };

  const handleAddCard = async () => {
    const methodId = `card_${new Date().getTime()}`; // Tạo ID duy nhất cho thẻ;
    const newPaymentMethod: PaymentMethod = {
      methodId,
      patientId: patientId ?? '',
      cardNumber,
      expiryDate,
      cvv,
      cardHolder: cardHolderName,
      type: cardType,
      paymentType: 'Credit Card',
    };

    try {
      await firestore()
        .collection('paymentMethods')
        .doc(newPaymentMethod.methodId)
        .set(newPaymentMethod);
      Alert.alert('Payment method saved successfully');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to save payment method');
    }
  };

  return (
    <View style={styles.container}>
      <Section styles={styles.header}>
        <Row justifyContent="space-around">
          <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
          <Text style={styles.headerText}>Add New Card</Text>
        </Row>
      </Section>
      <TextInput
        style={styles.input}
        placeholder="0000 0000 0000 0000"
        placeholderTextColor={'gray'}
        keyboardType="numeric"
        maxLength={16}
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="MM/YY"
          placeholderTextColor={'gray'}
          keyboardType="numeric"
          maxLength={4}
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="CSV/CVV"
          placeholderTextColor={'gray'}
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
        placeholderTextColor={'gray'}
        value={cardHolderName}
        onChangeText={setCardHolderName}
      />
      <View style={{marginTop: 10}}>
        <TextComponent
          text="Card Type"
          font={fontFamilies.semiBold}
          size={16}
          styles={{marginBottom: 10}}
        />
        <TouchableOpacity
          style={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            backgroundColor: '#fff',
          }}
          onPress={() => setModalVisible(true)}>
          <TextComponent
            text={cardType ? cardType : 'Select a card type...'}
            font={fontFamilies.regular}
            size={14}
            color="gray"
          />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                width: '80%',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 20,
                elevation: 5,
                paddingHorizontal: 30,
                paddingTop: 30,
              }}>
              <FlatList
                data={cardOptions}
                keyExtractor={item => item.value}
                renderItem={({item}) => (
                  <Button
                    title={item.label}
                    textStyleProps={{
                      fontSize: 14,
                      fontFamily: fontFamilies.medium,
                    }}
                    styles={{borderRadius: 20, width: '100%'}}
                    onPress={() => handleSelectCardType(item.value)}
                  />
                )}
              />
              <Space height={10} />
              <Button
                title="Close"
                onPress={() => setModalVisible(false)}
                color="#21a691"
                textStyleProps={{
                  fontSize: 14,
                  fontFamily: fontFamilies.semiBold,
                  color: '#fff',
                }}
                styles={{borderRadius: 20}}
              />
            </View>
          </View>
        </Modal>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddCard}
        disabled={!cardNumber || !expiryDate || !cvv || !cardHolderName}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
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
    fontFamily: 'Poppins-Bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width: '100%',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfInput: {
    width: width * 0.4,
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
    fontFamily: fontFamilies.semiBold,
    paddingHorizontal: 10,
  },
  
  optionText: {
    fontSize: 16,
    color: 'black',
  },
});

export default AddNewCard;
