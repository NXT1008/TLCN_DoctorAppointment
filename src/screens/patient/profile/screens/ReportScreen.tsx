import firestore, {firebase} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  ContainerComponent,
  Section,
  TextComponent,
  Row,
  Card,
  Col,
  Space,
  Button,
  Input,
} from '../../../../components';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {
  ArrowLeft2,
  Backward5Seconds,
  Forbidden2,
  Heart,
  TickCircle,
} from 'iconsax-react-native';
import {Toast} from 'toastify-react-native';
import {Patient} from '../../../../models/Patient';
const ReportScreen = (props: any) => {
  const {patient} = props.route.params;
  const [bloodPressure, setBloodPressure] = useState('');
  const [sys, setSys] = useState('');
  const [dia, setDia] = useState('');
  const [pul, setPul] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [infoUpdate, setInfoUpdate] = useState('');
  const [isError, setIsError] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  // Thời gian cập nhật
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const time = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  const handleUpdate = () => {
    setIsFormVisible(true);
  };

  useEffect(() => {
    if (patient) {
      setSys(patient.bloodPressure.split('/')[0]);
      setDia(patient.bloodPressure.split('/')[1]);
      setPul(patient.bloodPressure.split('/')[2]);
      setHeartRate(patient.heartRate);
      setBloodSugar(patient.bloodSugar);
      setWeight(patient.weight);
      setHeight(patient.height);
      setBMI(patient.BMI);
    }
  }, []);
  const handleSubmit = async () => {
    if (heartRate === '') {
      Toast.warn('Please enter your heart rate');
      return;
    }
    if (bloodSugar === '') {
      Toast.warn('Please enter your blood sugar');
      return;
    }
    if (weight === '') {
      Toast.warn('Please enter your weight');
      return;
    }
    if (height === '') {
      Toast.warn('Please enter your height');
      return;
    }

    // Cập nhật các thông số
    setSys(sys); // Lấy giá trị SYS từ bloodPressure
    setDia(dia); // Lấy giá trị DIA từ bloodPressure
    setPul(pul); // Lấy giá trị PUL từ bloodPressure
    setHeartRate(heartRate); // Cập nhật heartRate
    setBloodSugar(bloodSugar);
    setHeight(height);
    setWeight(weight);
    const bloodPressure = sys + '/' + dia + '/' + pul;
    setBloodPressure(bloodPressure);
    const heightInMeters = parseFloat(height) / 100;
    const calculatedBMI = (
      parseFloat(weight) /
      (heightInMeters * heightInMeters)
    ).toFixed(1);
    setBMI(calculatedBMI);

    // Update report data here
    const oldReport: Patient = patient;
    const updatedReport: Patient = {
      ...oldReport,
      bloodPressure: bloodPressure,
      heartRate: heartRate,
      bloodSugar: bloodSugar,
      BMI: bmi,
    };
    const reportRef = firestore()
      .collection('patients')
      .doc(updatedReport.patientId);
    const reportDoc = await reportRef.get();
    if (reportDoc.exists) {
      await reportRef
        .update(updatedReport)
        .then(() => {
          setInfoUpdate('Update success');
          setIsError(false);
          setIsFormVisible(false); // Thêm dòng code này
        })
        .catch(e => {
          setInfoUpdate(e);
          setIsError(true);
        });

      await reportRef
        .set(updatedReport)
        .then(() => {
          setInfoUpdate('Create success');
          setIsError(false);
          setIsFormVisible(false); // Thêm dòng code này
        })
        .catch(e => {
          setInfoUpdate(e);
          setIsError(true);
        });
    }
    setIsFormVisible(false);
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
              text="Health Indicator"
              size={20}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <Section>
        <TextComponent
          text="Current health indicators"
          size={16}
          font={fontFamilies.regular}
        />
        <TextComponent
          text={'Update last at: ' + time}
          size={14}
          font={fontFamilies.regular}
          color="gray"
        />
        <Space height={20} />
        <Card color="#D6F3F1" styles={{borderRadius: 20}}>
          <Row justifyContent="flex-start">
            <Image
              source={require('../../../../assets/images/blood-pressure.png')}
            />
            <Space width={15} />
            <TextComponent
              text="Blood Pressure"
              size={20}
              font={fontFamilies.semiBold}
            />
          </Row>
          <Row>
            <Col styles={{alignItems: 'center'}}>
              <TextComponent
                text={sys}
                size={25}
                font={fontFamilies.semiBold}
              />
              <TextComponent
                text="SYS"
                size={14}
                font={fontFamilies.regular}
                color="gray"
              />
            </Col>
            <Col styles={{alignItems: 'center'}}>
              <TextComponent
                text={dia}
                size={25}
                font={fontFamilies.semiBold}
              />
              <TextComponent
                text="DIA"
                size={14}
                font={fontFamilies.regular}
                color="gray"
              />
            </Col>
            <Col styles={{alignItems: 'center'}}>
              <TextComponent
                text={pul}
                size={25}
                font={fontFamilies.semiBold}
              />
              <TextComponent
                text="PUL"
                size={14}
                font={fontFamilies.regular}
                color="gray"
              />
            </Col>
          </Row>
        </Card>
        <Space height={20} />
        <Card color="#FADFE4" styles={{borderRadius: 20}}>
          <Row justifyContent="flex-start">
            <Image
              source={require('../../../../assets/images/heart-rate.png')}
            />
            <Space width={15} />
            <TextComponent
              text="Heart Rate"
              size={20}
              font={fontFamilies.semiBold}
            />
          </Row>
          <Row justifyContent="flex-start" styles={{paddingHorizontal: 60}}>
            <TextComponent
              text={heartRate}
              size={25}
              font={fontFamilies.semiBold}
            />
            <Space width={10} />
            <TextComponent
              text="bpm"
              size={15}
              font={fontFamilies.semiBold}
              color="gray"
            />
          </Row>
        </Card>
        <Space height={20} />
        <Row>
          <Card color="#FCE8DD" styles={{flex: 1, borderRadius: 20}}>
            <Row justifyContent="flex-start">
              <Image
                source={require('../../../../assets/images/blood-sugar.png')}
                style={{width: 30, height: 30}}
              />
              <TextComponent
                text="Blood Sugar"
                size={12}
                font={fontFamilies.semiBold}
              />
            </Row>
            <Row>
              <TextComponent
                text={bloodSugar}
                size={25}
                font={fontFamilies.semiBold}
              />
              <Space width={8} />
              <TextComponent
                text="mmol/l"
                size={12}
                font={fontFamilies.semiBold}
                color="gray"
              />
            </Row>
          </Card>
          <Card color="#DCEDF4" styles={{flex: 1, borderRadius: 20}}>
            <Row justifyContent="flex-start">
              <Image
                source={require('../../../../assets/images/bmi.png')}
                style={{width: 30, height: 30}}
              />
              <Space width={10} />
              <TextComponent
                text="BMI"
                size={12}
                font={fontFamilies.semiBold}
              />
            </Row>
            <Row>
              <TextComponent
                text={bmi}
                size={25}
                font={fontFamilies.semiBold}
              />
              <Space width={8} />
              <TextComponent
                text="Kg/m2"
                size={12}
                font={fontFamilies.semiBold}
                color="gray"
              />
            </Row>
          </Card>
        </Row>

        <Button
          title="Update"
          onPress={handleUpdate}
          color="#0B8FAC"
          styles={{marginHorizontal: 50, marginVertical: 20}}
          textStyleProps={{fontFamily: fontFamilies.semiBold}}
        />

        <Modal
          transparent={true}
          animationType="slide"
          visible={isFormVisible}
          onRequestClose={() => setIsFormVisible(false)}>
          <View style={styles.modalBackground}>
            <Card styles={[styles.modalContainer, {}]}>
              <Input
                label="SYS"
                value={sys}
                onChange={setSys}
                styles={{width: '100%', borderRadius: 10, marginTop: -5}}
                labelStyleProps={{fontFamily: fontFamilies.regular}}
                inputStyles={{fontFamily: fontFamilies.regular}}
                placeholder="SYS"
              />
              <Input
                label="DIA"
                value={dia}
                onChange={setDia}
                styles={{width: '100%', borderRadius: 10, marginTop: -5}}
                labelStyleProps={{fontFamily: fontFamilies.regular}}
                inputStyles={{fontFamily: fontFamilies.regular}}
                placeholder="DIA"
              />
              <Input
                label="PUL"
                value={pul}
                onChange={setPul}
                styles={{width: '100%', borderRadius: 10, marginTop: -5}}
                labelStyleProps={{fontFamily: fontFamilies.regular}}
                inputStyles={{fontFamily: fontFamilies.regular}}
                placeholder="PUL"
              />
              <Input
                label="Blood pressure"
                value={`${sys}/${dia}/${pul}`}
                disable
                styles={{width: '100%', borderRadius: 10, marginTop: -5}}
                labelStyleProps={{fontFamily: fontFamilies.regular}}
                inputStyles={{fontFamily: fontFamilies.regular}}
                placeholder="SYS/DIA/PUL"
                onChange={() => {}}
              />
              <Input
                label="Heart rate"
                value={heartRate}
                onChange={setHeartRate}
                styles={{width: '100%', borderRadius: 10, marginTop: -5}}
                labelStyleProps={{fontFamily: fontFamilies.regular}}
                inputStyles={{fontFamily: fontFamilies.regular}}
                placeholder="BPM"
              />
              <Input
                label="Blood sugar"
                value={bloodSugar}
                onChange={setBloodSugar}
                styles={{width: '100%', borderRadius: 10, marginTop: -5}}
                labelStyleProps={{fontFamily: fontFamilies.regular}}
                inputStyles={{fontFamily: fontFamilies.regular}}
                placeholder="mmol"
              />
              <Row justifyContent="space-between" styles={{width: '100%'}}>
                <Input
                  label="Your height"
                  value={height}
                  onChange={setHeight}
                  styles={{width: '90%', borderRadius: 10, marginTop: -5}}
                  labelStyleProps={{fontFamily: fontFamilies.regular}}
                  inputStyles={{fontFamily: fontFamilies.regular}}
                  placeholder="Cm"
                />
                <Space width={15} />
                <Input
                  label="Your weight"
                  value={weight}
                  onChange={setWeight}
                  styles={{width: '90%', borderRadius: 10, marginTop: -5}}
                  labelStyleProps={{fontFamily: fontFamilies.regular}}
                  inputStyles={{fontFamily: fontFamilies.regular}}
                  placeholder="Kg"
                />
              </Row>
              <Row
                justifyContent="space-between"
                styles={{width: '80%', marginTop: 20}}>
                <Button
                  title="Cancel"
                  onPress={() => setIsFormVisible(false)}
                  styles={{borderRadius: 15, backgroundColor: '#e05368'}}
                  textStyleProps={{
                    fontFamily: fontFamilies.medium,
                    fontSize: 14,
                    color: '#fff',
                  }}
                />
                <Button
                  title="Submit"
                  onPress={handleSubmit}
                  styles={{borderRadius: 15, backgroundColor: '#21becc'}}
                  textStyleProps={{
                    fontFamily: fontFamilies.medium,
                    fontSize: 14,
                    color: '#fff',
                  }}
                />
              </Row>
            </Card>
          </View>
        </Modal>
      </Section>
    </ContainerComponent>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    backgroundColor: 'pink',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  label: {
    marginLeft: 10,
    flex: 1,
  },
  value: {
    flex: 2,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%', // Đảm bảo chiều rộng đầy đủ
  },
});
export default ReportScreen;