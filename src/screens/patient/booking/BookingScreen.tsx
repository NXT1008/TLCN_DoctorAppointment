import auth from '@react-native-firebase/auth';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import {ArrowLeft2} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ContainerComponent,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../../components';
import DateTimePickerComponent from '../../../components/DateTimePickerComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Doctor} from '../../../models/Doctor';
import {Schedule} from '../../../models/Schedule';
import {FormatTime} from '../../../utils/formatTime';
import Toast from 'toastify-react-native';
import ToastComponent from './components/ToastComponent';

const BookingScreen = ({navigation, route}: any) => {
  const {width, height} = Dimensions.get('window');
  const patientId = auth().currentUser?.uid;
  const {data} = route.params;
  const doctor = data as Doctor;
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [age, setAge] = useState<string>('26 - 30');
  const [gender, setGender] = useState<string>('Male');
  const [problem, setProblem] = useState<string>('');
  //--------------
  const [scheduleChoosen, setScheduleChoosen] = useState<Schedule>(); //Lịch được chọn
  const [scheduleDate, setScheduleDate] = useState<Date>(new Date()); // ngày được chọn
  const [timeSlots, setTimeSlots] = useState<Schedule[]>([]); // Tất cả timeslot trong 1 ngày
  const [isLoading, setIsLoading] = useState(false);
  const [bookingFor, setBookingFor] = useState('you');

  const ageRanges = [
    '18 - 25',
    '26 - 30',
    '31 - 40',
    '41 - 50',
    '51 - 60',
    '60+',
  ];

  const handleAddNewAppointment = async () => {
    if (bookingFor !== 'you') {
      if (fullName === '') {
        Toast.warn('Please enter yor relative name');
        return;
      }
    }

    if (!scheduleChoosen) {
      Toast.warn('Please choose time!');
      return;
    }

    const appointment = {
      doctorId: doctor.doctorId,
      patientId: patientId,
      scheduleDate: scheduleChoosen?.availableDate,
      startTime: scheduleChoosen?.startTime,
      endTime: scheduleChoosen?.endTime,
      note: problem,
      status: 'Upcoming',
      scheduleId: scheduleChoosen?.scheduleId,
    };
    navigation.navigate('Payment', {
      appointment: appointment,
      schedule: scheduleChoosen,
      doctor: doctor
    });
  };

  useEffect(() => {
    if (!doctor) return;

    // Hàm để xử lý dữ liệu onSnapshot
    const handleSnapshot = (snap: any) => {
      if (snap.empty) {
        console.log(doctor.doctorId + ' No time slots in this day');
      } else {
        const inputDate = new Date(scheduleDate.setHours(0, 0, 0, 0));
        const inputYear = inputDate.getFullYear();
        const inputMonth = inputDate.getMonth(); // Tháng bắt đầu từ 0
        const inputDay = inputDate.getDate();

        const items: Schedule[] = [];
        snap.forEach((doc: any) => {
          const data = doc.data();

          const availableDateTimestamp = data.availableDate; // type: timestamp
          const availableDateObject = new Date(
            availableDateTimestamp.seconds * 1000,
          ); // Chuyển đổi seconds thành milliseconds

          // Lấy ngày, tháng, năm từ availableDateObject
          const availableYear = availableDateObject.getFullYear() as number;
          const availableMonth = availableDateObject.getMonth(); // Tháng bắt đầu từ 0
          const availableDay = availableDateObject.getDate();

          // So sánh năm, tháng, ngày
          if (
            inputYear === availableYear &&
            inputMonth === availableMonth &&
            inputDay === availableDay
          ) {
            // console.log(data)
            // const start = data.startTime
            // console.log("🚀 ~ snap.forEach ~ start:", start)

            items.push({
              id: doc.id,
              ...data,
            });
          }
        });
        setTimeSlots(items);
      }
    };

    // Gọi firestore onSnapshot
    const unsubscribe = firestore()
      .collection('schedules')
      .where('doctorId', '==', doctor.doctorId)
      .onSnapshot(handleSnapshot, error => {
        console.error('Error fetching data: ', error);
      });

    // Cleanup khi unmount hoặc thay đổi
    return () => unsubscribe();
  }, [doctor, scheduleDate]);

  const handleDateSelection = (val: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (val < today) {
      Toast.warn('Cannot select past dates');
      return;
    }

    setScheduleDate(val);
  };

  return (
    <>
      <ToastComponent />
      <ContainerComponent isScroll style={{marginTop: -16}}>
        <Space height={15} />
        <Section styles={styles.header}>
          <Row justifyContent="space-around">
            <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
            <Text style={styles.headerText}>New Appointment</Text>
          </Row>
        </Section>

        <Section>
          <DateTimePickerComponent
            type="date"
            title="Choose Day"
            placeholder="Choice"
            selected={scheduleDate}
            onSelect={handleDateSelection}
          />
        </Section>

        <Section styles={styles.timeSection}>
          <TextComponent
            text="Available Time"
            font="Poppins-Medium"
            size={18}
          />
          <View style={styles.timeRow}>
            {timeSlots.length > 0 ? (
              timeSlots.map(
                (item, index) =>
                  item.isBook === false && (
                    <TouchableOpacity
                      key={`${item.doctorId}/${index}`}
                      style={[
                        styles.timeBox,
                        selectedTime ===
                          FormatTime.formatAvailableDate(item.startTime) &&
                          styles.selectedBox,
                        item.isBook && styles.disabledBox,
                      ]}
                      onPress={() => {
                        if (!item.isBook) {
                          setSelectedTime(
                            FormatTime.formatAvailableDate(item.startTime),
                          );
                          setScheduleChoosen(item);
                        }
                      }}
                      disabled={item.isBook}>
                      <TextComponent
                        styles={[
                          styles.timeText,
                          selectedTime ===
                            FormatTime.formatAvailableDate(item.startTime) &&
                            styles.selectedBoxText,
                          item.isBook && styles.disabledText,
                        ]}
                        text={FormatTime.formatAvailableDate(item.startTime)}
                      />
                    </TouchableOpacity>
                  ),
              )
            ) : (
              <TextComponent
                text="Dont have time"
                font={fontFamilies.regular}
                styles={{textAlign: 'center'}}
              />
            )}
          </View>
        </Section>
        <>
          <Section>
            <TextComponent
              text="Book For"
              font={fontFamilies.medium}
              size={18}
            />
            <View>
              <View style={styles.genderRow}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    bookingFor === 'you' && styles.selectedBox,
                  ]}
                  onPress={() => setBookingFor('you')}>
                  <Text
                    style={[
                      styles.genderText,
                      bookingFor === 'you' && styles.selectedBoxText,
                    ]}>
                    You
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    bookingFor === 'relative' && styles.selectedBox,
                  ]}
                  onPress={() => setBookingFor('relative')}>
                  <Text
                    style={[
                      styles.genderText,
                      bookingFor === 'relative' && styles.selectedBoxText,
                    ]}>
                    Your Relative
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Section>

          {/* Render Patient Details section only if 'your relative' is selected */}
          {bookingFor === 'relative' && (
            <Section styles={styles.patientDetails}>
              <TextComponent
                text="Patient Details"
                font="Poppins-Medium"
                size={20}
              />

              <TextComponent
                text="Full Name"
                font="Poppins-Regular"
                color="#000"
                size={14}
              />
              <Input
                clear
                styles={styles.input}
                value={fullName}
                onChange={text => setFullName(text)}
                placeholder="Full Name"
                placeholderColor="gray"
                inputStyles={{fontFamily: fontFamilies.regular, fontSize: 12}}
              />

              <View style={styles.pickerContainer}>
                <TextComponent
                  text="Age"
                  font="Poppins-Regular"
                  color="#000"
                  size={14}
                />
                <View style={styles.pickerWrapper}>
                  <Picker
                    mode="dialog"
                    selectedValue={age}
                    dropdownIconColor={'#000'}
                    dropdownIconRippleColor={'#21a691'}
                    style={[
                      styles.picker,
                      {fontFamily: fontFamilies.bold, color: '#000'},
                    ]}
                    itemStyle={{color: 'red', fontFamily: fontFamilies.bold}}
                    onValueChange={itemValue => setAge(itemValue)}>
                    {ageRanges.map((range, index) => (
                      <Picker.Item
                        label={range}
                        value={range}
                        key={index}
                        style={{
                          fontFamily: fontFamilies.regular,
                          color: '#fff',
                        }}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View>
                <TextComponent
                  text="Gender"
                  font="Poppins-Regular"
                  color="#000"
                  size={14}
                />
                <View style={styles.genderRow}>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === 'Male' && styles.selectedBox,
                    ]}
                    onPress={() => setGender('Male')}>
                    <Text
                      style={[
                        styles.genderText,
                        gender === 'Male' && styles.selectedBoxText,
                      ]}>
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === 'Female' && styles.selectedBox,
                    ]}
                    onPress={() => setGender('Female')}>
                    <Text
                      style={[
                        styles.genderText,
                        gender === 'Female' && styles.selectedBoxText,
                      ]}>
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Space height={10} />
            </Section>
          )}
        </>
        <Section>
          <TextInput
            style={styles.problemInput}
            value={problem}
            onChangeText={text => setProblem(text)}
            placeholder="Write your problem"
            multiline
            placeholderTextColor={'gray'}
          />
        </Section>
        {bookingFor === 'you' && <Space height={height * 0.18} />}
        <Section styles={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.setAppointmentButton}
            onPress={handleAddNewAppointment}>
            {isLoading ? (
              <ActivityIndicator color={'gray'} />
            ) : (
              <Text style={styles.setAppointmentButtonText}>
                Set Appointment
              </Text>
            )}
          </TouchableOpacity>
        </Section>
      </ContainerComponent>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: '#000',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#21a691',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  timeSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeBox: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
  },
  selectedBox: {
    backgroundColor: '#21a691',
  },
  selectedBoxText: {
    color: '#fff',
  },
  timeText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  patientDetails: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    fontFamily: 'Poppins-Regular',
  },
  pickerContainer: {
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10,
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  genderText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: '#000',
  },
  problemInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  setAppointmentButton: {
    width: '70%',
    backgroundColor: '#21a691',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  setAppointmentButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
  },
  disabledBox: {
    backgroundColor: '#ddd',
  },
  disabledText: {
    color: '#999',
  },
});

export default BookingScreen;
