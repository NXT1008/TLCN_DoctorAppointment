import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
interface CancellationData {
    id: string;
    appointmentId: string;
    cancellationReason: string;
    canceledBy: string;
    canceledAt: Date;
}

const CancelAppointment = () => {
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
            <View style={styles.topNavigator}>
                <TouchableOpacity onPress={() => {{}}} style={styles.backButton}>
                    <Image source={require('../../assets/images/back_arrow.png')} style={styles.backImage} />
                </TouchableOpacity>
            </View>
            <Text style={styles.header}>Cancel Appointment</Text>
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
    backButton: {
        height: 46,
        width: 46,
        left: 0,
        top: 0,
        marginLeft: 30,

    },

    backImage: {
        height: 25,
        width: 25,
        top: 10,
        left: 10,
        position: 'absolute',
    },
    header: {
        color: '#21a691',
        textAlign: 'center',
        fontFamily: "Poppins-Medium",
        fontSize: 24,
        fontWeight: "700",
        position: 'relative',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    subHeader: {
        fontSize: 14,
        color: '#A3B1B4',
        marginVertical: 10,
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
    },
    placeholderText: {
        fontSize: 14,
        color: '#A3B1B4',
        marginBottom: 10,
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
        fontWeight: 'bold',
    },
});
