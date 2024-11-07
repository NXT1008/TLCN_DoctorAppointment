import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '../../components/DateTimePicker';
import { ArrowLeft2 } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';

// Sample Patient Data
const patientData = {
    patientId: "123456",
    name: "Celeste Lim",
    nickname: "Celeste",
    gender: "Female",
    dateOfBirth: "March 9, 2015",
    age: "7y, 8mos",
    location: "St Rita Ward",
    nationality: "Filipino",
    race: "Chinese",
    email: "celeste.lim@example.com",
    phone: "+1 234 567 890",
    image: "https://example.com/path-to-image.jpg",
    allergies: "N.A.",
    medicalAlerts: "N.A.",
};

const DoctorReportScreen = () => {
    const navigation = useNavigation()
    const [admissionDetails, setAdmissionDetails] = useState('');
    const [dischargeDate, setDischargeDate] = useState(new Date());
    const [conditionAtDischarge, setConditionAtDischarge] = useState('');

    useEffect(() => {
        setDischargeDate(new Date());
    }, []);

    const handleSubmit = () => {
        console.log('Discharge Date:', dischargeDate);
        console.log('Condition at Discharge:', conditionAtDischarge);
        console.log('Admission Details:', admissionDetails);
        // Additional code for form submission can go here
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft2 color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Medical Report</Text>
            </View>
            <View style={styles.profileSection}>
                <Image source={require('../../assets/images/doctor.png')} style={styles.profileImage} />
                <Text style={styles.patientName}>{patientData.name}</Text>
            </View>

            {/* Patient Demographics Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Patient Demographics</Text>
                <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>ID No:</Text>
                    <Text style={styles.cardValue}>{patientData.patientId}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Gender:</Text>
                    <Text style={styles.cardValue}>{patientData.gender}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Date of Birth:</Text>
                    <Text style={styles.cardValue}>{patientData.dateOfBirth}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Age:</Text>
                    <Text style={styles.cardValue}>{patientData.age}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Location:</Text>
                    <Text style={styles.cardValue}>{patientData.location}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Nationality:</Text>
                    <Text style={styles.cardValue}>{patientData.nationality}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Race:</Text>
                    <Text style={styles.cardValue}>{patientData.race}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Allergies:</Text>
                    <Text style={styles.cardValue}>{patientData.allergies}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Medical Alerts:</Text>
                    <Text style={styles.cardValue}>{patientData.medicalAlerts}</Text>
                </View>
            </View>

            {/* Clinical Summary Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Clinical Summary</Text>

                <Text style={styles.label}>History and Physical Assessment</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Enter history and assessment details..."
                    multiline
                    value={admissionDetails}
                    onChangeText={setAdmissionDetails}
                />

                <Text style={styles.label}>Plan for</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Enter treatment plan details..."
                    multiline
                />
            </View>

            {/* Discharge Details Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Discharge Details</Text>

                <Text style={styles.label}>Date of Discharge</Text>
                <DateTimePicker />

                <Text style={styles.label}>Condition at Discharge</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter condition at discharge..."
                    value={conditionAtDischarge}
                    onChangeText={setConditionAtDischarge}
                />
            </View>

            <Button title="Submit" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 10,
        
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingTop: 20,
    },
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
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f4f82',
        marginBottom: 8,
    },
    cardRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    cardLabel: {
        fontWeight: 'bold',
        color: '#333',
        width: 120,
    },
    cardValue: {
        color: '#333',
    },
    section: {
        marginBottom: 16,
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
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
    textArea: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        height: 100,
        marginBottom: 16,
        fontSize: 14,
        color: '#333',
        textAlignVertical: 'top',
    },
    datePicker: {
        marginBottom: 16,
    },
});

export default DoctorReportScreen;
