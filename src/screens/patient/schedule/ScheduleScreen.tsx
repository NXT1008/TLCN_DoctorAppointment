import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import {Row, Section} from '../../../components';
import {ArrowLeft2} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

interface Appointment {
    time: string;
    patientName: string;
    appointmentType: string;
}

interface DailySchedule {
    date: string;
    appointments: Appointment[];
}


const schedules: DailySchedule[] = [
    {
        date: 'Friday, October 18, 2024',
        appointments: [
            { time: '09:00 AM', patientName: 'John Doe', appointmentType: 'Consultation' },
            { time: '10:00 AM', patientName: 'Jane Smith', appointmentType: 'Follow-up' },
            { time: '12:00 PM', patientName: 'Peter Parker', appointmentType: 'Consultation' },
        ],
    },
    {
        date: 'Monday, October 21, 2024',
        appointments: [
            { time: '09:00 AM', patientName: 'John Doe', appointmentType: 'Consultation' },
            { time: '10:00 AM', patientName: 'Jane Smith', appointmentType: 'Follow-up' },
            { time: '12:00 PM', patientName: 'Peter Parker', appointmentType: 'Consultation' },
        ],
    },
    {
        date: 'Tuesday, October 22, 2024',
        appointments: [
            { time: '10:00 AM', patientName: 'Mary Jane', appointmentType: 'Check-up' },
            { time: '01:30 PM', patientName: 'Bruce Wayne', appointmentType: 'Consultation' },
        ],
    },
    {
        date: 'Wednesday, October 23, 2024',
        appointments: [],
    },
    {
        date: 'Thursday, October 24, 2024',
        appointments: [
            { time: '09:00 AM', patientName: 'Clark Kent', appointmentType: 'Consultation' },
        ],
    },
    {
        date: 'Friday, October 25, 2024',
        appointments: [
            { time: '08:30 AM', patientName: 'Diana Prince', appointmentType: 'Consultation' },
            { time: '12:30 PM', patientName: 'Barry Allen', appointmentType: 'Follow-up' },
        ],
    },
    {
        date: 'Saturday, October 26, 2024',
        appointments: [
            { time: '09:00 AM', patientName: 'Clark Kent', appointmentType: 'Consultation' },
            { time: '10:00 AM', patientName: 'Clark Kent', appointmentType: 'Consultation' },
        ],
    },
    {
        date: 'Sunday, October 27, 2024',
        appointments: [
            { time: '10:00 AM', patientName: 'Bruce Wayne', appointmentType: 'Check-up' },
        ],
    },
];

const availableTimes = ['09:00 AM', '09:30 AM', '10:00 AM', '12:00 PM', '12:30 PM', '01:30 PM', '03:00 PM', '04:30 PM', '05:00 PM'];

const { height, width } = Dimensions.get('window');

const ScheduleScreen = () => {
    const navigation = useNavigation()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    const onChange = (event: any, date?: Date | undefined) => {
        setShowPicker(false);
        if (date) {
            setSelectedDate(date);
        }
    };

    const getFormattedDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const getShortFormattedDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`; 
    };

    const getWeeklySchedules = () => {
        const currentDay = selectedDate.getDay();
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - currentDay);

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return schedules.find(schedule => schedule.date === getFormattedDate(date)) || { date: getFormattedDate(date), appointments: [] };
        });
    };

    const goToNextWeek = () => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
        });
    };

    const goToPreviousWeek = () => {
        setSelectedDate(prevDate => {
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
        return endOfWeek
    };

    const weeklySchedules = getWeeklySchedules();

    const abbreviateDay = (dateString: string): string => {
        const day = dateString.split(',')[0];
        switch (day) {
            case 'Monday':
                return 'Mon';
            case 'Tuesday':
                return 'Tue';
            case 'Wednesday':
                return 'Wed';
            case 'Thursday':
                return 'Thu';
            case 'Friday':
                return 'Fri';
            case 'Saturday':
                return 'Sat';
            case 'Sunday':
                return 'Sun';
            default:
                return day;
        }
    };

    return (
        <View style={styles.container}>
            <Section styles={styles.header}>
                <Row justifyContent='space-around'>
                    <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Doctor's Weekly Schedule</Text>
                </Row>
            </Section>
            <View style={styles.dateHeader}>
            <TouchableOpacity onPress={goToPreviousWeek}>
                    <Icon name="arrow-back" size={24} color="#21a691" />
                </TouchableOpacity>
                <Text style={styles.selectedDate}>{getShortFormattedDate(getStartOfWeek(selectedDate))} - {getShortFormattedDate(getEndOfWeek(selectedDate))}</Text>
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                    <Icon name="calendar-outline" size={24} color="#21a691" />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToNextWeek}>
                    <Icon name="arrow-forward" size={24} color="#21a691" />
                </TouchableOpacity>
            </View>
            {showPicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <View style={styles.headerCell}>
                            <Text style={styles.text}>Time</Text>
                        </View>
                        {weeklySchedules.map((schedule, index) => (
                            <View key={index} style={styles.headerCell}>
                                <Text style={styles.text}>{abbreviateDay(schedule.date)}</Text>
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
                                    const appointment = schedule.appointments.find(app => app.time === timeSlot);
                                    return (
                                        <View
                                            key={index}
                                            style={styles.cell}
                                        >
                                            <Text style={appointment ? styles.cellText : styles.emptyCellText}>
                                                {appointment ? appointment.patientName : '-'}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
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
        fontFamily: 'Poppins-Bold'
    },
    dateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    selectedDate: {
        fontSize: 18,
        fontWeight: 'bold',
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
        padding: 10,
    },
    headerCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
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
        padding: 5,
        width: 60, // Width for time column
        backgroundColor: '#e7f3ff',
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
        height: '100%', 
    },
    cellText: {
        textAlign: 'center',
    },
    emptyCellText: {
        textAlign: 'center',
        color: 'grey',
    },
    appointmentCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
        height: '100%', 
        backgroundColor: '#c8e6c9', 
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
});

export default ScheduleScreen;
