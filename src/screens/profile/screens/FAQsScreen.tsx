import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  ContainerComponent,
  Section,
  Row,
  Col,
  TextComponent,
  Space,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {
  ArrowDown3,
  ArrowLeft2,
  ArrowRight3,
  ArrowSquareDown,
  ArrowSquareRight,
} from 'iconsax-react-native';

const FAQsScreen = (props: any) => {
  const [collapsedStates, setCollapsedStates] = React.useState(
    Array(12).fill(false),
  ); // Mảng trạng thái gập

  const faqs = [
    {
      question: 'How do I book an appointment with a doctor?',
      answer:
        "To book an appointment, first log in to your account. Then navigate to the 'Doctors' section, select your preferred doctor, and choose an available date and time slot for the appointment.",
    },
    {
      question: 'Can I book an appointment without an account?',
      answer:
        'No, you need to create an account or log in using your credentials (Google, Facebook, Email, or phone number) to book an appointment.',
    },
    {
      question: 'What are the payment methods?',
      answer:
        'You can pay for your appointment via credit card, debit card, or other digital payment methods available within the app.',
    },
    {
      question: 'Can I cancel or reschedule an appointment?',
      answer:
        "Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time. Visit the 'My Appointments' section and choose the appointment you want to change.",
    },
    {
      question: 'How do I find the right doctor for my condition?',
      answer:
        'You can search for doctors by specialization, location, or by name. Each doctor’s profile contains detailed information about their expertise and reviews from other patients.',
    },
    {
      question: 'What happens if I miss my appointment?',
      answer:
        'If you miss your appointment, the payment may not be refundable. Please refer to our cancellation policy for more details.',
    },
    {
      question: 'Can I consult doctors online through the app?',
      answer:
        "Yes, some doctors offer teleconsultation services. You can choose the 'Online Consultation' option when booking an appointment.",
    },
    {
      question: 'How do I contact support if I face issues?',
      answer:
        "You can contact our support team through the 'Help' section in the app or email us directly at support@doctorapp.com.",
    },
    {
      question: 'Can I review a doctor after my appointment?',
      answer:
        'Yes, after your appointment, you will be prompted to leave a review and rate the doctor based on your experience.',
    },
    {
      question: 'Is my personal information safe?',
      answer:
        'We take privacy and security seriously. Your personal and medical information is encrypted and protected according to industry standards.',
    },
    {
      question: 'How do I receive notifications about my appointments?',
      answer:
        "The app sends reminders via email, SMS, and in-app notifications to ensure you don't miss your appointment.",
    },
    {
      question: 'Can I change my personal details after registration?',
      answer:
        "Yes, you can update your personal information by going to the 'Profile' section within the app.",
    },
  ];

  const handleCollapse = (index: any) => {
    const newCollapsedStates = [...collapsedStates];
    newCollapsedStates[index] = !newCollapsedStates[index];
    setCollapsedStates(newCollapsedStates);
  };

  return (
    <ContainerComponent isScroll>
      <Section>
        <Row justifyContent="flex-start">
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="FAQs"
              size={25}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
        <TextComponent
          text="How can we help you?"
          textAlign="center"
          size={14}
          font={fontFamilies.regular}
          color="gray"
        />
      </Section>
      <Section styles={{paddingHorizontal: 20}}>
        {faqs.map((faq, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => handleCollapse(index)}>
              <Row
                justifyContent="space-between"
                alignItems="flex-start"
                styles={{
                  paddingVertical: 10,
                }}>
                <TextComponent
                  text={index + 1 + '. Q: ' + faq.question}
                  size={14}
                  font={fontFamilies.semiBold}
                  styles={{width: 300}}
                />
                <View>
                  {collapsedStates[index] ? (
                    <ArrowSquareDown color="#000" />
                  ) : (
                    <ArrowSquareRight color="#000" />
                  )}
                </View>
              </Row>
            </TouchableOpacity>
            <Collapsible collapsed={!collapsedStates[index]}>
              <TextComponent
                text={'A: ' + faq.answer}
                size={14}
                font={fontFamilies.regular}
                styles={{marginBottom: 10, marginLeft: 10}}
              />
            </Collapsible>
          </View>
        ))}
      </Section>
    </ContainerComponent>
  );
};

export default FAQsScreen;
