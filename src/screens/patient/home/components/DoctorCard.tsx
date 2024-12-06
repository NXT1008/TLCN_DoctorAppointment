import {Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  TextComponent,
} from '../../../../components';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {Doctor} from '../../../../models/Doctor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {setISODay} from 'date-fns';

interface Props {
  onPress: () => void;
  data: Doctor;
}

const DoctorCard = (props: Props) => {
  const patientId = auth().currentUser?.uid;
  const {onPress, data} = props;
  const doctor = data as Doctor;
  const [isFavorite, setIsFavorite] = useState(false);

  // Kiểm tra doctorId đã có trong favorite List hay chưa
  useEffect(() => {
    const fetchFavoriteStatus = firestore()
      .collection('patients')
      .doc(patientId)
      .onSnapshot(doc => {
        const favorites = doc.data()?.favoriteDoctors || [];
        setIsFavorite(favorites.includes(doctor.doctorId));
      });

    return () => fetchFavoriteStatus();
  }, []);

  const handleUpdateFavorite = async () => {
    try {
      const patientRef = firestore().collection('patients').doc(patientId);
      const patientDoc = await patientRef.get();
      const favorites = patientDoc.data()?.favoriteDoctors || [];

      if (isFavorite) {
        const updateFavorite = favorites.filter(
          (id: any) => id !== doctor.doctorId,
        );
        await patientRef.update({favoriteDoctors: updateFavorite});
        setIsFavorite(false);
      } else {
        const updateFavorites = [...favorites, doctor.doctorId];
        await patientRef.update({favoriteDoctors: updateFavorites});
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(
        'DoctorCard.tsx: Lỗi khi cập nhật danh sách yêu thích:',
        error,
      );
    }
  };

  return (
    <Card
      styles={{marginHorizontal: 0, paddingVertical: 0, borderRadius: 10}}
      color="#D2EBE7"
      shadowed>
      <Row
        styles={{
          justifyContent: 'space-between',
        }}>
        <Image
          source={{uri: data.image}}
          style={{width: 120, height: 130, borderRadius: 10}}
        />
        <Col flex={1} styles={{paddingLeft: 15, marginTop: 10}}>
          <Row justifyContent="space-between">
            <TextComponent
              text={data.name}
              size={14}
              font={fontFamilies.semiBold}
            />
            <TouchableOpacity onPress={handleUpdateFavorite}>
              {isFavorite ? (
                <FontAwesome name="heart" size={20} color={'blue'} />
              ) : (
                <FontAwesome name="heart-o" size={20} color={'blue'} />
              )}
            </TouchableOpacity>
          </Row>
          <TextComponent
            text={`${doctor.about}`}
            size={10}
            font={fontFamilies.regular}
            numberOfLine={3}
          />
          <Space height={10} />
          <Row
            styles={{
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Button
              title="Book"
              textStyleProps={{fontFamily: fontFamilies.regular}}
              onPress={onPress}
              size="small"
              color="#0B8FAC"
              styles={{width: 100}}
            />
            <Row
              styles={{
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
              <FontAwesome name="star" color={'blue'} size={16} />
              <Space width={10} />
              <TextComponent
                text={`${data.ratingAverage?.toFixed(1)}`}
                font={fontFamilies.regular}
                size={12}
              />
            </Row>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default DoctorCard;
