import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {
  Button,
  ContainerComponent,
  Dropdown,
  Input,
  Row,
  Section,
  Select,
  Space,
  Tabbar,
  TextComponent,
} from '../../../components';
import DoctorComponent from './components/DoctorComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {MenuItem} from '../../../components/models/MenuProps';
import {ArrowDown2, Clock, Filter, Home, User} from 'iconsax-react-native';
import RadioGroup from '../../../components/RadioGroup';
import {Doctor} from '../../../models/Doctor';
import firestore from '@react-native-firebase/firestore';
import {Specialization} from '../../../models/Specialization';
import _ from 'lodash';
import SpecializationComponent from './components/SpecializationComponent';
import SpecializationModalComponent from './components/SpecializationModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../constants/colors';
import RatingModal from './components/RatingModal';

const DoctorScreen = (props: any) => {
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  const {width, height} = Dimensions.get('window');
  const [listSpec, setListSpecialization] = useState<Specialization[]>([]);
  const [selectedSpecializationId, setSelectedSpecializationId] = useState('All');
  const [selectedSpecializationName, setSelectedSpecializationName] = useState('All');
  const [isSpecializationModalVisible, setIsSpecializationModalVisible] =
    useState(false);

  const [search, setsearch] = useState('');
  const [filterDoctors, setFilterDoctors] = useState<Doctor[]>([]);

  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
  const [selectedRatingRange, setSelectedRatingRange] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    const unsubscribe = getAllDoctors();
    getAllSpecializations();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const filteredDoctors = useMemo(() => {
    let filtered = doctorList;

    // Filter by search
    if (search) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filter by specialization
    if (selectedSpecializationId !== 'All') {
      filtered = filtered.filter(
        doctor => doctor.specializationId === selectedSpecializationId,
      );
    }

    // Filter by rating range
    if (selectedRatingRange) {
      filtered = filtered.filter(
        doctor =>
          doctor?.ratingAverage &&
          doctor.ratingAverage >= selectedRatingRange[0] &&
          doctor.ratingAverage <= selectedRatingRange[1],
      );
    }

    return filtered;
  }, [search, doctorList, selectedSpecializationId, selectedRatingRange]);

  useEffect(() => {
    setFilterDoctors(filteredDoctors);
  }, [filteredDoctors]);

  const getAllDoctors = () => {
    setLoadingDoctors(true);
    return firestore()
      .collection('doctors')
      .onSnapshot(
        snap => {
          if (snap.empty) {
            setDoctorList([]);
            setFilterDoctors([]);
            setLoadingDoctors(false);
            return;
          }
          const items: Doctor[] = [];
          snap.forEach((item: any) => {
            items.push({
              doctorId: item.id, // Changed from id to doctorId to match DoctorComponent
              ...item.data(),
            });
          });
          setDoctorList(items);
          setFilterDoctors(items);
          setLoadingDoctors(false);
        },
        error => {
          console.log(error);
          setLoadingDoctors(false);
        },
      );
  };

  const getAllSpecializations = async () => {
    try {
      const snap = await firestore().collection('specializations').get();
      const items: Specialization[] = [];
      snap.forEach((item: any) => {
        items.push({
          specializationId: item.id, // Changed from id to specializationId to match model
          ...item.data(),
        });
      });
      setListSpecialization(items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerComponent isScroll style={{marginTop: -16}}>
      <Section styles={{marginTop: 15}}>
        <TextComponent
          text="Find your doctor"
          size={20}
          font={fontFamilies.semiBold}
          color="#0B8FAC"
          textAlign="center"
        />
        <TextComponent
          text="Book an appointment for consultation"
          size={14}
          font={fontFamilies.regular}
          color="#8E9BA5"
        />
        <Space height={10} />
        <Input
          radius={15}
          value={search}
          placeholder="Enter doctor name"
          placeholderColor="#8E9BA5"
          onChange={val => {
            setsearch(val);
          }}
          inputStyles={{fontFamily: fontFamilies.regular}}
          prefix
          affix={<FontAwesome name="search" size={20} color="#8E9BA5" />}
          clear
          color="#F1F1F1"
        />
      </Section>

      <View>
        {/* Rating Modal */}
        <RatingModal
          visible={isRatingModalVisible}
          onClose={() => setIsRatingModalVisible(false)}
          onSelectRating={range => setSelectedRatingRange(range)}
        />

        {/* Modal */}
        <SpecializationModalComponent
          visible={isSpecializationModalVisible}
          specializations={listSpec}
          onClose={() => setIsSpecializationModalVisible(false)}
          onSelectSpecialization={specialization => {
            setSelectedSpecializationId(specialization.specializationId);
            setSelectedSpecializationName(specialization.name);
            setIsSpecializationModalVisible(false);
          }}
        />
      </View>

      {/* Specialization */}
      <Row
        justifyContent="space-between"
        styles={{marginTop: -20, marginHorizontal: 20}}>
        <Button
          isShadow
          title="Rating"
          color="#5dbab1"
          onPress={() => setIsRatingModalVisible(true)}
          textStyleProps={{
            fontFamily: fontFamilies.semiBold,
            fontSize: 12,
          }}
          styles={{borderRadius: 15}}
          icon={<ArrowDown2 color="#fff" />}
          iconPosition="right"
        />
        <Button
          isShadow
          title={selectedSpecializationName !== 'All' ? selectedSpecializationName : 'Doctor Speciality'}
          color="#5dbab1"
          onPress={() => setIsSpecializationModalVisible(true)}
          textStyleProps={{
            fontFamily: fontFamilies.semiBold,
            fontSize: 12,
          }}
          styles={{borderRadius: 15}}
          icon={<ArrowDown2 color="#fff" />}
          iconPosition="right"
        />
      </Row>
      <Section>
        <TextComponent
          text={`${filterDoctors.length} doctors found`}
          font={fontFamilies.semiBold}
          size={14}
          color={colors.primary}
        />
      </Section>

      {/* Doctor */}
      <Section>
        {loadingDoctors ? (
          <ActivityIndicator color={'#000'} />
        ) : (
          filterDoctors.map((item, index) => (
            <DoctorComponent
              key={item.doctorId}
              data={item}
              onPress={() => {
                props.navigation.navigate('DoctorDetail', {doctor: item});
              }}
            />
          ))
        )}
      </Section>
    </ContainerComponent>
  );
};

export default DoctorScreen;
