import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Button,
  ContainerComponent,
  Input,
  Row,
  Section,
  Select,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {ArrowLeft2} from 'iconsax-react-native';

const UpdateProfile = (props: any) => {
  return (
    <ContainerComponent isScroll>
      <Section>
        <Row justifyContent="flex-start">
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="Edit Profile"
              size={20}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <Section styles={{paddingHorizontal: 20}}>
        <Input
          label="Full Name"
          labelStyleProps={{
            paddingHorizontal: 5,
            fontFamily: fontFamilies.regular,
            fontSize: 14,
          }}
          styles={{marginTop: -5, marginBottom: 10, borderRadius: 15}}
          value=""
          onChange={() => {}}
          placeholder="Enter your full name"
          placeholderColor="gray"
          inputStyles={{fontFamily: fontFamilies.regular, fontSize: 14}}
          prefix
          bordered={false}
          color="#F5F5F5"
        />
        <Input
          label="Nick name"
          labelStyleProps={{
            paddingHorizontal: 5,
            fontFamily: fontFamilies.regular,
            fontSize: 14,
          }}
          styles={{marginTop: -5, marginBottom: 10, borderRadius: 15}}
          value=""
          onChange={() => {}}
          placeholder="Enter your nick name"
          placeholderColor="gray"
          inputStyles={{fontFamily: fontFamilies.regular, fontSize: 14}}
          prefix
          bordered={false}
          color="#F5F5F5"
        />
        <Input
          label="Email"
          labelStyleProps={{
            paddingHorizontal: 5,
            fontFamily: fontFamilies.regular,
            fontSize: 14,
          }}
          styles={{marginTop: -5, marginBottom: 10, borderRadius: 15}}
          value=""
          onChange={() => {}}
          placeholder="Enter your email name"
          placeholderColor="gray"
          inputStyles={{fontFamily: fontFamilies.regular, fontSize: 14}}
          prefix
          bordered={false}
          color="#F5F5F5"
        />
        <Input
          label="Phone"
          labelStyleProps={{
            paddingHorizontal: 5,
            fontFamily: fontFamilies.regular,
            fontSize: 14,
          }}
          styles={{marginTop: -5, marginBottom: 10, borderRadius: 15}}
          value=""
          onChange={() => {}}
          placeholder="Enter your phone"
          placeholderColor="gray"
          inputStyles={{fontFamily: fontFamilies.regular, fontSize: 14}}
          prefix
          bordered={false}
          color="#F5F5F5"
        />
        <Input
          label="Gender"
          labelStyleProps={{
            paddingHorizontal: 5,
            fontFamily: fontFamilies.regular,
            fontSize: 14,
          }}
          styles={{marginTop: -5, marginBottom: 10, borderRadius: 15}}
          value=""
          onChange={() => {}}
          placeholder="Enter your gender"
          placeholderColor="gray"
          inputStyles={{fontFamily: fontFamilies.regular, fontSize: 14}}
          prefix
          bordered={false}
          color="#F5F5F5"
        />
        <Input
          label="Address"
          labelStyleProps={{
            paddingHorizontal: 5,
            fontFamily: fontFamilies.regular,
            fontSize: 14,
          }}
          styles={{marginTop: -5, marginBottom: 10, borderRadius: 15}}
          value=""
          onChange={() => {}}
          placeholder="Enter your address"
          placeholderColor="gray"
          inputStyles={{fontFamily: fontFamilies.regular, fontSize: 14}}
          prefix
          bordered={false}
          color="#F5F5F5"
        />
        <Button
          title="Update"
          styles={{marginTop: 10, marginHorizontal: 50}}
          textStyleProps={{fontFamily: fontFamilies.medium, fontSize: 16}}
          onPress={() => {}}
        />
      </Section>
    </ContainerComponent>
  );
};

export default UpdateProfile;
