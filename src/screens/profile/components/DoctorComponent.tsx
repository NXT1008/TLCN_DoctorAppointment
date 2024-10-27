import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  TextComponent,
} from '../../../components';
import {Image, TouchableOpacity} from 'react-native';
import {
  Clock,
  Heart,
  Icon,
  Location,
  Map,
  Map1,
  Star,
  Star1,
} from 'iconsax-react-native';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Doctor} from '../../../models/Doctor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Specialization} from '../../../models/Specialization';
import firestore from '@react-native-firebase/firestore';
import { Hospital } from '../../../models/Hospital';

interface Props {
  data: Doctor;
  onPress: () => void;
}

const DoctorComponent = (props: Props) => {
  const {onPress, data} = props;
  const doctor = data as Doctor;
  const [spec, setSpec] = useState<Specialization>();
  const [hospital, setSsetHospital] = useState<Hospital>();

  useEffect(() => {
    getSpecByDoctorID();
    getHospitalByDoctorID()
  }, [doctor]);


  const getSpecByDoctorID = async () => {
    await firestore()
      .collection('specializations')
      .doc(doctor.specializationId)
      .get()
      .then(snap => {
        setSpec(snap.data() as Specialization);
      });
  };

  const getHospitalByDoctorID = async () => {
    await firestore()
      .collection('hospitals')
      .doc(doctor.hospitalId)
      .get()
      .then(snap => {
        setSsetHospital(snap.data() as Hospital);
      });
  };

  return (
    <Card styles={{marginHorizontal: 5, borderRadius: 20}} shadowed>
      <Row justifyContent="flex-start" alignItems="flex-start" flex={1}>
        <Image
          source={require('../../../assets/images/doctor.png')}
          style={{
            width: 100,
            height: 100,
            flex: 1,
            resizeMode: 'stretch',
            borderRadius: 20,
          }}
        />
        <Space width={10} />
        <Col flex={2}>
          <Row
            justifyContent="space-between"
            alignItems="flex-start"
            styles={{marginBottom: -8}}>
            <TextComponent
              text={`${data.name}`}
              size={16}
              font={fontFamilies.semiBold}
            />
            <TouchableOpacity onPress={onPress}>
              <FontAwesome name="heart" size={20} color={'red'} />
            </TouchableOpacity>
          </Row>
          <Divider styles={{marginBottom: -10, marginTop: -10}} />
          <TextComponent
            text={`${spec?.name}`}
            size={13}
            font={fontFamilies.regular}
            color="gray"
          />
          <Row justifyContent="flex-start" alignItems="stretch">
            <Location color="#000" size={16} />
            <Space width={8} />
            <TextComponent
              text={`${hospital?.name}`}
              size={13}
              font={fontFamilies.regular}
              color="gray"
              styles={{marginTop: 0, marginBottom: 0}}
            />
          </Row>
          <Row justifyContent="flex-start" alignItems="stretch">
            <Star1 color="#FEB052" size={20} />
            <Space width={3} />
            <TextComponent
              text={`${doctor.ratingAverage?.toFixed(1)}`}
              size={12}
              font={fontFamilies.regular}
              color="gray"
            />
            <Divider type="vertical" />
            <TextComponent
              text={`${doctor.numberOfReviews}`}
              size={12}
              font={fontFamilies.regular}
              color="gray"
            />
            <Space width={5}/>
            <TextComponent
              text="Reviews"
              size={12}
              font={fontFamilies.regular}
              color="gray"
            />
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default DoctorComponent;
