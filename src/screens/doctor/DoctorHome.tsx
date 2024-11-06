import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import {  Messages1 } from 'iconsax-react-native';
import { Section, Card } from '../../components';
import { LineChart } from 'react-native-chart-kit'; 

const { width, height } = Dimensions.get('window');

// Dummy data for articles
const articles = [
    {
        title: 'AI outperforms doctors in diagnostics but falls short as a clinical assistant',
        description: 'This is a description for medical article 1.',
        url: 'https://www.news-medical.net/news/20241106/AI-outperforms-doctors-in-diagnostics-but-falls-short-as-a-clinical-assistant.aspx',
    },
    {
        title: 'Medical Article 2',
        description: 'This is a description for medical article 2.',
        url: 'https://example.com/article2',
    },
    {
        title: 'Medical Article 3',
        description: 'This is a description for medical article 3.',
        url: 'https://example.com/article3',
    },
];


const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Otc', 'Nov', 'Dec'],
    datasets: [
        {
            data: [20, 45, 30, 60, 80, 43, 25, 40, 63, 49, 60],
        },
    ],
};

const DoctorHomeScreen = (props: any) => {
    const navigation = props;

    const renderArticleSlide = (item: any, index: any) => (
        <TouchableOpacity key={index} style={styles.articleCard}>
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.row}>
                    <Image source={require('../../assets/IconTab/profile.png')} style={styles.profileImage} />
                    <View style={styles.profileTextContainer}>
                        <Text style={styles.greetingText}>Hi, welcome back!</Text>
                        <Text style={styles.doctorName}>Doctor A</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('DoctorNotification')}>
                    <Image source={require('../../assets/IconTab/notification.png')} style={styles.notificationIcon} />
                </TouchableOpacity>
            </View>

            <Section styles={{ marginTop: 20, height: height * 0.3 }}>
                <Text style={styles.headerText}>Featured Medical Articles</Text>
                <Swiper
                    style={styles.swiper}
                    showsButtons={false}
                    autoplay
                    autoplayTimeout={4}
                    loop
                    activeDotColor="#3baae3"
                >
                    {articles.map((item, index) => renderArticleSlide(item, index))}
                </Swiper>
            </Section>

            <Card styles={styles.chartContainer}>
                <Text style={styles.chartHeaderText}>Medical Data Overview</Text>
                <LineChart
                    data={chartData}
                    width={width + 30} // Adjust width as needed
                    height={220}
                   yAxisLabel=""
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 128, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#fff',
                        },
                        
                    }}
                    bezier
                />
            </Card>

            <TouchableOpacity
                onPress={() => props.navigation.navigate('ChatScreen')}
                style={styles.chatButton}
            >
                <Messages1 size="35" color="#fff" variant="Bold" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        alignItems: 'center',  
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 20,
        width: '100%',  
    },
    row: {
        flexDirection: 'row',
    },
    profileImage: {
        width: 50,
        height: 50,
    },
    profileTextContainer: {
        marginLeft: 15,
    },
    greetingText: {
        fontSize: 14,
        color: '#00000066',
    },
    doctorName: {
        fontSize: 16,
        fontWeight: '600',
    },
    notificationIcon: {
        width: 25,
        height: 25,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 15,
    },
    swiper: {
        height: 200,
        marginBottom: 20,
    },
    articleCard: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 20,
        marginHorizontal: 10,
        width: width * 0.8,
        alignSelf: 'center', // Căn giữa
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    articleDescription: {
        fontSize: 14,
        color: '#666',
    },
    chartHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    chartContainer: {
        marginTop: 10,
        padding: 0,
        justifyContent: 'center',
        width: '100%', 
        alignItems: 'center', // Căn giữa biểu đồ
    },
    chatButton: {
        position: 'absolute',
        backgroundColor: '#3baae3',
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#8ac6e6',
        justifyContent: 'center',
        alignItems: 'center',
        right: width * 0.017,
        top: height * 0.845,
    },
});

export default DoctorHomeScreen;
