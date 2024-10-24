import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ContainerComponent, Row, Section, TextComponent } from '../../components'
import { ArrowLeft2 } from 'iconsax-react-native';
import { fontFamilies } from '../../constants/fontFamilies';
import DoctorReviewComponent from './components/DoctorReviewComponent';

const ReviewAllDoctors = (props : any) => {
  return (
    <ContainerComponent isScroll style={{marginTop:-16}}>
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
              text="All Feedbacks"
              size={25}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <Section>
        <DoctorReviewComponent/>
        <DoctorReviewComponent/>
        <DoctorReviewComponent/>
        <DoctorReviewComponent/>
        <DoctorReviewComponent/>
        <DoctorReviewComponent/>
        <DoctorReviewComponent/>
        <DoctorReviewComponent/>
      </Section>
    </ContainerComponent>
  );
}

export default ReviewAllDoctors