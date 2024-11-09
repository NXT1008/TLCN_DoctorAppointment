import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from 'react-native';
import {Card, ContainerComponent, Section} from '../../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBuilding} from '@fortawesome/free-solid-svg-icons';
import Container from '../../../../components/ContainerComponent';
import {fontFamilies} from '../../../../constants/fontFamilies';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type PaymentMethod = 'Bank Transfer' | null;

interface props {
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  isDisabled: boolean;
}

const BankTransferComponent = ({onSelectPaymentMethod, isDisabled}: props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  const handleToggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!isDisabled) {
      onSelectPaymentMethod('Bank Transfer');
    }
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Chọn phương thức thanh toán khi mở rộng
      onSelectPaymentMethod('Bank Transfer');
    } else {
      // Nếu bỏ chọn, gửi null về parent component
      onSelectPaymentMethod(null);
    }
  };

  const handleTransfer = () => {
    if (accountNumber && bankName && accountHolder && transferAmount) {
      Alert.alert(
        'Transfer Successful',
        `Amount ${transferAmount} has been transferred.`,
      );
    } else {
      Alert.alert('Error', 'Please fill all fields.');
    }
  };

  return (
    <ContainerComponent
      style={{
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: '#333',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 5,
        borderRadius: 20,
        padding: 10,
      }}>
      <TouchableOpacity
        onPress={handleToggleDropdown}
        style={styles.dropdownHeader}>
        <View style={styles.iconAndText}>
          <FontAwesomeIcon icon={faBuilding} size={20} style={styles.icon} />
          <Text style={styles.title}>Bank Transfer</Text>
        </View>
        <Text style={styles.toggleText}>{isExpanded ? '●' : '○'}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <Section styles={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Bank Name"
            value={bankName}
            onChangeText={setBankName}
            placeholderTextColor={'gray'}
          />

          <TextInput
            style={styles.input}
            placeholder="Account Number"
            keyboardType="numeric"
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholderTextColor={'gray'}
          />

          <TextInput
            style={styles.input}
            placeholder="Account Holder Name"
            value={accountHolder}
            onChangeText={setAccountHolder}
            placeholderTextColor={'gray'}
          />

          <TextInput
            style={styles.input}
            placeholder="Transfer Amount"
            keyboardType="numeric"
            value={transferAmount}
            onChangeText={setTransferAmount}
            placeholderTextColor={'gray'}
          />
        </Section>
      )}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {},
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    height: screenHeight * 0.08,
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamilies.semiBold,
    textAlign: 'left',
    padding: 10,
    color: '#21a691',
  },
  toggleText: {
    fontSize: 24,
    color: '#21a691',
  },
  formContainer: {
    flex: 1, // Make the form container take up available space
    marginTop: 20,
  },
  input: {
    flex: 1, // Make inputs take up available space
    height: 50,
    borderColor: '#ccc',
    color: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: fontFamilies.regular,
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
    fontSize: 16,
    fontFamily: fontFamilies.semiBold,
  },
});

export default BankTransferComponent;
