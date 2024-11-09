import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import CreditCardComponent from './components/CreditCard';
import BankTransferComponent from './components/TransferBanking';
import {ArrowLeft2} from 'iconsax-react-native';
import {
  Col,
  ContainerComponent,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Payment, PaymentMethod} from '../../../models/Payment';
import {Schedule} from '../../../models/Schedule';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type PaymentMethods = 'Credit Card' | 'Bank Transfer' | null;

const PaymentMethodComponent = ({navigation, route}: any) => {
  const {appointment, schedule} = route.params;
  const scheduleChoosen = schedule as Schedule;

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethods | null>(null);
  const [isCreditCardSelected, setIsCreditCardSelected] =
    useState<boolean>(false);
  const [isBankTransferSelected, setIsBankTransferSelected] =
    useState<boolean>(false);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handlePaymentMethodSelect = (method: PaymentMethods) => {
    setSelectedPaymentMethod(method);
    setIsCreditCardSelected(method === 'Credit Card');
    setIsBankTransferSelected(method === 'Bank Transfer');
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('paymentMethods')
      .where('patientId', '==', auth().currentUser?.uid)
      .onSnapshot(querySnapshot => {
        const items: PaymentMethod[] = [];
        querySnapshot.forEach((doc: any) => {
          items.push({
            methodId: doc.id,
            ...doc.data(),
          });
        });
        setPaymentMethods(items);
      });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const handlePayNow = async () => {
    console.log("Appointment: ", appointment);
    setIsLoading(true); // Bắt đầu quá trình loading

    let appointmentId = ''; // Khai báo biến để lưu appointmentId
    // 1. Tiến hành tạo appointment trong firestore
    try {
      const appointmentRef = await firestore()
        .collection('appointments')
        .add(appointment);
      appointmentId = appointmentRef.id; // Lấy ID appointment mà Firestore đã tự động tạo ra
      await appointmentRef.update({appointmentId}); // Cập nhật lại appointment với appointmentId
      console.log('Appointment added successfully');
    } catch (error) {
      console.log('Error creating appointment: ', error);
      setIsLoading(false);
      return; // Kết thúc hàm nếu có lỗi
    }

    // 2. Tiến hành cập nhật lại schedule trong firestore
    try {
      await firestore()
        .collection('schedules')
        .doc(scheduleChoosen?.scheduleId)
        .update({
          isBook: true,
        });
      console.log('Schedule updated successfully');
    } catch (error) {
      console.log('Error updating schedule: ', error);
      setIsLoading(false);
      return; // Kết thúc hàm nếu có lỗi
    }

    // 3. Tạo paymentId và payment object
    const paymentId = `pay_${new Date().getTime()}`; // Tạo ID thanh toán duy nhất
    const newPayment: Payment = {
      paymentId,
      appointmentId: appointmentId, // Sử dụng appointmentId vừa tạo
      amount: 100, // Thay đổi giá trị này nếu cần
      paymentMethod: selectedPaymentMethod as string,
      status: 'paid',
      timestamp: new Date(),
    };

    // 4. Tiến hành tạo payment trong firestore
    try {
      await firestore().collection('payments').doc(paymentId).set(newPayment);
      Alert.alert('Payment successful', 'Your payment has been processed.');
      navigation.goBack(); // Quay lại màn hình trước đó
    } catch (error) {
      console.error('Error processing payment: ', error);
      Alert.alert('Payment failed', 'Please try again later.');
    } finally {
      setIsLoading(false); // Kết thúc quá trình loading
    }
  };


  return (
    <>
      <ContainerComponent isScroll style={{}}>
        <Section
          styles={{
            flex: 1,
            padding: 20,
            backgroundColor: '#fff',
            width: screenWidth,
          }}>
          <Section styles={{flexDirection: 'row', alignItems: 'center'}}>
            <Row justifyContent="space-around">
              <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#21a691',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: 'Poppins-Bold',
                }}>
                Payment
              </Text>
            </Row>
          </Section>
          <CreditCardComponent
            onSelectPaymentMethod={handlePaymentMethodSelect}
            isDisabled={isBankTransferSelected}
            onPressAddCard={() => navigation.navigate('AddNewCard')}
            data={paymentMethods}
          />
          <BankTransferComponent
            onSelectPaymentMethod={handlePaymentMethodSelect}
            isDisabled={isCreditCardSelected}
          />
        </Section>
        <Space height={screenHeight * 0.03} />
        <Section
          styles={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            padding: 10,
            borderTopWidth: 1,
            borderColor: '#ccc',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            marginTop:
              isBankTransferSelected === false ? screenHeight * 0.24 : 0,
          }}>
          <Col>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'left',
                  fontFamily: 'Poppins-Regular',
                }}>
                Payment Method:{' '}
              </Text>
              <Text style={styles.text}>{selectedPaymentMethod}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'left',
                  fontFamily: 'Poppins-Regular',
                }}>
                Amount:{' '}
              </Text>
              {/* Thay amount vô nha */}
              <Text style={styles.text}>$100</Text>
            </View>
          </Col>

          <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
            {isLoading ? (
              <ActivityIndicator color={'gray'} />
            ) : (
              <Text style={styles.payButtonText}>Pay Now</Text>
            )}
          </TouchableOpacity>
        </Section>
      </ContainerComponent>
    </>
  );
};

export default PaymentMethodComponent;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#0B8FAC',
  },
  payButton: {
    backgroundColor: '#21a691',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 5,
    height: screenHeight * 0.06,
    width: screenWidth * 0.22,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: fontFamilies.semiBold,
  },
});
