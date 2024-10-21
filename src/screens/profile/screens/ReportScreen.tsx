import React, {useState} from 'react';
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
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {ArrowLeft2, Heart} from 'iconsax-react-native';

const ReportScreen = (props: any) => {
  const [bloodPressure, setBloodPressure] = useState('120/80');
  const [heartRate, setHeartRate] = useState('75');
  const [temperature, setTemperature] = useState('36.6');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleUpdate = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = () => {
    Alert.alert(
      'Confirm Update',
      'Do you want to update the health indicators?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Cập nhật các thông số
            console.log(bloodPressure);
            setIsFormVisible(false);
          },
        },
      ],
    );
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
          text="Current health indicators:"
          size={16}
          font={fontFamilies.regular}
          styles={styles.instruction}
        />

        <Card color="#D6F3F1" styles={{borderRadius: 20}}>
          <Row justifyContent="flex-start">
            <Image
              source={require('../../../assets/images/blood-pressure.png')}
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
                text="118"
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
              <TextComponent text="76" size={25} font={fontFamilies.semiBold} />
              <TextComponent
                text="DIA"
                size={14}
                font={fontFamilies.regular}
                color="gray"
              />
            </Col>
            <Col styles={{alignItems: 'center'}}>
              <TextComponent text="73" size={25} font={fontFamilies.semiBold} />
              <TextComponent
                text="PUL"
                size={14}
                font={fontFamilies.regular}
                color="gray"
              />
            </Col>
          </Row>
        </Card>
        <Card color="#FADFE4" styles={{borderRadius: 20}}>
          <Row justifyContent="flex-start">
            <Image source={require('../../../assets/images/heart-rate.png')} />
            <Space width={15} />
            <TextComponent
              text="Heart Rate"
              size={20}
              font={fontFamilies.semiBold}
            />
          </Row>
          <Row justifyContent="flex-start" styles={{paddingHorizontal: 60}}>
            <TextComponent text="73" size={25} font={fontFamilies.semiBold} />
            <Space width={10} />
            <TextComponent
              text="bpm"
              size={15}
              font={fontFamilies.semiBold}
              color="gray"
            />
          </Row>
        </Card>
        <Row>
          <Card color="#FCE8DD" styles={{flex: 1, borderRadius: 20}}>
            <Row justifyContent="flex-start">
              <Image
                source={require('../../../assets/images/blood-sugar.png')}
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
                text="4.0"
                size={25}
                font={fontFamilies.semiBold}
              />
              <TextComponent text="mmol/l" />
            </Row>
          </Card>
          <Card color="#DCEDF4" styles={{flex: 1, borderRadius: 20}}>
            <Row justifyContent="flex-start">
              <Image
                source={require('../../../assets/images/bmi.png')}
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
                text="19.7"
                size={25}
                font={fontFamilies.semiBold}
              />
              <TextComponent text="Kg/m2" />
            </Row>
          </Card>
        </Row>

        <Button title="Update" onPress={handleUpdate} color="#0B8FAC" styles={ {marginHorizontal:50, marginVertical: 20}} />

        <Modal
          transparent={true}
          animationType="slide"
          visible={isFormVisible}
          onRequestClose={() => setIsFormVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Heart Rate..."
                value={heartRate}
                onChangeText={setHeartRate}
                keyboardType="numeric"
              />
              <Input value={heartRate} onChange={setHeartRate} styles={{width: '100%'}} placeholder='bpm'/>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Body Temperature..."
                value={temperature}
                onChangeText={setTemperature}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.textInput}
                placeholder="Enter Blood Pressure..."
                value={bloodPressure}
                onChangeText={setBloodPressure}
                keyboardType="numeric"
              />
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Cancel" onPress={() => setIsFormVisible(false)} />
            </View>
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
  instruction: {
    marginBottom: 10,
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
