import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import { Row, Section } from '../../components';
import { ArrowLeft2 } from 'iconsax-react-native';
interface CancellationData {
    id: string;
    appointmentId: string;
    cancellationReason: string;
    canceledBy: string;
    canceledAt: Date;
}

const CancelAppointment = () => {
    const navigation = useNavigation();
    const [selectedReason, setSelectedReason] = useState<string>('Weather Conditions');
    const [additionalReason, setAdditionalReason] = useState<string>('');
    const appointmentId = '12345';
    const canceledBy = 'User';

    const reasons = [
        'Rescheduling',
        'Weather Conditions',
        'Unexpected Work',
        'Others'
    ];

    const handleReasonSelect = (reason: string) => {
        setSelectedReason(reason);
    };

    const handleCancelAppointment = () => {
        const cancellationData: CancellationData = {
            id: '1',
            appointmentId,
            cancellationReason: selectedReason === 'Others' ? additionalReason : selectedReason,
            canceledBy,
            canceledAt: new Date(),
        };
        console.log('Canceling appointment data:', cancellationData);
    };

    return (
        <View style={styles.container}>
            <Section styles={styles.header}>
                <Row justifyContent='space-around'>
                    <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Cancel Appointment</Text>
                </Row>
            </Section>
            <Text style={styles.subHeader}>
                It is very important to take care of the patient, the patient will be followed by the patient, but this time it will happen that there is a lot of work and pain.
            </Text>

            <View style={styles.reasonList}>
                {reasons.map((reason, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.reasonItem}
                        onPress={() => handleReasonSelect(reason)}
                    >
                        <Text style={styles.radioButton}>
                            {selectedReason === reason ? '●' : '○'}
                        </Text>
                        <Text style={styles.reasonText}>{reason}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.placeholderText}>
                It is very important to take care of the patient, the patient will be followed by the patient, but this time it will happen that there is a lot of work and pain.
            </Text>

            <TextInput
                style={styles.textInput}
                placeholder="Enter Your Reason Here..."
                value={additionalReason}
                onChangeText={setAdditionalReason}
                multiline
            />

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelAppointment}>
                <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CancelAppointment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    topNavigator: {
        flexDirection: 'row',
        top: 0,
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
    
    subHeader: {
        fontSize: 14,
        color: '#A3B1B4',
        marginVertical: 10,
        fontFamily: 'Poppins-Regular'
    },
    reasonList: {
        maxHeight: 150,
        marginBottom: 25,
    },
    reasonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    radioButton: {
        fontSize: 20,
        marginRight: 10,
        color: '#21a691',
    },
    reasonText: {
        fontSize: 16,
        color: '#27403e',
        fontFamily: 'Poppins-Regular'
    },
    placeholderText: {
        fontSize: 14,
        color: '#A3B1B4',
        marginBottom: 10,
        fontFamily: 'Poppins-Regular'
    },
    textInput: {
        height: 166,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#E8F5E9',
        width: 'auto',
        fontFamily: 'Poppins-Regular'
    },
    cancelButton: {
        backgroundColor: '#21a691',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Medium'
    },
});
