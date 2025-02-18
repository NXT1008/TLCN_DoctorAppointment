import firestore from '@react-native-firebase/firestore';
import { ArrowLeft2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Toast } from 'toastify-react-native';
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
import { fontFamilies } from '../../../constants/fontFamilies';
import { Appointment } from '../../../models/Appointment';
import { Doctor } from '../../../models/Doctor';
import { Patient } from '../../../models/Patient';
import { DateTime } from '../../../utils/DateTime';
import DateTimePickerComponent from './components/DateTimePickerComponent';
import ModalComponent from './components/ModalComponent';
import ToastComponent from './components/ToastComponent';
import { HandleNotification } from '../../../utils/handleNotification';
import { Picker } from '@react-native-picker/picker';
import { Problems } from '../../../models/Problems';


const DoctorReportScreen = ({ navigation, route }: any) => {
  const { patient, doctor, appointment } = route.params;
  const patientInfo = patient;
  const doctorInfo = doctor as Doctor;
  const appointmentInfo = appointment as Appointment;

  const [admissionDetails, setAdmissionDetails] = useState('');
  const [planTreatment, setPlamTreatment] = useState('');
  const [dischargeDate, setDischargeDate] = useState<Date>(new Date());
  const [conditionAtDischarge, setConditionAtDischarge] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [problemList, setProblemList] = useState<Problems[]>([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | undefined>(undefined);
  const [selectedProblem, setSelectedProblem] = useState({});
  const [treatmentPlan, setTreatmentPlan] = useState('');
  // const fetchProblemData = async () => {
  //   try {
  //     const snapshot = await firestore().collection("problems").get();
  //     const data = snapshot.docs.map(doc => doc.data() as Problems); // Chuyển đổi dữ liệu từ Firestore
  //     setProblemList(data);
  //   } catch (error) {
  //     console.error("Error fetching problem data:", error);
  //   }
  // };

  const fetchProblemData = async () => {
    try {
      const specialty = doctorInfo.specializationId; // Lấy chuyên khoa của bác sĩ

      const snapshot = await firestore().collection("problems").get();
      const data = snapshot.docs.map(doc => doc.data() as Problems); // Chuyển đổi dữ liệu từ Firestore

      // Lọc dữ liệu bệnh dựa trên chuyên khoa của bác sĩ
      const filteredData = data.filter(problem => problem.specId === specialty);

      setProblemList(filteredData);
    } catch (error) {
      console.error("Error fetching problem data:", error);
    }
  };

  // Lấy dữ liệu khi component mount
  useEffect(() => {
    fetchProblemData();
  }, []);


  const handleSubmit = () => {
    if (!selectedProblem) {
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
      planTreatment: selectedDiagnosis,
      dateOfDischarge: dischargeDate,
      conditon: treatmentPlan,
      doctorId: doctorInfo.doctorId,
    };

    setModalVisible(false);
    // Additional code for form submission can go here

    const sendNotifications = {
      senderId: doctorInfo.doctorId,
      name: doctorInfo.name,
      receiverId: patientInfo.patientId,
      title: 'Health results are available',
      body: `Your appointment with doctor ${doctorInfo.name
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
      await reportRef.update({ reportId: reportId });

      // Update status appointment
      await firestore()
        .collection('appointments')
        .doc(appointmentInfo.appointmentId)
        .update({ status: 'Complete' });

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

      <Container isScroll style={{ marginTop: -16 }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 10,
            paddingTop: 20,
            backgroundColor: '#fff',
          }}>
          <Section styles={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft2 color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Medical Report</Text>
          </Section>

          <View style={styles.profileSection}>
            <Image
              source={
                patientInfo?.image && patientInfo?.image.includes('https')
                  ? { uri: patientInfo.image }
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
          <Card styles={{ marginHorizontal: 0 }}>
            <TextComponent
              font={fontFamilies.semiBold}
              size={16}
              color="#1c77ff"
              text="Patient Demographics"
              textAlign="center"
              styles={{ marginBottom: 10 }}
            />

            <View style={styles.cardRow}>
              <TextComponent
                text="Gender:"
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text style={styles.cardValue}>{patientInfo.gender}</Text>
            </View>
            <Divider styles={{ marginTop: -10, marginBottom: -10 }} />

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
            <Divider styles={{ marginTop: -10, marginBottom: -10 }} />

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
            <Divider styles={{ marginTop: -10, marginBottom: -10 }} />

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
                  patient.address ? patientInfo.address.toString().slice(0, 25) : ""
                }
              />
            </View>
            <Divider styles={{ marginTop: -10, marginBottom: -10 }} />

            <View style={styles.cardRow}>
              <TextComponent
                text="Blood Pressure: "
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text
                style={styles.cardValue}>{`${patientInfo.bloodPressure}`}</Text>
            </View>
            <Divider styles={{ marginTop: -10, marginBottom: -10 }} />

            <View style={styles.cardRow}>
              <TextComponent
                text="Heart Rate:"
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text
                style={styles.cardValue}>{`${patientInfo.heartRate} bpm`}</Text>
            </View>
            <Divider styles={{ marginTop: -10, marginBottom: -10 }} />

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
            <Divider styles={{ marginTop: -10, marginBottom: -10 }} />

            <View style={styles.cardRow}>
              <TextComponent
                text="BMI:"
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text style={styles.cardValue}>{`${patientInfo.BMI} Kg/m2`}</Text>
            </View>
            <Divider styles={{ marginTop: -10, marginBottom: -10 }} />
          </Card>

          {/* Clinical Summary Section */}
          <Card styles={{ marginHorizontal: 0 }}>
            <TextComponent
              font={fontFamilies.semiBold}
              size={16}
              color="#1c77ff"
              text="Diagnosis and Treatment Plan"
              textAlign="center"
              styles={{ marginBottom: 10 }}
            />

            {/* ComboBox chọn loại bệnh */}
            <TextComponent
              text="Select Diagnosis"
              font={fontFamilies.medium}
              color="#333"
              size={14}
            />
            <Space height={5} />
            <Picker
              selectedValue={selectedDiagnosis}
              onValueChange={value => {
                setSelectedDiagnosis(value);
                const problem = problemList.find(item => item.problemId === value);
                if (problem) {
                  setTreatmentPlan(problem.plan);
                }
              }}
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 5,
                padding: 10,
                fontFamily: fontFamilies.regular,
                fontSize: 13,
                color: "#333",
                width: "100%",
              }}
            >
              {problemList.map(item => (
                <Picker.Item label={item.problemName} value={item.problemId} key={item.problemId} />
              ))}
            </Picker>

            <Space height={10} />

            {/* Khung text hiển thị hoặc nhập kế hoạch điều trị */}
            <TextComponent
              text="Treatment Plan"
              font={fontFamilies.medium}
              color="#333"
              size={14}
            />
            <Space height={5} />
            <Input
              value={treatmentPlan}
              onChange={setTreatmentPlan}
              rows={5}
              radius={10}
              placeholder="Enter or update the treatment plan..."
              placeholderColor="#bbb"
              inline
              inputStyles={{
                fontFamily: fontFamilies.regular,
                fontSize: 13,
                textAlignVertical: "top",
                flexWrap: "wrap-reverse",

              }}
              disable
            />
          </Card>


          {/* <Button title="Submit" onPress={handleSubmit} /> */}
          <Button
            title="Submit"
            onPress={handleSubmit}
            color="#25b8cc"
            textStyleProps={{ fontFamily: fontFamilies.semiBold }}
            styles={{ width: '80%', alignItems: 'center', alignSelf: 'center' }}
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
