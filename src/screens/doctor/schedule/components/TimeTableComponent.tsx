import {View, Text, Alert, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import TimeTable from '@mikezzb/react-native-timetable';
import {Schedule} from '../../../../models/Schedule';
import {FormatTime} from '../../../../utils/formatTime';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import WeekHeader from './TableHeader';
import {TextComponent} from '../../../../components';
import {Patient} from '../../../../models/Patient';
import EventModal from './EventModal';

interface EventProp {
  courseId: string;
  day: number;
  startTime: string;
  endTime: string;
  color?: string;
  title?: string;
  location?: string;
  section?: string;
  groupIndex?: number;
}

interface Props {
  selectedDate: Date;
  doctorId: string;
}

const TimeTableComponent = (props: Props) => {
  const {selectedDate, doctorId} = props;

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventProp | null>(null);

  const events = [
    {
      courseId: 'AIST3020',
      title: 'Intro to Computer Systems',
      section: '- - LEC',
      day: 2,
      startTime: '11:30',
      endTime: '12:15',
      location: 'Online Teaching',
      color: 'rgba(253,149,141,1)',
    },
    {
      courseId: 'AIST3020',
      title: 'Intro to Computer Systems',
      section: '- - LEC',
      day: 3,
      startTime: '16:30',
      endTime: '18:15',
      location: 'Online Teaching',
      color: 'rgba(253,149,141,1)',
    },
    {
      courseId: 'AIST3020',
      title: 'Intro to Computer Systems',
      section: '-L01 - LAB',
      day: 2,
      startTime: '16:30',
      endTime: '17:15',
      location: 'Online Teaching',
      color: 'rgba(253,149,141,1)',
    },
    {
      courseId: 'CSCI2100',
      title: 'Data Structures',
      section: 'A - LEC',
      day: 1,
      startTime: '16:30',
      endTime: '17:15',
      location: 'Online Teaching',
      color: 'rgba(241,153,40,1)',
    },
    {
      courseId: 'CSCI2100',
      title: 'Data Structures',
      section: 'A - LEC',
      day: 3,
      startTime: '14:30',
      endTime: '16:15',
      location: 'Online Teaching',
      color: 'rgba(241,153,40,1)',
    },
    {
      courseId: 'CSCI2100',
      title: 'Data Structures',
      section: 'AT02 - TUT',
      day: 4,
      startTime: '17:30',
      endTime: '18:15',
      location: 'Online Teaching',
      color: 'rgba(241,153,40,1)',
    },
    {
      courseId: 'ELTU2014',
      title: 'English for ERG Stds I',
      section: 'BEC1 - CLW',
      day: 2,
      startTime: '10:30',
      endTime: '11:15',
      location: 'Online Teaching',
      color: 'rgba(3,218,197,1)',
    },
    {
      courseId: 'ELTU2014',
      title: 'English for ERG Stds I',
      section: 'BEC1 - CLW',
      day: 4,
      startTime: '8:30',
      endTime: '10:15',
      location: 'Online Teaching',
      color: 'rgba(3,218,197,1)',
    },
    {
      courseId: 'ENGG2780',
      title: 'Statistics for Engineers',
      section: 'B - LEC',
      day: 1,
      startTime: '12:30',
      endTime: '14:15',
      location: 'Online Teaching',
      color: 'rgba(0,142,204,1)',
    },
    {
      courseId: 'ENGG2780',
      title: 'Statistics for Engineers',
      section: 'BT01 - TUT',
      day: 3,
      startTime: '12:30',
      endTime: '14:15',
      location: 'Online Teaching',
      color: 'rgba(0,142,204,1)',
    },
    {
      courseId: 'GESC1000',
      title: 'College Assembly',
      section: '-A01 - ASB',
      day: 5,
      startTime: '11:30',
      endTime: '13:15',
      location: 'Online Teaching',
      color: 'rgba(187,134,252,1)',
    },
    {
      courseId: 'UGEB1492',
      title: 'Data Expl - Stat in Daily Life',
      section: '- - LEC',
      day: 4,
      startTime: '14:30',
      endTime: '17:15',
      location: 'Lady Shaw Bldg LT5',
      color: 'rgba(102,204,255,1)',
    },
    {
      courseId: 'UGEC1685',
      title: 'Drugs and Culture',
      section: '- - LEC',
      day: 4,
      startTime: '11:30',
      endTime: '13:15',
      location: 'Lee Shau Kee Building LT5',
      color: 'rgba(255,111,199,1)',
    },
    {
      courseId: 'Eat!',
      title: 'No work on SUNDAY!',
      section: '',
      day: 7,
      startTime: '12:30',
      endTime: '13:15',
      location: 'Home',
      color: 'rgba(50,144,144,1)',
    },
    {
      courseId: 'Manga!',
      title: '',
      section: '',
      day: 6,
      startTime: '16:30',
      endTime: '19:15',
      location: 'Home',
      color: 'rgba(211,124,177,1)',
    },
  ];

  useEffect(() => {
    setStartDate(FormatTime.getStartOfWeek(selectedDate));
    setEndDate(FormatTime.getEndOfWeek(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    // Thiết lập ngày bắt đầu và kết thúc, đặt giờ là 0 để so sánh chính xác
    const start = new Date(startDate.setHours(0, 0, 0, 0));
    const end = new Date(endDate.setHours(0, 0, 0, 0));

    // Lấy các thông tin về năm, tháng, ngày từ startDate và endDate để so sánh
    const yearStart = start.getFullYear();
    const monthStart = start.getMonth();
    const dateStart = start.getDate();
    const dateEnd = end.getDate();

    if (doctorId) {
      // Đăng ký listener để lấy danh sách lịch trình từ Firestore
      const unsubscribeSchedule = firestore()
        .collection('schedules')
        .where('doctorId', '==', doctorId)
        .onSnapshot(
          async snapshot => {
            // Xử lý snapshot: Lấy danh sách lịch trình từ Firestore
            const schedulePromises = snapshot.docs.map(async (doc: any) => {
              const data = doc.data() as Schedule;
              const date = data.availableDate; // type: timestamp
              const dateObject = new Date((date as Timestamp).seconds * 1000);

              // Lấy ngày, tháng, năm từ availableDate để so sánh với khoảng ngày được chọn
              const availableDate = dateObject.getDate();
              const availableMonth = dateObject.getMonth();
              const availableYear = dateObject.getFullYear();

              if (
                monthStart === availableMonth &&
                yearStart === availableYear &&
                dateStart <= availableDate &&
                dateEnd >= availableDate
              ) {
                let patient = await getPatientNameBySchedule(data);
                let color = 'rgba(29, 153, 62, 1)';
                if (patient === '') {
                  patient = 'Free Time';
                  color = 'rgba(0,142,204,1)';
                }

                // Tạo sự kiện (event) từ lịch trình hiện tại
                const event: EventProp = {
                  courseId: data.scheduleId.toUpperCase(),
                  day: new Date(dateObject).getDay() + 1,
                  startTime: FormatTime.formatAvailableDate(
                    new Date((data.startTime as Timestamp).seconds * 1000),
                  ),
                  endTime: FormatTime.formatAvailableDate(
                    new Date((data.endTime as Timestamp).seconds * 1000),
                  ),
                  location: patient,
                  title: patient,
                  color: color,
                };
                // Trả về đối tượng chứa lịch trình và sự kiện
                return {schedule: {id: doc.id, ...data}, event};
              }
              return null; // Loại bỏ các lịch không hợp lệ
            });
            // Xử lý tất cả các promise trong danh sách schedulePromises đồng thời
            const resolvedSchedules = (
              await Promise.all(schedulePromises)
            ).filter(
              result => result !== null, // Loại bỏ các lịch trình không hợp lệ
            ) as {
              schedule: Schedule;
              event: EventProp;
            }[];

            setScheduleList(resolvedSchedules.map(item => item.schedule));
            setEventList(resolvedSchedules.map(item => item.event));
          },
          error => {
            console.log('Error fetching schedules: ', error);
          },
        );
      // Hủy đăng ký listener khi component unmount hoặc khi các dependency thay đổi
      return () => {
        unsubscribeSchedule();
      };
    }
  }, [startDate, endDate, doctorId]);

  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
  const [eventList, setEventList] = useState<EventProp[]>([]);

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

  const handleScroll = (event: any) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: event.nativeEvent.contentOffset.x,
        animated: false,
      });
    }
  };

  const handleEventPress = (event: EventProp) => {
    setCurrentEvent(event);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentEvent(null);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <WeekHeader date={selectedDate} />
      </ScrollView>
      <ScrollView horizontal onScroll={handleScroll} scrollEventThrottle={16}>
        <TimeTable
          disableHeader
          events={eventList.length > 0 ? eventList : events}
          eventOnPress={handleEventPress}
          contentContainerStyle={{
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '',
          }}
          theme={{
            text: 'gray',
            accent: '#ff9800',
          }}
          headerStyle={{
            height: 50,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        />
      </ScrollView>
      <EventModal
        visible={isModalVisible}
        onClose={closeModal}
        event={currentEvent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5', // Màu nền
    borderBottomWidth: 1,
    borderColor: '#ddd', // Đường kẻ dưới
  },
  headerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default TimeTableComponent;
