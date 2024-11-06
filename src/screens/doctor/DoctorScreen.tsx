import {View, Text, Image, TouchableOpacity} from 'react-native';
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

  useEffect(() => {
    getAllDoctors();
  }, []);

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
    await firestore()
      .collection('doctors')
      .get()
      .then(snap => {
        if (snap.empty) {
          console.log('Không có bác sĩ');
          return;
        }
        const items: Doctor[] = [];
        snap.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
          });
        });
        setDoctorList(items);
      })
      .catch(error => {
        console.error('Error fetching doctor:', error); // Log lỗi
      });
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
          value=""
          placeholder="Search"
          onChange={() => {}}
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
      </Section>

      <Section>
        {doctorList.map((item, index) => (
          <DoctorComponent
            key={index}
            data={item}
            onPress={() => {
              props.navigation.navigate('DoctorDetail', {doctor: item});
            }}
          />
        ))}
      </Section>
    </ContainerComponent>
  );
};

export default DoctorScreen;
