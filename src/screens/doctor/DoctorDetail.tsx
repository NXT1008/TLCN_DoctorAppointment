import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Card, Col, ContainerComponent, Row, Section, TextComponent } from '../../components';
import { ArrowLeft2 } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from 'react-native-screens';

const DoctorDetailScreen = () => {
    const navigation = useNavigation()
    return (
        <ContainerComponent isScroll >
            <Section>
                <Row styles={styles.headerIcons}>
                    <ArrowLeft2 color="#000" onPress={() => navigation.goBack()} />
                    <TouchableOpacity>
                        <TextComponent
                            text='⋮'
                            size={24} 
                            lineHeight={30}/>
                    </TouchableOpacity>
                </Row>
            </Section>


            <Section styles={styles.profileContainer}>
                <Image
                    source={require('../../assets/images/doctor.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.doctorName}>Dr. Bellamy Nicholas</Text>
                <Text style={styles.specialty}>Virologist</Text>
            </Section>

            <View style={styles.statsContainer}>
                <Card
                    styles={styles.statBox}
                    shadowed>
                    <Image
                        source={require('../../assets/images/patient_badge.png')}
                        style={styles.badge}
                    />
                    <Text style={styles.statNumber}>1000+</Text>
                    <Text style={styles.statLabel}>Patients</Text>
                </Card>
                <Card styles={styles.statBox}>
                    <Image
                        source={require('../../assets/images/experience_badge.png')}
                        style={styles.badge}
                    />
                    <Text style={styles.statNumber}>10 Yrs</Text>
                    <Text style={styles.statLabel}>Experience</Text>
                </Card>
                <Card styles={styles.statBox}>
                    <Image
                        source={require('../../assets/images/rating_badge.png')}
                        style={styles.badge}
                    />
                    <Text style={styles.statNumber}>4.5</Text>
                    <Text style={styles.statLabel}>Ratings</Text>
                </Card>
            </View>

            <Section styles={styles.aboutSection}>
                <TextComponent
                    text='About Doctor'
                    color='#000'
                    size={18}
                    font='Poppins-Bold' />
                <TextComponent
                    text='Dr. Bellamy Nicholas is a top specialist at London Bridge Hospital at London. He has achieved several awards and recognition for his contribution and service in his own field.
                    He is available for private consultation.'
                    font='Poppins-Regular' 
                    textAlign='justify'
                    color='#555'
                    lineHeight={24}/>
            </Section>


            <Section styles={styles.workingTimeSection}>
                <TextComponent
                    text='Working Time'
                    color='#000'
                    size={18}
                    font='Poppins-Bold' />
                <TextComponent 
                    text='Mon - Sat (08:30 AM - 09:00 PM)'
                    color='#555'
                    font='Poppins-Regular'/>
            </Section>


            <Section styles={styles.communicationSection}>
                <TextComponent
                    text='Communication'
                    color='#000'
                    size={18}
                    font='Poppins-Bold' />
                <TouchableOpacity 
                    style={styles.communicationMethod}
                    onPress={() => Alert.alert("Messaging")}>
                    <Image
                        source={require('../../assets/images/message.png')} 
                        style={styles.communicationIcon}/>
                    <Col>
                        <TextComponent
                            text='Message'
                            color='#000'
                            size={16} 
                            font='Poppins-SemiBold'/>
                            <TextComponent 
                            text='Chat me up, share photos.'
                            color='#555'
                            size={14}
                            font='Poppins-Regular'/>
                    </Col>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.communicationMethod}
                    onPress={() => Alert.alert("Audio Calling")}>
                    <Image
                        source={require('../../assets/images/audioCall.png')} 
                        style={styles.communicationIcon}/>
                    <Col>
                        <TextComponent
                            text='Audio Call'
                            color='#000'
                            size={16} 
                            font='Poppins-SemiBold'/>
                            <TextComponent 
                            text='Call your doctor directly.'
                            color='#555'
                            size={14}
                            font='Poppins-Regular'/>
                    </Col>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.communicationMethod}
                    onPress={() => Alert.alert("Video Calling")}>
                    <Image
                        source={require('../../assets/images/videoCall.png')} 
                        style={styles.communicationIcon}/>
                    <Col>
                        <TextComponent
                            text='Video Call'
                            color='#000'
                            size={16} 
                            font='Poppins-SemiBold'/>
                            <TextComponent 
                            text='See your doctor live.'
                            color='#555'
                            size={14}
                            font='Poppins-Regular'/>
                    </Col>
                </TouchableOpacity>
            </Section>
            
            <TouchableOpacity style={styles.bookButton}
            onPress={() => {}}>
                <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
        </ContainerComponent>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginLeft: 20,
        marginRight: 20
    },
    headerIcons: {
        flexDirection: 'row',
       justifyContent: 'space-between',
    },
    backButton: {
        fontSize: 24,
        color: '#000',
    },
    menuButton: {
        fontSize: 24,
        color: '#000',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    doctorName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    specialty: {
        fontSize: 16,
        color: '#777',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    badge: {
        height: 65,
        width: 49,
        position: 'relative',
        top: -1
    },
    statBox: {
        height: 130,
        width: 112,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 12,
        color: '#777',
    },
    aboutSection: {
        margin: 10
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    workingTimeSection: {
        margin: 10,
    },
    communicationSection: {
        margin: 10,
    },
    communicationMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,

    },
    communicationIcon: {
        height: 50,
        width: 50,
        marginRight: 20
    },
    bookButton: {
        height: 60,
        backgroundColor: '#0B8FAC',
        borderRadius: 20,
        marginBottom: 20,
        alignItems:'center',
        justifyContent:'center',
    },
    bookButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DoctorDetailScreen;
