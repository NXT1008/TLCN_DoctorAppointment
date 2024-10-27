import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { ContainerComponent, Input, Row, Section, TextComponent } from '../../components';
import { ArrowLeft2 } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { fontFamilies } from '../../constants/fontFamilies';
import { Picker } from '@react-native-picker/picker';
import DateTime from '../../components/DateTimePicker';

const BookingScreen = (props: any) => {
    const navigation = useNavigation()
    const [selectedTime, setSelectedTime] = useState<string>('12:30 PM')
    const [fullName, setFullName] = useState<string>('')
    const [age, setAge] = useState<string>('26 - 30')
    const [gender, setGender] = useState<string>('Male')
    const [problem, setProblem] = useState<string>('')

    const availableTimes = ['09:00 AM', '09:30 AM', '10:00 AM', '12:00 PM', '12:30 PM', '01:30 PM', '03:00 PM', '04:30 PM', '05:00 PM'];
    const ageRanges = ['18 - 25', '26 - 30', '31 - 40', '41 - 50', '51 - 60', '60+'];

    return (
        <ContainerComponent isScroll>

            <Section styles={styles.header}>
                <Row justifyContent='space-around'>
                    <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>New Appointment</Text>
                </Row>
            </Section>


            <View>
                <DateTime/>
            </View>
           
       
            <Section styles={styles.timeSection}>
                <TextComponent
                    text='Available Time'
                    font='Poppins-Medium'
                    size={20} />
                <View style={styles.timeRow}>
                    {availableTimes.map((time) => (
                        <TouchableOpacity
                            key={time}
                            style={[styles.timeBox, selectedTime === time && styles.selectedBox]}
                            onPress={() => setSelectedTime(time)}
                        >
                            <Text style={[styles.timeText, selectedTime === time && styles.selectedBoxText]}>{time}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Section>


            <Section styles={styles.patientDetails}>
                <TextComponent
                    text='Patient Details'
                    font='Poppins-Medium'
                    size={20} />
                <TextComponent
                    text='Full Name'
                    font='Poppins-Regular'
                    color='#000'
                    size={14}
                />
                <Input
                    styles={styles.input}
                    value={fullName}
                    onChange={(text) => setFullName(text)}
                    placeholder="Full Name"
                    inputStyles={{ fontFamily: fontFamilies.regular, fontSize: 12 }}
                />
                <View style={styles.pickerContainer}>
                    <TextComponent
                        text='Age'
                        font='Poppins-Regular'
                        color='#000'
                        size={14}
                    />
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={age}
                            style={styles.picker}
                            itemStyle={{color:'#000'}}
                            onValueChange={(itemValue) => setAge(itemValue)}
                        >
                            {ageRanges.map((range, index) => (
                                <Picker.Item label={range} value={range} key={index} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View>
                    <TextComponent
                        text='Gender'
                        font='Poppins-Regular'
                        color='#000'
                        size={14}
                    />
                    <View style={styles.genderRow}>

                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'Male' && styles.selectedBox]}
                            onPress={() => setGender('Male')}
                        >
                            <Text style={[styles.genderText, gender === 'Male' && styles.selectedBoxText]}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'Female' && styles.selectedBox]}
                            onPress={() => setGender('Female')}
                        >
                            <Text style={[styles.genderText, gender === 'Female' && styles.selectedBoxText]}>Female</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TextInput
                    style={styles.problemInput}
                    value={problem}
                    onChangeText={(text) => setProblem(text)}
                    placeholder="Write your problem"
                    multiline

                />
            </Section>


            <TouchableOpacity 
            style={styles.setAppointmentButton} 
            onPress={() => props.navigation.navigate('Payment')}>
                <Text style={styles.setAppointmentButtonText}>Set Appointment</Text>
            </TouchableOpacity>
        </ContainerComponent >
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
        fontSize: 18,
        color: '#21a691',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins-Bold'
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
        color: "#fff"
    },
    timeText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Poppins-Regular'
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
        fontFamily: 'Poppins-Regular'
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
    },
    picker: {
        height: 50,
        width: '100%',
    },
    genderRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10
    },
    genderButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },

    genderText: {
        fontSize: 16,
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
        fontFamily: 'Poppins-Regular'
    },
    setAppointmentButton: {
        backgroundColor: '#21a691',
        borderRadius: 20,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    setAppointmentButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookingScreen;
