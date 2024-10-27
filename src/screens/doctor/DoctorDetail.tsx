import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Button,
  Card,
  Col,
  ContainerComponent,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../components';
import {ArrowLeft2, MedalStar, Star1, UserEdit} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {Screen} from 'react-native-screens';
import {fontFamilies} from '../../constants/fontFamilies';
import firestore from '@react-native-firebase/firestore';
import {Specialization} from '../../models/Specialization';
import DoctorReviewComponent from './components/DoctorReviewComponent';
import {Review} from '../../models/Review';
import {Doctor} from '../../models/Doctor';

const DoctorDetailScreen = (props: any) => {
  const {width, height} = Dimensions.get('window');
  const {doctor} = props.route.params;
  const doctorData = doctor as Doctor;

  const [spec, setSpec] = useState<Specialization>();
  const [reviewList, setReviewList] = useState<Review[]>([]);

  useEffect(() => {
    getReviewsByDoctorID()
  }, []);

  const getReviewsByDoctorID = () => {
    firestore()
      .collection('reviews')
      .where('doctorId', '==', doctorData.doctorId)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log('DoctorDetail.tsx : Reviews no found');
        }
        else {
          const items: Review[] = []
          snap.forEach((item : any) => {
            items.push({
              id: item.id,
              ...item.data()
            })
          })
          setReviewList(items)
        }
      });
  };

  useEffect(() => {
    getSpectializationByDoctorID();
  }, []);

  const getSpectializationByDoctorID = async () => {
    try {
      const specializationDoc = await firestore()
        .collection('specializations')
        .doc(doctor.specializationId)
        .get();

      if (specializationDoc.exists) {
        const specializationData = specializationDoc.data() as Specialization;
        setSpec(specializationData);
      } else {
        console.error('Specialization document not found');
      }
    } catch (error) {
      console.error('Error fetching specialization:', error);
    }
  };
  return (
    <View style={styles.container}>
      <ContainerComponent isScroll styleHeader={{marginTop: -16}}>
        <View
          style={{
            backgroundColor: '#fafafa',
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            flexShrink: 1,
          }}>
          <View style={{paddingHorizontal: 20, marginTop: 16}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <ArrowLeft2 color="#000" />
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/images/doctor.png')}
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
              alignSelf: 'center',
              marginTop: -5,
              marginBottom: 15,
            }}
            resizeMode="contain"
          />
          <TextComponent
            text={doctor.name}
            size={20}
            font={fontFamilies.semiBold}
            textAlign="center"
          />
          <TextComponent
            text={spec ? spec.name : ''}
            size={14}
            font={fontFamilies.regular}
            textAlign="center"
            color="#6B779A"
            styles={{marginTop: -4}}
          />
          <Section styles={{marginTop: 5, paddingHorizontal: 5}}>
            <Row justifyContent="space-between" styles={{paddingBottom: 30}}>
              <Card
                styles={{
                  width: '25%',
                  alignItems: 'center',
                  paddingTop: 0,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}>
                <View
                  style={{
                    width: '80%',
                    height: '45%',
                    backgroundColor: '#7ACEFA4D',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingBottom: 10,
                    marginBottom: 5,
                  }}>
                  <UserEdit color="#0577e3" />
                </View>
                <TextComponent text="1000+" font={fontFamilies.semiBold} />
                <TextComponent
                  text="Patients"
                  font={fontFamilies.regular}
                  size={10}
                  color="gray"
                />
              </Card>
              <Card
                styles={{
                  width: '25%',
                  alignItems: 'center',
                  paddingTop: 0,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}>
                <View
                  style={{
                    width: '80%',
                    height: '45%',
                    backgroundColor: '#f5d7dc',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingBottom: 10,
                    marginBottom: 5,
                  }}>
                  <MedalStar color="#fc587c" />
                </View>
                <TextComponent text="10 Yrs" font={fontFamilies.semiBold} />
                <TextComponent
                  text="Experience"
                  font={fontFamilies.regular}
                  size={10}
                  color="gray"
                />
              </Card>
              <Card
                styles={{
                  width: '25%',
                  alignItems: 'center',
                  paddingTop: 0,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}>
                <View
                  style={{
                    width: '80%',
                    height: '45%',
                    backgroundColor: '#ffe4c2',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingBottom: 10,
                    marginBottom: 5,
                  }}>
                  <Star1 color="#ffa936" />
                </View>
                <TextComponent text={`${doctorData.ratingAverage?.toFixed(1)}`} font={fontFamilies.semiBold} />
                <TextComponent
                  text="Ratings"
                  font={fontFamilies.regular}
                  size={10}
                  color="gray"
                />
              </Card>
            </Row>
          </Section>
        </View>

        <Section styles={styles.aboutSection}>
          <TextComponent
            text="About Doctor"
            color="#000"
            size={18}
            font="Poppins-Bold"
          />
          <TextComponent
            text="Dr. Bellamy Nicholas is a top specialist at London Bridge Hospital at London. He has achieved several awards and recognition for his contribution and service in his own field.
                    He is available for private consultation."
            font="Poppins-Regular"
            textAlign="justify"
            color="#555"
            lineHeight={24}
          />
        </Section>

        <Section styles={styles.workingTimeSection}>
          <TextComponent
            text="Working Time"
            color="#000"
            size={18}
            font="Poppins-Bold"
          />
          <TextComponent
            text="Mon - Sat (08:30 AM - 09:00 PM)"
            color="#555"
            font="Poppins-Regular"
          />
        </Section>

        <Section styles={{margin: 10, marginBottom: -5}}>
          <TextComponent
            text="Communication"
            color="#000"
            size={18}
            font="Poppins-Bold"
          />
          <TouchableOpacity
            style={styles.communicationMethod}
            onPress={() => Alert.alert('Messaging')}>
            <Image
              source={require('../../assets/images/message.png')}
              style={styles.communicationIcon}
            />
            <Col>
              <TextComponent
                text="Message"
                color="#000"
                size={16}
                font="Poppins-SemiBold"
              />
              <TextComponent
                text="Chat me up, share photos."
                color="#555"
                size={14}
                font="Poppins-Regular"
              />
            </Col>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.communicationMethod}
            onPress={() => Alert.alert('Audio Calling')}>
            <Image
              source={require('../../assets/images/audioCall.png')}
              style={styles.communicationIcon}
            />
            <Col>
              <TextComponent
                text="Audio Call"
                color="#000"
                size={16}
                font="Poppins-SemiBold"
              />
              <TextComponent
                text="Call your doctor directly."
                color="#555"
                size={14}
                font="Poppins-Regular"
              />
            </Col>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.communicationMethod}
            onPress={() => Alert.alert('Video Calling')}>
            <Image
              source={require('../../assets/images/videoCall.png')}
              style={styles.communicationIcon}
            />
            <Col>
              <TextComponent
                text="Video Call"
                color="#000"
                size={16}
                font="Poppins-SemiBold"
              />
              <TextComponent
                text="See your doctor live."
                color="#555"
                size={14}
                font="Poppins-Regular"
              />
            </Col>
          </TouchableOpacity>
        </Section>
        <Section>
          <Row justifyContent="space-between" styles={{margin: 10}}>
            <TextComponent
              text="Feedbacks"
              color="#000"
              size={18}
              font={fontFamilies.bold}
            />
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ReviewAllDoctors', {data: reviewList});
              }}>
              <TextComponent
                text="See All"
                color="#000"
                size={14}
                font={fontFamilies.medium}
              />
            </TouchableOpacity>
          </Row>
          <View>
            {reviewList.slice(0,3).map((item, index) => (
              <DoctorReviewComponent key={index} data={item}/>
            )) }
          </View>
        </Section>
      </ContainerComponent>
      <Button
        title="Book Appointment"
        onPress={() => {
          props.navigation.navigate('BookingScreen');
        }}
        color="#0B8FAC"
        textStyleProps={{fontFamily: fontFamilies.semiBold, color: '#fff'}}
        styles={{
          position: 'absolute',
          top: height * 0.92,
          left: width * 0.1,
          width: width * 0.8,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    top: -1,
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
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  workingTimeSection: {
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
    marginRight: 20,
  },
  bookButton: {
    height: 60,
    backgroundColor: '#0B8FAC',
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DoctorDetailScreen;
