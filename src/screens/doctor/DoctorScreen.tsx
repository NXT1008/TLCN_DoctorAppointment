import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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

const DoctorScreen = () => {
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

  const handleMenuClick = (key: string | number) => {
    const item = menuItems.find(menuItem => menuItem.key === key); // Tìm menu item dựa trên key
    if (item) {
      setSelected(item); // Cập nhật selected với menu item đã tìm thấy
    }
  };

  return (
    <ContainerComponent isScroll>
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
              <TextComponent text={selected.label.toString()} size={12} font={fontFamilies.regular}/>
            ) : (
              <TextComponent text="Select" size={12} font={fontFamilies.regular}/> // Hoặc có thể hiển thị một placeholder nào đó
            )}
          </Dropdown>
        </Row>
      </Section>

      <Section>
        <DoctorComponent />
        <DoctorComponent />
        <DoctorComponent />
        <DoctorComponent />
        <DoctorComponent />
      </Section>
    </ContainerComponent>
  );
};

export default DoctorScreen;
