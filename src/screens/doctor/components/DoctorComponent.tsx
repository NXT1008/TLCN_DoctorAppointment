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
import {Image} from 'react-native';
import {Clock, Icon} from 'iconsax-react-native';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Doctor} from '../../../models/Doctor';
import firestore from '@react-native-firebase/firestore';
import {Specialization} from '../../../models/Specialization';
import {Hospital} from '../../../models/Hospital';

interface Props {
  onPress: () => void;
  data: Doctor;
}

const DoctorComponent = (props: Props) => {
  const {onPress, data} = props;
  const [spec, setSpec] = useState<Specialization>();
  const [hospital, setHospital] = useState<Hospital>();
  const doctor = data;

  useEffect(() => {
    getSpectializationByDoctorID();
    getHospitalByDoctorID();
  }, []);

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
      .doc(doctor.hospitalId).onSnapshot((docSnap) => {
        if (docSnap.exists) {
          const hospitalData = docSnap.data() as Hospital;
          setHospital(hospitalData);
        } else {
          console.error('Hospital document not found');
        }
      })
     return () => subscriber;
  };

  return (
    <Card styles={{marginHorizontal: 5, borderRadius: 20}} shadowed>
      <Row styles={{justifyContent: 'flex-start'}} flex={1}>
        <Image
          source={require('../../../assets/images/doctor.png')}
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
          <TextComponent
            text={data.name}
            size={16}
            font={fontFamilies.semiBold}
          />
          <TextComponent
            text={spec ? spec.name : ''}
            size={14}
            font={fontFamilies.regular}
            color="gray"
          />
          <Row styles={{justifyContent: 'flex-start', marginVertical: 2}}>
            <Image
              source={require('../../../assets/images/fill-star.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
            <Image
              source={require('../../../assets/images/fill-star.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
            <Image
              source={require('../../../assets/images/fill-star.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
            <Image
              source={require('../../../assets/images/fill-star.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
            <Image
              source={require('../../../assets/images/fill-star.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </Row>
          <TextComponent
            text={hospital ? hospital.name : ''}
            size={14}
            font={fontFamilies.regular}
            color="gray"
          />
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
