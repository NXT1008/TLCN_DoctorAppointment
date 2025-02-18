import {View, TouchableOpacity} from 'react-native';
import React, {} from 'react';
import {
  ContainerComponent,
  Row,
  Section,
  TextComponent,
} from '../../../../components';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';

const SettingScreen = (props: any) => {


  return (
    <ContainerComponent>
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
              text="Settings"
              size={25}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <Section>
        {/* <Row justifyContent="space-between" styles={{paddingVertical: 10}}>
          <TextComponent
            text="Dark Mode"
            size={16}
            font={fontFamilies.semiBold}
          />
          <ToggleSwitch
            isOn={isDarkTheme}
            onColor="green"
            offColor="red"
            size="medium"
            onToggle={val => {
              setIsDarkTheme(val);
            }}
          />
        </Row>
        <Row justifyContent="space-between" styles={{paddingVertical: 10}}>
          <TextComponent
            text="Notifications"
            size={16}
            font={fontFamilies.semiBold}
          />
          <ToggleSwitch
            isOn={isDarkTheme}
            onColor="green"
            offColor="red"
            size="medium"
            onToggle={val => {
              setIsDarkTheme(val);
            }}
          />
        </Row>
        <Row justifyContent="space-between" styles={{paddingVertical: 10}}>
          <TextComponent
            text="Change Languages"
            size={16}
            font={fontFamilies.semiBold}
          />
          <ToggleSwitch
            isOn={isDarkTheme}
            onColor="green"
            offColor="red"
            size="medium"
            onToggle={val => {
              setIsDarkTheme(val);
            }}
          />
        </Row> */}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ChangePassword');
          }}>
          <Row justifyContent="space-between" styles={{paddingVertical: 10}}>
            <TextComponent
              text="Change Password"
              size={16}
              font={fontFamilies.semiBold}
            />
            <ArrowRight2 color="#000" size={22} />
          </Row>
        </TouchableOpacity>
      </Section>
    </ContainerComponent>
  );
};

export default SettingScreen;
