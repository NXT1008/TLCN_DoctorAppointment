import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Messages1} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Swiper from 'react-native-swiper';
import {Card, Row, Section, Space, TextComponent} from '../../../components';
import Container from '../../../components/ContainerComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Doctor} from '../../../models/Doctor';
import { HandleNotification } from '../../../utils/handleNotification';
import messaging from '@react-native-firebase/messaging'
import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native'

const {width, height} = Dimensions.get('window');

// Dummy data for articles
const articles = [
  {
    title:
      'AI outperforms doctors in diagnostics but falls short as a clinical assistant',
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
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Otc',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      data: [20, 45, 30, 60, 80, 43, 25, 40, 63, 49, 60],
    },
  ],
};

const data = [{value: 50}, {value: 80}, {value: 90}, {value: 70}];

const DoctorHomeScreen = ({navigation}: any) => {
  const user = auth().currentUser;
  const [doctor, setDoctor] = useState<Doctor>();
  const animatedOpacity = useRef(new Animated.Value(0)).current; // Giá trị opacity cho animation
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    // Hiệu ứng xuất hiện cho biểu đồ
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1500, // Thời gian hiệu ứng
      useNativeDriver: true,
    }).start();

    const createNotificationChannel = async () => {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });
    };
    HandleNotification.checkNotificationPermission();
    //createNotificationChannel();

    const unsubcribeOnMessage = messaging().onMessage(
      async (remoteMessage: any) => {
        const imageUrl = remoteMessage.notification?.android?.imageUrl;
        await notifee.displayNotification({
          title: remoteMessage.notification?.title || 'New Title',
          body: remoteMessage.notification?.body || 'New body',
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
            smallIcon: 'ic_launcher',
            pressAction: {id: 'default'},
            style: imageUrl
              ? {type: AndroidStyle.BIGPICTURE, picture: imageUrl}
              : undefined,
          },
        });
      },
    );

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
          console.error('Error listening to doctor changes:', error);
        },
    );
    
    // Lắng nghe sự thay đổi trong Firestore để kiểm tra có thông báo mới không
    let unsubscribeNotification: () => void = () => {}; // Đặt giá trị mặc định
    if (doctor?.doctorId) {
      unsubscribeNotification = firestore()
        .collection('notifications')
        .where('receiverId', '==', doctor.doctorId)
        .where('isReaded', '==', false) // Kiểm tra các thông báo chưa đọc
        .onSnapshot(snapshot => {
          if (snapshot.empty) {
            setHasNewNotification(false)
          }
          else {
            setHasNewNotification(true)
            console.log("aaaa")
          }
        });
    }
    
    return () => {
      unsubscribeDoctor();
      unsubscribeNotification();
    };
  }, []);



  const renderArticleSlide = (item: any, index: any) => (
    <TouchableOpacity
      key={index}
      style={{
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 20,
        marginHorizontal: 10,
        width: width * 0.8,
        alignSelf: 'center', // Căn giữa
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      }}>
      <TextComponent
        text={item.title}
        size={16}
        color="#000"
        font={fontFamilies.semiBold}
      />
      <TextComponent
        text={item.description}
        size={12}
        color="#000"
        font={fontFamilies.regular}
      />
      {/* <Card styles={{height: 170}} color="#1399ba">
        <Row styles={{justifyContent: 'space-between'}}>
          <Col>
            <TextComponent
              text="Medical Center"
              size={18}
              color="#fff"
              styles={{fontFamily: fontFamilies.bold}}
            />
            <TextComponent
              text="Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
              size={10}
              color="#fff"
              numberOfLine={4}
              styles={{fontFamily: fontFamilies.regular}}
            />
          </Col>
        </Row>
      </Card> */}
    </TouchableOpacity>
  );

  return (
    <Container isScroll style={{marginTop: -16}}>
      <View style={styles.container}>
        <Row
          styles={{
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingTop: 20,
            width: '100%',
          }}>
          <Row>
            <Image
              source={
                doctor?.image
                  ? {uri: doctor.image}
                  : require('../../../assets/IconTab/profile.png')
              }
              style={{width: 50, height: 50, borderRadius: 100}}
            />
            <Space width={15} />
            <View>
              <TextComponent
                text="Hi, how are you today?"
                font={fontFamilies.regular}
                color="#00000066"
              />
              <TextComponent
                text={`${doctor?.name}`}
                font={fontFamilies.semiBold}
              />
            </View>
          </Row>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DoctorNotification', {doctor: doctor});
            }}>
            <View
              style={{
                position: 'absolute',
                height: 9,
                width: 9,
                top: 1,
                right: 1,
                backgroundColor: hasNewNotification ? '#ff6f00' : '#fff',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
            <Image
              source={require('../../../assets/IconTab/notification.png')}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </Row>

        <Section styles={{marginTop: 20, height: height * 0.3}}>
          <Text style={styles.headerText}>Featured Medical Articles</Text>
          <Swiper
            paginationStyle={{
              position: 'absolute',
              bottom: -10, // Khoảng cách cố định từ dưới lên
              left: 0,
              right: 0,
            }}
            style={styles.swiper}
            autoplay
            autoplayTimeout={4}
            loop
            activeDotColor="#3baae3">
            {articles.map((item, index) => renderArticleSlide(item, index))}
          </Swiper>
        </Section>

        <Card styles={styles.chartContainer}>
          <Text style={styles.chartHeaderText}>Medical Data Overview</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <LineChart
              data={chartData}
              width={width * 1.5} // Adjust width as needed
              height={300}
              yAxisLabel=""
              yLabelsOffset={20}
              xLabelsOffset={10}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: 'gray',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 128, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForLabels: {
                  fontFamily: fontFamilies.regular,
                  fontSize: 12,
                },
                propsForHorizontalLabels: {
                  fontFamily: fontFamilies.regular,
                  fontSize: 12,
                },
                propsForVerticalLabels: {
                  fontFamily: fontFamilies.semiBold,
                  fontSize: 12,
                },
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#fff',
                },
                backgroundGradientFromOpacity: 0.4, // background gradient from opacity
                backgroundGradientToOpacity: 0.4, // background gradient to opacity
                fillShadowGradientOpacity: 0.5, // fill shadow gradient opacity
                fillShadowGradientFrom: 'blue', // fill shadow gradient from
                fillShadowGradientTo: 'red', // fill shadow gradient to
                fillShadowGradientFromOpacity: 0.5, // fill shadow gradient from opacity
                fillShadowGradientToOpacity: 0.5, // fill shadow gradient to opacity
                fillShadowGradientFromOffset: 0.6, // fill shadow gradient from offset
                fillShadowGradientToOffset: 0.4, // fill shadow gradient to offset
                propsForBackgroundLines: {
                  strokeWidth: 0.9,
                  stroke: 'gray',
                },
              }}
              bezier
            />
          </ScrollView>
        </Card>

        <TouchableOpacity
          onPress={() => navigation.navigate('ChatScreen')}
          style={styles.chatButton}>
          <Messages1 size="35" color="#fff" variant="Bold" />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontFamily: fontFamilies.regular,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: fontFamilies.semiBold,
    color: '#000',
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
  articleTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontFamily: fontFamilies.semiBold,
  },
  chartHeaderText: {
    fontSize: 18,
    fontFamily: fontFamilies.semiBold,
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
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
