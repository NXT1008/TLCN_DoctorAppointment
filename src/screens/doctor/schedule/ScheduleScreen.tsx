import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Row, Section} from '../../../components';
import Container from '../../../components/ContainerComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Doctor} from '../../../models/Doctor';
import {Patient} from '../../../models/Patient';
import {Schedule} from '../../../models/Schedule';
// import Timetable from 'react-native-calendar-timetable';
import {FormatTime} from '../../../utils/formatTime';
import TimeTable from '@mikezzb/react-native-timetable';
import {Alert} from 'react-native';
import TimeTableComponent from './components/TimeTableComponent';

const availableTimes = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

const {height, width} = Dimensions.get('window');

const ScheduleScreen = () => {
  const user = auth().currentUser;
  const [doctor, setDoctor] = useState<Doctor>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]); // workingtime on a day of doctor
  const [patientNames, setPatientNames] = useState<string[]>([]);

  //------
  const [showCalendar, setShowCalendar] = useState(false);
  //const [weeklySchedules, setWeeklySchedules] = useState<DailySchedule[]>([]);

  // get info doctor
  useEffect(() => {
    const unsubscribeDoctor = firestore()
      .collection('doctors')
      .where('email', '==', user?.email)
      .onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            const doctorData = snapshot.docs[0].data() as Doctor;
            setDoctor(doctorData);
          }
        },
        error => {
          console.log('Error listening to doctor changes:', error);
        },
      );

    return () => {
      unsubscribeDoctor();
    };
  }, []);

  // useEffect để lấy lịch hẹn theo tuần
  useEffect(() => {
    const start = new Date(startDate.setHours(0, 0, 0, 0));
    const end = new Date(endDate.setHours(0, 0, 0, 0));

    const yearStart = start.getFullYear();
    const monthStart = start.getMonth();
    const dateStart = start.getDate();
    const dateEnd = end.getDate();

    if (doctor) {
      const unsubscribeSchedule = firestore()
        .collection('schedules')
        .where('doctorId', '==', doctor.doctorId)
        .onSnapshot(
          snapshot => {
            const items: Schedule[] = [];
            snapshot.forEach((doc: any) => {
              const data = doc.data();
              const date = data.availableDate; // type: timestamp
              const dateObject = new Date(date.seconds * 1000);

              // Lấy ngày, tháng, năm từ đối tượng ngày
              const availableDate = dateObject.getDate();
              const availableMonth = dateObject.getMonth();
              const availableYear = dateObject.getFullYear();

              if (
                monthStart === availableMonth &&
                yearStart === availableYear &&
                dateStart <= availableDate &&
                dateEnd >= availableDate
              ) {
                items.push({
                  id: doc.id,
                  ...data,
                });
              }
            });
            setScheduleList(items);
          },
          error => {
            console.log('Error fetching schedules: ', error);
          },
        );

      return () => {
        unsubscribeSchedule();
      };
    }
  }, [doctor, startDate, endDate]);

  useEffect(() => {
    setStartDate(FormatTime.getStartOfWeek(selectedDate));
    setEndDate(FormatTime.getEndOfWeek(selectedDate));
  }, [selectedDate]);

  // useEffect để lấy tên bệnh nhân cho mỗi cuộc hẹn
  useEffect(() => {
    const fetchPatientNames = async () => {
      const names: string[] = []; // Mảng để lưu trữ tên bệnh nhân
      for (const item of scheduleList) {
        const name = await getPatientNameBySchedule(item);
        names.push(name); // Thêm tên bệnh nhân vào mảng
      }
      setPatientNames(names); // Cập nhật state với mảng tên bệnh nhân
    };

    if (scheduleList.length > 0) {
      fetchPatientNames();
    }
  }, [scheduleList]);

  const getPatientNameBySchedule = async (schedule: Schedule) => {
    const appointmentSnap = await firestore()
      .collection('appointments')
      .where('scheduleId', '==', schedule.scheduleId)
      .get();
    if (!appointmentSnap.empty) {
      const patientId = appointmentSnap.docs[0].data().patientId;
      if (patientId) {
        const patientSnap = await firestore()
          .collection('patients')
          .doc(patientId)
          .get();
        if (patientSnap.exists) {
          const tmp = patientSnap.data() as Patient;
          return tmp.name; // Trả về tên bệnh nhân
        }
      }
    }
    return ''; // Trả về chuỗi rỗng nếu không tìm thấy
  };

  // chuyển sang tuần tiếp theo
  const goToNextWeek = () => {
    setSelectedDate((prevDate: Date) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  // chuyển sang tuần trước
  const goToPreviousWeek = () => {
    setSelectedDate((prevDate: Date) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  // Thêm mảng các ngày trong tuần cố định
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // 13:00
  //console.log(FormatTime.formatAvailableDate(new Date()))
  //console.log(convertTo12HourFormat(new Date())) // 08:00 AM
  ///-------------------

  return (
    <Container
      isScroll
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      }}>
      <Section
        styles={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <Row justifyContent="space-around">
          <Text style={styles.headerText}>Doctor's Weekly Schedule</Text>
        </Row>
      </Section>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={goToPreviousWeek}>
          <Icon name="arrow-back" size={24} color="#21a691" />
        </TouchableOpacity>
        <Text style={styles.selectedDate}>
          {FormatTime.getShortFormattedDate(
            FormatTime.getStartOfWeek(new Date(selectedDate)),
          )}{' '}
          -{' '}
          {FormatTime.getShortFormattedDate(
            FormatTime.getEndOfWeek(new Date(selectedDate)),
          )}
        </Text>
        <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
          <Icon name="calendar-outline" size={24} color="#21a691" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNextWeek}>
          <Icon name="arrow-forward" size={24} color="#21a691" />
        </TouchableOpacity>
      </View>

      <Section
        styles={{
          marginTop: 16,
          marginHorizontal: -16,
          marginBottom: !showCalendar ? -16 : 0,
        }}>
        {showCalendar && (
          <Calendar
            onDayPress={(day: any) => {
              setSelectedDate(new Date(day.dateString));
              setStartDate(FormatTime.getStartOfWeek(new Date(day.dateString)));
              setEndDate(FormatTime.getEndOfWeek(new Date(day.dateString)));
              setShowCalendar(false);
            }}
            markedDates={{
              [selectedDate.toISOString()]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: '#00adf5',
              },
            }}
            theme={{
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#000', // màu của thứ trong tuần
              selectedDayBackgroundColor: '#00adf5', // màu nền ngày đã chọn
              selectedDayTextColor: '#ffffff', // màu chữ ngày đã chọn
              todayTextColor: '#00adf5', // màu chữ ngày hiện tại trên lịch
              dayTextColor: '#2d4150', // màu chữ ngày trong tuần
              textDisabledColor: '#d9e1e8', // màu chữ ngày đã qua
              dotColor: '#00adf5', // màu của dấu chấm ngày hiện tại
              selectedDotColor: '#ffffff', // màu của dấu chấm ngày đã chọn
              arrowColor: '#0800ff', // màu của mũi tên
              arrowStyle: {
                width: 40, // Chỉnh chiều rộng của mũi tên
                height: 40, // Chỉnh chiều cao của mũi tên
                borderRadius: 100, // Giới hạn mũi tên thành hình tròn (tùy chọn)
                borderWidth: 1,
                borderColor: '#0073ff',
                alignItems: 'center',
                justifyContent: 'center',
              },
              monthTextColor: 'blue', // màu chữ tháng
              indicatorColor: 'blue', // màu của thanh chỉ số
              textDayFontFamily: fontFamilies.regular, // font chữ ngày
              textMonthFontFamily: fontFamilies.semiBold, // font chữ tháng
              textDayHeaderFontFamily: fontFamilies.semiBold, // font chữ thứ trong tuần
              textDayFontSize: 16, // kích thước chữ ngày
              textMonthFontSize: 18, // kích thước chữ tháng
              textDayHeaderFontSize: 13, // kích thước chữ thứ trong tuần
            }}
            firstDay={0}
            style={{
              borderRadius: 10,
              backgroundColor: '#88d0db',
            }}
            current={selectedDate.toISOString()}
            enableSwipeMonths={true}
            headerStyle={{
              backgroundColor: '#88d0db', // Màu nền của Header
            }}
          />
        )}
      </Section>

      <View style={{paddingTop: 20, paddingHorizontal: 5}}>
        <TimeTableComponent
          selectedDate={selectedDate}
          doctorId={doctor ? doctor.doctorId : ''}
        />
      </View>

      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <View style={[styles.headerCell, {width: 60}]}>
              <Text style={styles.text}>Time</Text>
            </View>
            {weekDays.map((day, index) => (
              <View key={index} style={[styles.headerCell]}>
                <Text style={[styles.text]}>{day}</Text>
              </View>
            ))}
          </View>

          <View style={styles.tableBody}>
            {availableTimes.map((timeSlot, timeIndex) => (
              <View key={timeIndex} style={styles.tableRow}>
                <View style={styles.timeCell}>
                  <Text style={styles.cellText}>{timeSlot}</Text>
                </View>
                {scheduleList.length > 0
                  ? scheduleList.map((item, index) => {
                      const patientName = patientNames[index] || ''; // Lấy tên bệnh nhân từ state
                      const scheduleStartTime = FormatTime.formatAvailableDate(
                        item.startTime,
                      ); // Định dạng thời gian bắt đầu
                      const scheduleEndTime = FormatTime.formatAvailableDate(
                        item.endTime,
                      ); // Định dạng thời gian kết thúc

                      // Kiểm tra xem khung giờ có trùng với lịch hẹn không
                      const isTimeSlotMatched = timeSlot === scheduleStartTime;

                      return (
                        <View key={index} style={styles.cell}>
                          <Text
                            style={
                              isTimeSlotMatched && patientName !== ''
                                ? styles.cellText
                                : styles.emptyCellText
                            }>
                            {isTimeSlotMatched && patientName !== ''
                              ? patientName.split(' ').pop()
                              : '-'}
                          </Text>
                        </View>
                      );
                    })
                  : Array.from({length: 6}, (_, index) => (
                      <View key={index} style={styles.cell}>
                        <Text style={styles.emptyCellText}>{'-'}</Text>
                      </View>
                    ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView> */}
      
    </Container>
  );
};

const styles = StyleSheet.create({
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
  selectedDate: {
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    color: '#000',
  },
  tableContainer: {
    width: width * 1.1,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#21a691',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#E3F2FD',
    alignSelf: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#8ac6e6',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#00a2fa',
  },
  headerCell: {
    width: (width * 1.1 - 60) / 6, // Điều chỉnh độ rộng để phù hợp với các cột
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#00a2fa',
  },
  text: {
    textAlign: 'center',
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
  },
  tableBody: {
    paddingBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 60,
  },
  timeCell: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 60, // Width for time column
    backgroundColor: '#e7f3ff',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  cell: {
    width: (width * 1.1 - 60) / 6, // Điều chỉnh độ rộng để phù hợp với header
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    height: '100%',
  },
  cellText: {
    textAlign: 'center',
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    color: '#000',
  },
  emptyCellText: {
    textAlign: 'center',
    color: 'gray',
  },
  appointmentCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    height: '100%',
    backgroundColor: 'red',
  },
  noAppointmentCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    height: '100%',
  },
  pastAppointmentCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    backgroundColor: '#f8d7da',
  },
  currentOrFutureAppointmentCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    backgroundColor: '#ffffff',
  },
  headerCellWithAppointment: {
    backgroundColor: '#21a691',
  },
  textWithAppointment: {
    color: '#ffffff',
    fontFamily: fontFamilies.bold,
  },
});

export default ScheduleScreen;
