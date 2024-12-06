import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../../components/ContainerComponent';
import {
  Card,
  Col,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../../../components';
import {ArrowLeft2, Call, Scan} from 'iconsax-react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {Payment, PaymentMethod} from '../../../../models/Payment';
import auth from '@react-native-firebase/auth';
import CreditCardComponent from '../components/CreditCard';
import {FormatTime} from '../../../../utils/formatTime';

const PaymentHistory = ({navigation}: any) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [payment, setPayment] = useState<Payment[]>([]);

  useEffect(() => {
    const unsubscribePaymentMethods = firestore()
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

    const unsubscribePaymentHistory = firestore()
      .collection('payments')
      .where('patientId', '==', auth().currentUser?.uid)
      .onSnapshot(querySnapshot => {
        const items: Payment[] = [];
        querySnapshot.forEach((doc: any) => {
          const data = doc.data();
          const timestamp = (data.timestamp as Timestamp).toDate();
          items.push({
            methodId: doc.id,
            ...doc.data(),
            timestamp: timestamp,
          });
        });
        setPayment(items);
      });

    // Cleanup listener on unmount
    return () => {
      unsubscribePaymentMethods();
      unsubscribePaymentHistory();
    };
  }, []);

  return (
    <Container
      style={{marginTop: -16, flex: 1, backgroundColor: '#fff'}}
      isScroll>
      <Section styles={{paddingTop: 16}}>
        <Row justifyContent="flex-start">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="Payment"
              size={20}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>

      <Section>
        <CreditCardComponent
          onPressAddCard={() => navigation.navigate('AddNewCard')}
          data={paymentMethods}
        />
      </Section>
      <Space height={16} />
      <Section styles={{marginTop: -30, paddingHorizontal: 0}}>
        <TextComponent
          text="HISTORY"
          font={fontFamilies.semiBold}
          size={14}
          color="gray"
          styles={{paddingHorizontal: 16}}
        />
        <Space height={10} />
        <Section styles={{paddingHorizontal: 0}}>
          {payment.map((item, index) => (
            <Card
              key={index}
              onPress={() => {}}
              styles={{flexDirection: 'row', borderRadius: 10}}
              color="#f8f8f8">
              <Call color="#000" />
              <Space width={16} />
              <Col>
                <TextComponent
                  text={`${item.name}`}
                  font={fontFamilies.semiBold}
                  color="#444444"
                />
                <TextComponent
                  text={`${FormatTime.getShortFormattedDate(
                    item.timestamp ? item.timestamp : new Date(),
                  )}, ${FormatTime.convertTo12HourFormat(
                    item.timestamp ? item.timestamp : new Date(),
                  )}`}
                  font={fontFamilies.regular}
                  size={12}
                  color="#8f8f8f"
                />
              </Col>
              <TextComponent
                text={`- ${item.amount / 25000} $`}
                font={fontFamilies.semiBold}
                size={13}
                color="#c71c1c"
              />
            </Card>
          ))}
        </Section>
      </Section>
    </Container>
  );
};

export default PaymentHistory;
