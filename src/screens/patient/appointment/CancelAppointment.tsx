import firestore from '@react-native-firebase/firestore';
import { ArrowLeft2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Toast } from 'toastify-react-native';
import {
  ContainerComponent,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../../components';
import { fontFamilies } from '../../../constants/fontFamilies';
import { Appointment } from '../../../models/Appointment';
import { Cancellation } from '../../../models/Cancellation';
import ModalComponent from './components/ModalComponent';
import ToastComponent from './components/ToastComponent';
import auth from '@react-native-firebase/auth'
import { Patient } from '../../../models/Patient';
import { FormatTime } from '../../../utils/formatTime';
import { HandleNotificationPatient } from '../../../utils/handleNotification';

const CancelAppointment = ({ navigation, route }: any) => {
  const user = auth().currentUser?.uid
  const [patient, setPatient] = useState<Patient>();

  const {data} = route.params;
  const appointment = data as Appointment;
  const [selectedReason, setSelectedReason] =
    useState<string>('Weather Conditions');
  const [additionalReason, setAdditionalReason] = useState<string>('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const reasons = [
    'Rescheduling',
    'Weather Conditions',
    'Unexpected Work',
    'Others',
  ];

  useEffect(() => {
    // Tạo listener cho thông tin patient
    const unsubscribePatient = firestore()
      .collection('patients')
      .doc(user)
      .onSnapshot(
        snapshot => {
          if (snapshot.exists) {
            setPatient(snapshot.data() as Patient);
          }
        },
        error => {
          console.error('Error listening to patient changes:', error);
        },
      );
  }, []);

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
  };


  const onPressOK = async () => {
    const cancellation: Cancellation = {
      cancellationId: '',
      appointmentId: appointment.appointmentId,
      cancelReason:
        selectedReason === 'Others' ? additionalReason : selectedReason,
      cancelBy: appointment.doctorId,
      cancelTime: new Date(),
    };

    setIsVisibleModal(false);

    try {
      const cancelRef = await firestore()
        .collection('cancellations')
        .add(cancellation);
      const cancelId = cancelRef.id;
      await cancelRef.update({cancellationId: cancelId});

      const sendNotifications = {
        senderId: auth().currentUser?.uid as string,
        name: patient?.name ? patient.name : '',
        receiverId: data.doctorId,
        title: `Confirm cancellation of medical appointment from ${patient?.name}`,
        body: `The appointment with patient ${
          patient?.name
        } at ${FormatTime.formatAvailableDate(
          new Date(data.startTime.seconds * 1000),
        )} on ${FormatTime.getShortFormattedDate(
          new Date(data.scheduleDate.seconds * 1000),
        )} has been canceled. Reason: ${
          selectedReason === 'Others' ? additionalReason : selectedReason
        }. Please check the information.`,
        appointmentId: data.appointmentId,
      };

      // Update appointment status
      await firestore()
        .collection('appointments')
        .doc(appointment.appointmentId)
        .update({status: 'Canceled'});

      // send notification
      HandleNotificationPatient.sendNotificationPatientToDoctor(
        sendNotifications,
      );

      Toast.success(`This appointment has been cancelled!`);

      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.log('Cannot cancel appointment: ' + error);
    }
  };

  const onPressCancel = () => {
    setIsVisibleModal(false);
  };

  const handleCancelAppointment = async () => {
    if (selectedReason === 'Others' && additionalReason.trim() === '') {
      Toast.error('Please fill the reason!');
      return;
    }
    setIsVisibleModal(true);
  };

  return (
    <ContainerComponent isScroll style={styles.container}>
      <ModalComponent
        visible={isVisibleModal}
        onPressCancel={onPressCancel}
        onPressOK={onPressOK}
      />
      <ToastComponent />

      <Section styles={{marginBottom: 10}}>
        <Row justifyContent="flex-start" styles={{marginLeft: -18}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="Cancel Appointment"
              size={20}
              font={fontFamilies.bold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <Text style={styles.subHeader}>
        It is very important to take care of the patient, the patient will be
        followed by the patient, but this time it will happen that there is a
        lot of work and pain.
      </Text>

      <View style={styles.reasonList}>
        {reasons.map((reason, index) => (
          <TouchableOpacity
            key={index}
            style={styles.reasonItem}
            onPress={() => handleReasonSelect(reason)}>
            <Text style={styles.radioButton}>
              {selectedReason === reason ? '●' : '○'}
            </Text>
            <Text style={styles.reasonText}>{reason}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Space height={40} />

      <Input
        textAreal
        styles={styles.textInput}
        inputStyles={{fontFamily: fontFamilies.regular, color: '#000'}}
        placeholder="Enter Your Comment Here..."
        placeholderColor="gray"
        value={additionalReason}
        onChange={val => {
          setAdditionalReason(val);
        }}
      />

      <Space height={70} />

      <Section styles={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelAppointment}>
          <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
        </TouchableOpacity>
      </Section>
    </ContainerComponent>
  );
};

export default CancelAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  topNavigator: {
    flexDirection: 'row',
    top: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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

  subHeader: {
    fontSize: 14,
    color: '#A3B1B4',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
  reasonList: {
    maxHeight: 150,
    marginBottom: 25,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioButton: {
    fontSize: 20,
    marginRight: 10,
    color: '#21a691',
  },
  reasonText: {
    fontSize: 16,
    color: '#27403e',
    fontFamily: 'Poppins-Regular',
  },
  placeholderText: {
    fontSize: 14,
    color: '#A3B1B4',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  textInput: {
    height: 166,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#E8F5E9',
    width: 'auto',
    fontFamily: 'Poppins-Regular',
  },
  cancelButton: {
    backgroundColor: '#21a691',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontFamilies.semiBold,
  },
});
