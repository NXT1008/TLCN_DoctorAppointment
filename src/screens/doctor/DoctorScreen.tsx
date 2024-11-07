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
} from '../../components';
import DoctorComponent from './components/DoctorComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {MenuItem} from '../../components/models/MenuProps';
import {Clock, Home, User} from 'iconsax-react-native';
import RadioGroup from '../../components/RadioGroup';
import {Doctor} from '../../models/Doctor';
import firestore from '@react-native-firebase/firestore';
import {Specialization} from '../../models/Specialization';
import _ from 'lodash';
import SpecializationComponent from './components/SpecializationComponent';
import SpecializationModalComponent from './components/SpecializationModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../constants/colors';

const DoctorScreen = (props: any) => {
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  const {width, height} = Dimensions.get('window');
  const [listSpec, setListSpecialization] = useState<Specialization[]>([]);
  const [loadingSpecialization, setLoadingSpecialization] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedSpecializationName, setSelectedSpecializationName] =
    useState('All');
  const [isSpecializationModalVisible, setIsSpecializationModalVisible] =
    useState(false);

  const [search, setsearch] = useState('');
  const [filterDoctors, setFilterDoctors] = useState<Doctor[]>([]);

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
    if (selectedSpecialization !== 'All') {
      filtered = filtered.filter(
        doctor => doctor.specializationId === selectedSpecialization,
      );
    }

    return filtered;
  }, [search, doctorList, selectedSpecialization]);

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
    setLoadingSpecialization(true);
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
    setLoadingSpecialization(false);
  };

  return (
    <ContainerComponent isScroll style={{marginTop: -16}}>
      <Section styles={{marginTop: 10}}>
        <TextComponent
          text="Find your doctor"
          size={20}
          font={fontFamilies.semiBold}
        />
        <TextComponent
          text="Book an appointment for consultation"
          size={14}
          font={fontFamilies.regular}
        />
        <Space height={10} />
        <Input
          value={search}
          placeholder="Enter doctor name"
          onChange={val => {
            setsearch(val);
          }}
          inputStyles={{fontFamily: fontFamilies.regular}}
          prefix
          affix={
            <TouchableOpacity>
              <Image source={require('../../assets/IconTab/filter.png')} />
            </TouchableOpacity>
          }
          clear
          color="#f4f6f9"
        />
      </Section>

      <View>
        {/* Modal */}
        <SpecializationModalComponent
          visible={isSpecializationModalVisible}
          specializations={listSpec}
          onClose={() => setIsSpecializationModalVisible(false)}
          onSelectSpecialization={specialization => {
            setSelectedSpecialization(specialization.specializationId);
            setSelectedSpecializationName(specialization.name);
            setIsSpecializationModalVisible(false);
          }}
        />
      </View>

      {/* Specialization */}
      <Section>
        <Row justifyContent="space-between">
          <TextComponent
            text="Doctor Speciality"
            size={18}
            font={fontFamilies.semiBold}
          />
          <TouchableOpacity onPress={() => setIsSpecializationModalVisible(true)}>
            <TextComponent text="See All" font={fontFamilies.regular} size={12} />
          </TouchableOpacity>
        </Row>
      </Section>
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
