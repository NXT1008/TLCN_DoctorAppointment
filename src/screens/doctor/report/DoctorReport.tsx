import firestore from '@react-native-firebase/firestore';
import {ArrowLeft2} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Toast} from 'toastify-react-native';
import {
  Button,
  Card,
  Divider,
  Input,
  Section,
  Space,
  TextComponent,
} from '../../../components';
import Container from '../../../components/ContainerComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Appointment} from '../../../models/Appointment';
import {Doctor} from '../../../models/Doctor';
import {Patient} from '../../../models/Patient';
import {DateTime} from '../../../utils/DateTime';
import DateTimePickerComponent from './components/DateTimePickerComponent';
import ModalComponent from './components/ModalComponent';
import ToastComponent from './components/ToastComponent';
import {HandleNotification} from '../../../utils/handleNotification';
import { slice } from 'lodash';

// Sample Patient Data
const patientData = {
  patientId: '123456',
  name: 'Celeste Lim',
  gender: 'Female',
  dateOfBirth: new Date(),
  age: '7y, 8mos',
  address: 'St Rita Ward',
  email: 'celeste.lim@example.com',
  phone: '079 3988 576',
  image: 'https://example.com/path-to-image.jpg',
  allergies: 'N.A.',
  medicalAlerts: 'N.A.',
};

