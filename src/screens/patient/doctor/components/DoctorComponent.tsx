import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  TextComponent,
} from '../../../../components';
import {Image, TouchableOpacity} from 'react-native';
import {Clock, Icon, Location} from 'iconsax-react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {Doctor} from '../../../../models/Doctor';
import firestore from '@react-native-firebase/firestore';
import {Specialization} from '../../../../models/Specialization';
import {Hospital} from '../../../../models/Hospital';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

interface Props {
  onPress: () => void;
  data: Doctor;
}

const DoctorComponent = (props: Props) => {
  const {onPress, data} = props;
  const [spec, setSpec] = useState<Specialization>();
  const [hospital, setHospital] = useState<Hospital>();
  const doctor = data;

  const patientId = auth().currentUser?.uid;
  const [isFavorite, setIsFavorite] = useState(false);

  // Lấy danh sách favoriteDoctors từ Firestore khi component được mount
  // và kiểm tra doctorId đã có trong favorites chưa
  useEffect(() => {
    const fetchFavoriteStatus = firestore()
      .collection('patients')
      .doc(patientId)
      .onSnapshot(doc => {
        const favoriteDoctors = doc.data()?.favoriteDoctors || [];
        setIsFavorite(favoriteDoctors.includes(doctor.doctorId));
      });

    return () => fetchFavoriteStatus();
  }, []);

  useEffect(() => {
    getSpectializationByDoctorID();
    getHospitalByDoctorID()
  }, []);

  //Xử lý khi patient nhấn vào trái tim
  const handleUpdateFavorite = async () => {
    try {
      const patientRef = firestore().collection('patients').doc(patientId);
      const patientDoc = await patientRef.get();
      const favoriteDoctors =
        (patientDoc.data()?.favoriteDoctors as string[]) || [];

      if (isFavorite) {
        // Nếu đã yêu thích, loại bỏ doctorId khỏi favoriteDoctors
        const updatedFavorites = favoriteDoctors.filter(
          id => id !== doctor.doctorId,
        );
        await patientRef.update({favoriteDoctors: updatedFavorites});
        setIsFavorite(false);
      } else {
        const updatedFavorites = [...favoriteDoctors, doctor.doctorId];
        await patientRef.update({favoriteDoctors: updatedFavorites});
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật danh sách yêu thích:', error);
    }
  };

  const getSpectializationByDoctorID = async () => {
    const subscriber = await firestore()
      .collection('specializations')
      .doc(doctor.specializationId)
      .onSnapshot(docSnap => {
        if (docSnap.exists) {
          const specializationData = docSnap.data() as Specialization;
          setSpec(specializationData);
        } else {
          console.error('Specialization document not found');
        }
      });
    return () => subscriber;
  };

  const getHospitalByDoctorID = async () => {
    const subscriber = await firestore()
      .collection('hospitals')
      .doc(doctor.hospitalId)
      .onSnapshot(docSnap => {
        if (docSnap.exists) {
          const hospitalData = docSnap.data() as Hospital;
          setHospital(hospitalData);
        } else {
          console.error('Hospital document not found');
        }
      });
    return () => subscriber;
  };

  return (
    <Card styles={{marginHorizontal: 5, borderRadius: 20}} shadowed>
      <Row styles={{justifyContent: 'flex-start'}} flex={1}>
        <Image
          source={require('../../../../assets/images/doctor.png')}
          style={{
            width: 100,
            height: 100,
            flex: 1,
            resizeMode: 'stretch',
            borderRadius: 100,
          }}
        />
        <Space width={10} />
        <Col flex={2}>
          <Row justifyContent="space-between">
            <TextComponent
              text={data.name}
              size={16}
              font={fontFamilies.semiBold}
            />
            <TouchableOpacity onPress={handleUpdateFavorite}>
              {isFavorite ? (
                <FontAwesome name="heart" size={20} color={'red'} />
              ) : (
                <FontAwesome name="heart-o" size={20} color={'#000'} />
              )}
            </TouchableOpacity>
          </Row>
          <TextComponent
            text={spec ? spec.name : ''}
            size={12}
            font={fontFamilies.regular}
            color="gray"
          />
          <Row
            styles={{
              justifyContent: 'flex-start',
              marginVertical: 2,
              alignItems: 'baseline',
              marginBottom: -5,
            }}>
            {Array.from({length: 5}).map((_, index) => {
              const wholeStars = Math.floor(data.ratingAverage as number); // Số sao nguyên
              const hasHalfStar =
                (data.ratingAverage as number) - wholeStars >= 0.5; // Kiểm tra nếu có nửa sao

              return (
                <FontAwesome
                  key={index}
                  name={
                    index < wholeStars
                      ? 'star' // Sao đầy đủ
                      : index === wholeStars && hasHalfStar
                      ? 'star-half-full' // Sao nửa
                      : 'star-o' // Sao trống
                  }
                  size={16}
                  color={
                    index < wholeStars || (index === wholeStars && hasHalfStar)
                      ? '#e6b800'
                      : '#cccccc'
                  } // Vàng cho sao đầy đủ hoặc nửa sao
                />
              );
            })}
            <Space width={10} />
            <TextComponent
              text={`${data.ratingAverage?.toFixed(1)}`}
              font={fontFamilies.semiBold}
              size={14}
              color="#000"
            />
            <Divider
              type="vertical"
              styles={{marginTop: -7, marginLeft: -3, marginRight: -3}}
            />

            <TextComponent
              text={`${data.numberOfReviews}`}
              font={fontFamilies.semiBold}
              size={14}
              color="#000"
            />
            <Space width={5} />
            <TextComponent
              text="Reviews"
              font={fontFamilies.regular}
              size={12}
              color="gray"
            />
          </Row>
          <Space height={5} />
          <Row justifyContent="flex-start" alignItems="flex-start" styles={{flex: 1}}>
            <Location color="#000" size={16} />
            <Space width={5} />
            <TextComponent
              text={hospital ? hospital.name : ''}
              size={12}
              font={fontFamilies.regular}
              color="gray"
              styles={{
                flexWrap: 'wrap',
                flexShrink: 1,
              }}
            />
          </Row>
        </Col>
      </Row>
      <Divider styles={{marginBottom: 0}} />
      <Row
        styles={{
          alignItems: 'center',
        }}>
        <Clock color="#000000" />
        <Space width={15} />
        <Col>
          <TextComponent
            text="Open Timings:"
            color="#8E9BA5"
            size={12}
            font={fontFamilies.regular}
          />
          <TextComponent
            text="9:00 am - 5:00 pm"
            color="#8E9BA5"
            size={12}
            font={fontFamilies.regular}
          />
        </Col>
        <Button
          onPress={onPress}
          title="Book"
          color="#5AC9B5"
          styles={{paddingVertical: 8, marginBottom: -0}}
          textStyleProps={{fontSize: 14, fontFamily: fontFamilies.semiBold}}
        />
      </Row>
    </Card>
  );
};

export default DoctorComponent;
