import React, { useEffect, useState } from 'react';
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
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { Row, Section } from '../../../components';
import Container from '../../../components/ContainerComponent';
import { fontFamilies } from '../../../constants/fontFamilies';
import { Doctor } from '../../../models/Doctor';
import { Patient } from '../../../models/Patient';
import { Schedule } from '../../../models/Schedule';
import Timetable from 'react-native-calendar-timetable'

interface Appointment {
  time: Date;
  patientName: string;
  appointmentType: string;
}

interface DailySchedule {
  date: Date;
  appointments: Appointment[];
}

const schedules: DailySchedule[] = [
  {
    date: new Date('2024-11-15'),
    appointments: [
      {
        time: new Date('2024-11-15T09:00:00'),
        patientName: 'John Doe',
        appointmentType: 'Consultation',
      },
      {
        time: new Date('2024-11-15T10:00:00'),
        patientName: 'Jane Smith',
        appointmentType: 'Follow-up',
      },
      {
        time: new Date('2024-11-15T12:00:00'),
        patientName: 'Peter Parker',
        appointmentType: 'Consultation',
      },
    ],
  },
];

const availableTimes = [
  '09:00',
  '09:30',
  '10:00',
  '12:00',
  '12:30',
  '13:30',
  '15:00',
  '16:30',
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
  const [patientName, setPatientName] = useState('');

  //------
  const [showCalendar, setShowCalendar] = useState(false);
  const [weeklySchedules, setWeeklySchedules] = useState<DailySchedule[]>([]);

  // get info doctor
  useEffect(() => {
    // Tạo listener cho thông tin doctor theo email đã login
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

  // useEffect get schedule by date
  useEffect(() => {
    handleGetScheduleByTime();
  }, [selectedDate]);

  const handleGetScheduleByTime = async () => {
    const start = new Date(startDate.setHours(0, 0, 0, 0));
    const end = new Date(endDate.setHours(0, 0, 0, 0));

    const yearStart = start.getFullYear();
    const monthStart = start.getMonth();
    const dateStart = start.getDate();

    const dateEnd = end.getDate();

    if (doctor) {
      //console.log(day + "/" + month + "/" + year)
      await firestore()
        .collection('schedules')
        .where('doctorId', '==', doctor.doctorId)
        .get()
        .then(snap => {
          if (snap.empty) {
            console.log('No schedules found for this doctor.');
          } else {
            const items: Schedule[] = [];
            snap.forEach((doc: any) => {
              const data = doc.data();
              const date = data.availableDate; // type: timestamp
              // change second -> milliseconds
              const dateObject = new Date(date.seconds * 1000);

              //get day, month and year from date object
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
            const timetableItems = transformSchedulesToTimetableItems(items);
            setItems(timetableItems);
          }
        })
        .catch(error => {
          console.log('Error fetching data: ', error);
        });
    }
  };

  const getPatientNameBySchedule = async (schedule: Schedule) => {
    const appointmentSnap = await firestore()
      .collection('appointments')
      .where('scheduleId', '==', schedule.scheduleId)
      .get();
    if (!appointmentSnap.empty) {
      const patientId = appointmentSnap.docs[0].data().patientId;
      if (patientId) {
        await firestore()
          .collection('patients')
          .doc(patientId)
          .get()
          .then(snap => {
            if (snap.exists) {
              const tmp = snap.data() as Patient;
              setPatientName(tmp.name);
              console.log(tmp);
            }
          });
      }
    }
  };

  // format date to dd/mm/yyyy để hiển thị lên lịch
  const getFormattedDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // format date to dd/mm/yyyy để hiển thị lên lịch
  const getShortFormattedDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Lấy lịch trình tuần hiện tại
  const getWeeklySchedules = () => {
    const currentDay = new Date(selectedDate).getDay(); // lấy thứ hiện tại
    const startOfWeek = new Date(selectedDate); // lấy ngày hiện tại
    startOfWeek.setDate(new Date(selectedDate).getDate() - currentDay); // đặt ngày đầu tuần

    // lấy ra 7 ngày trong tuần
    return Array.from({length: 7}, (_, i) => {
      const date = new Date(startOfWeek); // lấy ngày đầu tuần
      date.setDate(startOfWeek.getDate() + i); // đặt ngày hiện tại
      const formattedDate = getFormattedDate(date); // lấy ra ngày hiện tại

      // Tìm lịch trình cho ngày này trong mảng schedules
      const scheduleForDay = schedules.find(schedule => {
        // Chuyển đổi chuỗi ngày từ schedule thành đối tượng Date để so sánh
        const scheduleDate = new Date(schedule.date);
        const currentDate = new Date(date);
        return scheduleDate.toDateString() === currentDate.toDateString();
      });
      return scheduleForDay || {date: formattedDate, appointments: []};
    });
  };

  useEffect(() => {
    // Tính toán lại lịch trình khi `selectedDate` thay đổi
    const newWeeklySchedules = getWeeklySchedules();
    setWeeklySchedules(newWeeklySchedules as DailySchedule[]);
  }, [selectedDate]); // Chạy lại khi `selectedDate` thay đổi

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

  const getStartOfWeek = (date: Date): Date => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek;
  };

  const getEndOfWeek = (date: Date): Date => {
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
    return endOfWeek;
  };

  // Thêm mảng các ngày trong tuần cố định
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const convertTo12HourFormat = (time: Date) => {
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12; // Convert hour to 12-hour format
    const hourWithPrefix = hour12 < 10 ? '0' + hour12 : hour12; // Add prefix 0 if hour < 10
    const minute = minutes < 10 ? '0' + minutes : minutes;
    return `${hourWithPrefix}:${minute} ${ampm}`;
  };

  // Chuyển đổi dữ liệu thành format của Timetable
  // const timetableItems = scheduleList.flatMap((schedule, dayIndex) => {
  //   return schedule.map(appointment => ({
  //     startDate: `2024-11-${dayIndex + 13}T${appointment.time}`,
  //     endDate: `2024-11-${dayIndex + 13}T${appointment.time}`, // endDate có thể cộng thêm 30 phút
  //     title: 'aaa',
  //     day: schedule,
  //   }));
  // });

  ///-------------------
  const [from] = React.useState(moment().subtract(3, 'days').toDate());
  const [till] = React.useState(moment().add(3, 'days').toDate());
  const range = {from, till};

  const [items, setItems] = useState<any[]>([]);
  function transformSchedulesToTimetableItems(schedules: Schedule[]) {
    return schedules.map(schedule => ({
      key: schedule.scheduleId,
      startDate: new Date(),
      // (schedule.availableDate as Date).getFullYear(),
      // (schedule.availableDate as Date).getMonth(),
      // (schedule.availableDate as Date).getDate(),
      // schedule.startTime.getHours(),
      // schedule.startTime.getMinutes(),
      endDate: new Date(),
      // (schedule.availableDate as Date).getFullYear(),
      // (schedule.availableDate as Date).getMonth(),
      // (schedule.availableDate as Date).getDate(),
      // schedule.endTime.getHours(),
      // schedule.endTime.getMinutes(),
      data: schedule, // Lưu dữ liệu gốc nếu cần dùng thêm
    }));
  }

  return (
    <Container
      isScroll
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      }}>
      <ScrollView>
        {/* <Timetable
          style={{
            container: {backgroundColor: '#f5f5f5'},
            headersContainer: {
              backgroundColor: '#ffffff',
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            },
            contentContainer: {padding: 10},
            time: {color: '#333', fontWeight: 'bold'},
            lines: {borderColor: '#ddd', borderBottomWidth: 1},
          }}
          items={items}
          renderHeader={day => (
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>
                {weekDays[day.date.getDay()]}
              </Text>
            </View>
          )}
          renderItem={item => (
            <View
              key={item.key}
              style={[styles.cell, {backgroundColor: '#e1f5fe'}]}>
              <Text style={styles.cellText}>{item.data}</Text>
            </View>
          )}
          timeWidth={60} // Tăng độ rộng cột thời gian
          hourHeight={60} // Giảm chiều cao mỗi giờ để hiển thị gọn hơn
          columnHorizontalPadding={10} // Khoảng cách giữa các cột
          date={new Date('2024-11-13')}
          fromHour={8}
          toHour={18}
        /> */}
        {/* <Timetable
          items={scheduleList}
          renderItem={({item}) => (
            <View
              key={item.key || item.data.id || item.data.startTime}
              style={{
                backgroundColor: 'red'
              }}>
              <TextComponent text="aaaa" color="#000" />
              <Text>{`Start: ${item.data.startTime}`}</Text>
              <Text>{`End: ${item.data.endTime}`}</Text>
            </View>
          )}
          range={{
            from: new Date('2024-11-01T00:00:00'), // Ngày bắt đầu
            till: new Date('2024-11-05T23:59:59'), // Ngày kết thúc
          }}
        /> */}
      </ScrollView>
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
          {getShortFormattedDate(getStartOfWeek(new Date(selectedDate)))} -{' '}
          {getShortFormattedDate(getEndOfWeek(new Date(selectedDate)))}
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
              setStartDate(getStartOfWeek(new Date(day.dateString)));
              setEndDate(getEndOfWeek(new Date(day.dateString)));
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                {weeklySchedules.map((schedule, index) => {
                  const appointment = schedule.appointments.find(app => {
                    const time = convertTo12HourFormat(app.time);

                    return time === timeSlot;
                  });
                  return (
                    <View key={index} style={styles.cell}>
                      <Text
                        style={
                          appointment ? styles.cellText : styles.emptyCellText
                        }>
                        {appointment
                          ? appointment.patientName.slice(0, 10)
                          : '-'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
    padding: 5,
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
