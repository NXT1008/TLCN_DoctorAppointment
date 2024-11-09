import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Card,
  ContainerComponent,
  Row,
  Section,
  TextComponent,
} from '../../../components';
import {ArrowLeft2, Star, Star1} from 'iconsax-react-native';
import {fontFamilies} from '../../../constants/fontFamilies';
import DoctorReviewComponent from './components/DoctorReviewComponent';
import FontAweSome from 'react-native-vector-icons/FontAwesome';
import {Review} from '../../../models/Review';

const ReviewAllDoctors = (props: any) => {
  const [selectedRating, setselectedRating] = useState('All');
  const data = (props.route.params as {data: Review[]}).data;

  // Lọc đánh giá dựa trên `selectedRating`
  const filteredData =
    selectedRating === 'All'
      ? data
      : data.filter(item => item.rating === parseFloat(selectedRating));

  return (
    <ContainerComponent isScroll style={{marginTop: -16}}>
      <Section styles={{paddingTop: 16}}>
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
        <Row>
          <ScrollView horizontal>
            {['All', '5', '4', '3', '2', '1'].map(rating => (
              <Card
                key={rating}
                styles={{
                  flexDirection: 'row',
                  justifyContent:
                    rating === 'All' ? 'space-between' : 'space-around',
                  paddingHorizontal: 8,
                  alignItems: 'baseline',
                  width: 60,
                  borderRadius: 20,
                  backgroundColor:
                    selectedRating === rating ? '#3da4a6' : '#fff',
                  borderColor: selectedRating === rating ? '#fff' : '#3da4a6',
                  borderWidth: selectedRating === rating ? 0 : 1,
                }}
                onPress={() => {
                  setselectedRating(rating);
                }}>
                <FontAweSome name="star" color={'#e6b800'} size={18} />
                <TextComponent
                  text={rating}
                  size={14}
                  font={fontFamilies.regular}
                  color={selectedRating === rating ? '#fff' : '#3da4a6'}
                />
              </Card>
            ))}
          </ScrollView>
        </Row>
      </Section>
      <Section>
        {filteredData.map((item, index) => (
          <DoctorReviewComponent key={index} data={item} />
        ))}
      </Section>
    </ContainerComponent>
  );
};

export default ReviewAllDoctors;
