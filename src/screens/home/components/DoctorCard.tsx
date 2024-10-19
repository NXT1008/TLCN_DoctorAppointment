import {Image} from 'react-native';
import React from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';

const DoctorCard = () => {
  return (
    <Card
      styles={{marginHorizontal: 0, paddingVertical: 0, borderRadius: 10}}
      color="#D2EBE7"
      shadowed>
      <Row
        styles={{
          justifyContent: 'space-between',
        }}>
        <Image
          source={require('../../../assets/images/doctor.png')}
          style={{width: 120, height: 130}}
        />
        <Col flex={1} styles={{paddingLeft: 15, marginTop: 10}}>
          <Row justifyContent="space-between">
            <TextComponent
              text="Doctor Name"
              size={18}
              font={fontFamilies.semiBold}
            />
            <Image source={require('../../../assets/images/heart.png')} />
          </Row>
          <TextComponent
            text="Jorem ipsum dolor, consectetur adipiscing elit. Nunc v libero et velit interdum, ac  mattis."
            size={10}
            font={fontFamilies.regular}
          />
          <Space height={10} />
          <Row
            styles={{
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Button
              title="Book"
              textStyleProps={{fontFamily: fontFamilies.regular}}
              onPress={() => {}}
              size="small"
              color="#0B8FAC"
              styles={{width: 100}}
            />
            <Row
              styles={{
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
              <Image
                source={require('../../../assets/images/fill-star.png')}
                style={{width: 15, height: 15, resizeMode: 'contain'}}
              />
              <Space width={10} />
              <TextComponent text="5.0" font={fontFamilies.regular} size={12} />
            </Row>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default DoctorCard;
