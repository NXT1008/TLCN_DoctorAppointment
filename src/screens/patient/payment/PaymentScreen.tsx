import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ArrowLeft2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Card,
  Col,
  ContainerComponent,
  Row,
  Section,
  Space,
  TextComponent
} from '../../../components';
import PopUpAnimation from '../../../components/PopUpAmination';
import { fontFamilies } from '../../../constants/fontFamilies';
import { Payment, PaymentMethod } from '../../../models/Payment';
import { Schedule } from '../../../models/Schedule';
import CreditCardComponent from './components/CreditCard';
import BankTransferComponent from './components/TransferBanking';
import Toast from 'toastify-react-native'
import ToastComponent from './components/ToastComponent';
import axios from 'axios';
import { config } from '../../../constants/config';
import queryString from 'query-string';

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
  const [isMomoPayment, setIsMomoPayment] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePaymentMethodSelect = (method: PaymentMethods) => {
    setSelectedPaymentMethod(method);
    setIsCreditCardSelected(method === 'Credit Card');
    setIsBankTransferSelected(method === 'Bank Transfer');
    setIsMomoPayment(false);
  };

  const [showPopup, setShowPopup] = useState(false);

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

  // xử lý điều hướng khi thanh toán thành công
  useEffect(() => {
    const handleDeepLink = (event: {url: string}) => {
      const {url} = event;
      console.log('Deep Link:', url);

      if (url.includes('payment/success')) {
        const params = queryString.parse(url.split('?')[1]); // Phân tích query params
        const resultCode = params.resultCode;

        if (resultCode === '0') {
          navigateToPaymentSuccessScreen();
        } else {
          Alert.alert('Payment Failed', 'Your payment was not successful.');
        }
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    // Xóa lắng nghe khi unmount
    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  const navigateToPaymentSuccessScreen = () => {
    handleShowPopup();
    setTimeout(() => {
      navigation.navigate('HomeScreen', {status: 'success'});
    }, 3000); // Điều hướng sau khi popup đã hiển thị
  };

  const handlePayNow = async () => {

    // if (!selectedPaymentMethod && !isMomoPayment) {
    //   Toast.error('Please choose Payment method!')
    //   return
    // }

    // setIsLoading(true); // Bắt đầu quá trình loading

    // let appointmentId = ''; // Khai báo biến để lưu appointmentId
    // // 1. Tiến hành tạo appointment trong firestore
    // try {
    //   const appointmentRef = await firestore()
    //     .collection('appointments')
    //     .add(appointment);
    //   appointmentId = appointmentRef.id; // Lấy ID appointment mà Firestore đã tự động tạo ra
    //   await appointmentRef.update({appointmentId}); // Cập nhật lại appointment với appointmentId
    //   console.log('Appointment added successfully');
    // } catch (error) {
    //   console.log('Error creating appointment: ', error);
    //   setIsLoading(false);
    //   return; // Kết thúc hàm nếu có lỗi
    // }

    // // 2. Tiến hành cập nhật lại schedule trong firestore
    // try {
    //   await firestore()
    //     .collection('schedules')
    //     .doc(scheduleChoosen?.scheduleId)
    //     .update({
    //       isBook: true,
    //     });
    //   console.log('Schedule updated successfully');
    // } catch (error) {
    //   console.log('Error updating schedule: ', error);
    //   setIsLoading(false);
    //   return; // Kết thúc hàm nếu có lỗi
    // }

    // // 3. Tạo paymentId và payment object
    // const paymentId = `pay_${new Date().getTime()}`; // Tạo ID thanh toán duy nhất
    // const newPayment: Payment = {
    //   paymentId,
    //   appointmentId: appointmentId, // Sử dụng appointmentId vừa tạo
    //   amount: 3000000, // Thay đổi giá trị này nếu cần
    //   paymentMethod: selectedPaymentMethod as string,
    //   status: 'paid',
    //   timestamp: new Date(),
    // };

    // // 4. Tiến hành tạo payment trong firestore
    // try {
    //   await firestore().collection('payments').doc(paymentId).set(newPayment);
    //   // Alert.alert('Payment successful', 'Your payment has been processed.');
    //   // navigation.goBack(); // Quay lại màn hình trước đó
    // } catch (error) {
    //   console.error('Error processing payment: ', error);
    //   Alert.alert('Payment failed', 'Please try again later.');
    // } finally {
    //   setIsLoading(false); // Kết thúc quá trình loading
    // }

    if (isMomoPayment) {
      try {
        const response = await axios.post(
          `http://${config.localhost}:3000/payment`,
          {
            //amount: newPayment.amount,
            amount: 3000000
          },
        );
        

        const {payUrl} = response.data; // MoMo trả về URL thanh toán
        if (payUrl) {
          // Điều hướng tới trình duyệt để thanh toán MoMo
          Alert.alert('Redirecting...', 'You will be redirected to MoMo');

          // Sử dụng Linking để mở URL
          Linking.openURL(payUrl);
        } else {
          Alert.alert('Error', 'Failed to get payment URL');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Payment failed');
      }
    }
  };

  const handleShowPopup = () => {
    setShowPopup(true);

    // Ẩn popup sau 3 giây
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <>
      <ToastComponent/>
      <PopUpAnimation
        visible={showPopup}
        onComplete={() => console.log('Animation Completed')}
        content="Payment Success!"
      />
      <ContainerComponent isScroll style={{marginTop: -16}}>
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
        <Card
          onPress={() => {
            setIsMomoPayment(!isMomoPayment);
          }}
          styles={{
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#333',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: isMomoPayment ? '#fff' : '#a10b44',
            backgroundColor: isMomoPayment ? '#a10b44' : '#fff',
          }}>
          <Image
            source={require('../../../assets/images/logo-momo.png')}
            style={{
              width: 40,
              height: 40,
            }}
          />
          <Space width={20}/>
          <TextComponent
            text="Pay with momo e-wallet"
            font={fontFamilies.semiBold}
            size={14}
            color={isMomoPayment ? '#fff' : '#a10b44'}
          />
        </Card>
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
              isBankTransferSelected === false ? screenHeight * 0.15 : 0,
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
