import { Image } from 'react-native'
import React from 'react'
import { Card, Col, ContainerComponent, Row, TextComponent } from '../../../components';
import { fontFamilies } from '../../../constants/fontFamilies';

const SwiperOne = () => {
  return (
    <ContainerComponent>
      <Card styles={{height: 170}} color="#1399ba">
        <Row styles={{justifyContent: 'space-between'}}>
          <Col>
            <TextComponent
              text="Medical Center"
              size={18}
              color="#fff"
              styles={{fontFamily: fontFamilies.bold}}
            />
            <TextComponent
              text="Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
              size={10}
              color="#fff"
              numberOfLine={4}
              styles={{fontFamily: fontFamilies.regular}}
            />
          </Col>
          <Image source={require('../../../assets/images/doctor.png')} />
        </Row>
      </Card>
    </ContainerComponent>
  );
}

export default SwiperOne