const DoctorReportScreen = ({navigation, route}: any) => {
  const {patient, doctor, appointment} = route.params;
  const patientInfo = patient;
  const doctorInfo = doctor as Doctor;
  const appointmentInfo = appointment as Appointment;

  const [admissionDetails, setAdmissionDetails] = useState('');
  const [planTreatment, setPlamTreatment] = useState('');
  const [dischargeDate, setDischargeDate] = useState<Date>(new Date());
  const [conditionAtDischarge, setConditionAtDischarge] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {}, []);

  const handleSubmit = () => {
    if (!admissionDetails || !planTreatment || !conditionAtDischarge) {
      // Toast.error('Please filling!', 'top',);
      Toast.error('Please fill in all information!');
      // Alert.alert('Lỗi')
      return;
    }
    setModalVisible(true);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const onPressOK = async () => {
    const newReportData = {
      patientId: patientInfo.patientId,
      histoty: admissionDetails,
      planTreatment: planTreatment,
      dateOfDischarge: dischargeDate,
      conditon: conditionAtDischarge,
      doctorId: doctorInfo.doctorId,
    };

    setModalVisible(false);
    // Additional code for form submission can go here

    const sendNotifications = {
      senderId: doctorInfo.doctorId,
      name: doctorInfo.name,
      receiverId: patientInfo.patientId,
      title: 'Health results are available',
      body: `Your appointment with doctor ${
        doctorInfo.name
      } on ${DateTime.dateToDateString(
        appointmentInfo.scheduleDate,
      )} has been completed. Medical examination results have been sent. Please visit the application to see details`,
      appointmentId: appointmentInfo.appointmentId,
    };

    try {
      const reportRef = await firestore()
        .collection('health_reports')
        .add(newReportData);
      const reportId = reportRef.id;
      await reportRef.update({reportId: reportId});

      // Update status appointment
      await firestore()
        .collection('appointments')
        .doc(appointmentInfo.appointmentId)
        .update({status: 'Complete'});

      HandleNotification.sendNotificationDoctorToPatient(sendNotifications);

      Toast.success(`The patient's medical records have been updated!`);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error);
    }
  };

  return (
    <>
      <ToastComponent />
      <ModalComponent
        onPressCancel={onClose}
        onPressOK={onPressOK}
        visible={isModalVisible}
        patientName={patientInfo.name}
      />

      <Container isScroll style={{marginTop: -16}}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 10,
            paddingTop: 20,
            backgroundColor: '#fff',
          }}>
          <Section styles={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft2 color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Medical Report</Text>
          </Section>

          <View style={styles.profileSection}>
            <Image
              source={
                patientInfo?.image && patientInfo?.image.includes('https')
                  ? {uri: patientInfo.image}
                  : require('../../../assets/images/doctor.png')
              }
              style={styles.profileImage}
            />
            <TextComponent
              font={fontFamilies.semiBold}
              size={18}
              text={patientInfo.name}
            />
          </View>

          {/* Patient Demographics Card */}
          <Card styles={{marginHorizontal: 0}}>
            <TextComponent
              font={fontFamilies.semiBold}
              size={16}
              color="#1c77ff"
              text="Patient Demographics"
              textAlign="center"
              styles={{marginBottom: 10}}
            />

            <View style={styles.cardRow}>
              <TextComponent
                text="Gender:"
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text style={styles.cardValue}>{patientInfo.gender}</Text>
            </View>
            <Divider styles={{marginTop: -10, marginBottom: -10}} />

            <View style={styles.cardRow}>
              <TextComponent
                text="Date of Birth:"
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text style={styles.cardValue}>
                {patientInfo?.dateOfBirth
                  ? DateTime.dateToDateString(
                      new Date(patientInfo.dateOfBirth.seconds * 1000),
                    )
                  : DateTime.dateToDateString(new Date())}
              </Text>
            </View>
            <Divider styles={{marginTop: -10, marginBottom: -10}} />

            <View style={styles.cardRow}>
              <TextComponent
                text="Age:"
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text style={styles.cardValue}>
                {patientInfo.dateOfBirth
                  ? new Date().getFullYear() -
                    new Date(
                      patientInfo.dateOfBirth.seconds * 1000,
                    ).getFullYear()
                  : '18'}
              </Text>
            </View>
            <Divider styles={{marginTop: -10, marginBottom: -10}} />

            <View
              style={{
                flexDirection: 'row',
                marginBottom: -6,
                justifyContent: 'space-between',
                paddingHorizontal: 8,
              }}>
              <TextComponent
                text="Address:"
                font={fontFamilies.semiBold}
                color="#333"
                
              />
              <TextComponent
                styles={{
                  fontFamily: fontFamilies.regular,
                  color: '#333',
                }}
                textAlign='right'
                text={
                  patient.address ? patientInfo.address.toString().slice(0,25) : patientData.address
                }
              />
            </View>
            <Divider styles={{marginTop: -10, marginBottom: -10}} />

            <View style={styles.cardRow}>
              <TextComponent
                text="Blood Pressure: "
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text
                style={styles.cardValue}>{`${patientInfo.bloodPressure}`}</Text>
            </View>
            <Divider styles={{marginTop: -10, marginBottom: -10}} />

            <View style={styles.cardRow}>
              <TextComponent
                text="Heart Rate:"
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text
                style={styles.cardValue}>{`${patientInfo.heartRate} bpm`}</Text>
            </View>
            <Divider styles={{marginTop: -10, marginBottom: -10}} />

            <View style={styles.cardRow}>
              <TextComponent
                text="Blood Sugar:"
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text
                style={
                  styles.cardValue
                }>{`${patientInfo.bloodSugar} mmol/l`}</Text>
            </View>
            <Divider styles={{marginTop: -10, marginBottom: -10}} />

            <View style={styles.cardRow}>
              <TextComponent
                text="BMI:"
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text style={styles.cardValue}>{`${patientInfo.BMI} Kg/m2`}</Text>
            </View>
            <Divider styles={{marginTop: -10, marginBottom: -10}} />
          </Card>

          {/* Clinical Summary Section */}
          <Card styles={{marginHorizontal: 0}}>
            <TextComponent
              font={fontFamilies.semiBold}
              size={16}
              color="#1c77ff"
              text="Clinical Summary"
              textAlign="center"
              styles={{marginBottom: 10}}
            />

            <TextComponent
              text="History and Physical Assessment"
              font={fontFamilies.medium}
              color="#333"
              size={14}
            />
            <Space height={5} />
            <Input
              value={admissionDetails}
              onChange={setAdmissionDetails}
              rows={5}
              radius={10}
              placeholder="Enter history and assessment details..."
              placeholderColor="#bbb"
              inputStyles={{fontFamily: fontFamilies.regular, fontSize: 13}}
            />

            <Space height={10} />

            <TextComponent
              text="Plan for"
              font={fontFamilies.medium}
              color="#333"
              size={14}
            />
            <Space height={5} />
            <Input
              value={planTreatment}
              onChange={setPlamTreatment}
              rows={5}
              radius={10}
              placeholder="Enter treatment plan details..."
              placeholderColor="#bbb"
              inputStyles={{fontFamily: fontFamilies.regular, fontSize: 13}}
            />
          </Card>

          {/* Discharge Details Section */}
          <Card styles={{marginHorizontal: 0}}>
            <TextComponent
              font={fontFamilies.semiBold}
              size={16}
              color="#1c77ff"
              text="Discharge Details"
              textAlign="center"
              styles={{marginBottom: 10}}
            />

            <DateTimePickerComponent
              type="date"
              title="Date of Discharge"
              placeholder="Choice"
              selected={dischargeDate}
              onSelect={val => {
                setDischargeDate(val);
              }}
            />
            <Space height={10} />

            <TextComponent
              text="Condition at Discharge"
              font={fontFamilies.semiBold}
              color="#333"
              styles={{marginBottom: 6}}
            />
            <Input
              value={conditionAtDischarge}
              onChange={setConditionAtDischarge}
              placeholder="Enter condition at discharge..."
              radius={5}
              inputStyles={{fontFamily: fontFamilies.regular, fontSize: 13}}
            />
          </Card>

          {/* <Button title="Submit" onPress={handleSubmit} /> */}
          <Button
            title="Submit"
            onPress={handleSubmit}
            color="#25b8cc"
            textStyleProps={{fontFamily: fontFamilies.semiBold}}
            styles={{width: '80%', alignItems: 'center', alignSelf: 'center'}}
            radius={10}
          />
        </ScrollView>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#21a691',
    fontFamily: 'Poppins-Bold',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: -6,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  cardValue: {
    fontFamily: fontFamilies.regular,
    color: '#333',
    width: 'auto',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f4f82',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 14,
    color: '#333',
  },
  datePicker: {
    marginBottom: 16,
  },
});

export default DoctorReportScreen;
