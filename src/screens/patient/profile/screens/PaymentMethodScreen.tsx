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
import firestore from '@react-native-firebase/firestore';
import {PaymentMethod} from '../../../../models/Payment';
import auth from '@react-native-firebase/auth';
import CreditCardComponent from '../components/CreditCard';
import {FormatTime} from '../../../../utils/formatTime';

const PaymentHistory = ({navigation}: any) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

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
          {Array.from({length: 5}).map((_, index) => (
            <Card
              key={index}
              onPress={() => {}}
              styles={{flexDirection: 'row', borderRadius: 10}}
              color="#f8f8f8">
              <Call color="#000" />
              <Space width={16} />
              <Col>
                <TextComponent
                  text="Title Payment"
                  font={fontFamilies.semiBold}
                  color="#444444"
                />
                <TextComponent
                  text={`${FormatTime.getShortFormattedDate(
                    new Date(),
                  )}, ${FormatTime.convertTo12HourFormat(new Date())}`}
                  font={fontFamilies.regular}
                  size={12}
                  color="#8f8f8f"
                />
              </Col>
              <TextComponent
                text="- 400,000 VND"
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
