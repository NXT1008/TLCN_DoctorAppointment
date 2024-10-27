import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
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

const DoctorScreen = (props: any) => {
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [search, setsearch] = useState('');
  const [filterDoctors, setFilterDoctors] = useState<Doctor[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  useEffect(() => {
    getAllDoctors();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = doctorList.filter((doctor) => (
        doctor.name.toLowerCase().includes(search.toLowerCase())
      ));
      setFilterDoctors(filtered);
    }
    else {
      setFilterDoctors(doctorList) 
    }
  }, [search, doctorList]);

  /// Dropdown menu
  const [selected, setSelected] = useState<MenuItem>();
  const menuItems: MenuItem[] = [
    {key: '1', label: 'Item 1', icon: <Home color="black" />, disable: false},
    {key: '2', label: 'Item 2', icon: <Clock color="black" />, disable: false},
    {key: '3', label: 'Item 3', icon: <User color="black" />, disable: false},
    {key: '4', label: 'Item 3', icon: <User color="black" />, disable: false},
    {key: '5', label: 'Item 3', icon: <User color="black" />, disable: false},
    {key: '6', label: 'Item 3', icon: <User color="black" />, disable: false},
    {key: '7', label: 'Item 3', icon: <User color="black" />, disable: false},
  ];

  const getAllDoctors = async () => {
    setLoadingDoctors(true);
    await firestore()
      .collection('doctors')
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log('Không có bác sĩ');
          return;
        } else {
          const items: Doctor[] = [];
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data(),
            });
          });
          setDoctorList(items);
          setFilterDoctors(items);
          setLoadingDoctors(false)
        }
      },
        error => {
          console.log(error)
          setLoadingDoctors(false)
        }
      );
  };

  const handleMenuClick = (key: string | number) => {
    const item = menuItems.find(menuItem => menuItem.key === key); // Tìm menu item dựa trên key
    if (item) {
      setSelected(item); // Cập nhật selected với menu item đã tìm thấy
    }
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
      <Section>
        <Row justifyContent="space-between" styles={{paddingHorizontal: 10}}>
          <TextComponent
            text="Choose Specialization"
            font={fontFamilies.semiBold}
            size={14}
          />
          <Dropdown
            dropdownStyleProps={{backgroundColor: 'pink'}}
            items={menuItems}
            onMenuClick={handleMenuClick}
            loading={false}
            placement="bottomRight">
            {selected?.label ? (
              <TextComponent
                text={selected.label.toString()}
                size={12}
                font={fontFamilies.regular}
              />
            ) : (
              <TextComponent
                text="Select"
                size={12}
                font={fontFamilies.regular}
              /> // Hoặc có thể hiển thị một placeholder nào đó
            )}
          </Dropdown>
        </Row>
        {/* Bộ lọc đánh giá */}
        
      </Section>

      <Section>
        {loadingDoctors ? (
          <ActivityIndicator color={'#000'} />
        ) : filterDoctors.length === 0 ? (
          <TextComponent text="No doctor" />
        ) : (
          filterDoctors.map((item, index) => (
            <DoctorComponent
              key={index}
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
