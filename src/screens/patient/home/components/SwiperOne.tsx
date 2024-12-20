import { Image } from 'react-native'
import React from 'react'
import { Card, Col, ContainerComponent, Row, TextComponent } from '../../../../components';
import { fontFamilies } from '../../../../constants/fontFamilies';

interface Props {
  title?: string;
  body?: string;
  image?:string,
}

const SwiperOne = (props: Props) => {
  const {title, body, image} = props
  return (
    <ContainerComponent>
      <Card styles={{height: 170, borderRadius: 5}} color="#1399ba">
        <Row styles={{justifyContent: 'space-between'}}>
          <Col>
            <TextComponent
              text={`Easy scheduling, no more waiting!`}
              size={18}
              color="#fff"
              styles={{fontFamily: fontFamilies.bold}}
            />
            <TextComponent
              text={
                'Medical examination has never been easier - Schedule an appointment with just a few steps!'
              }
              size={12}
              color="#fff"
              numberOfLine={4}
              styles={{fontFamily: fontFamilies.regular}}
            />
          </Col>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/xuanthe/image/upload/v1733329368/zvadqdfdoyrdhhbtjs2d.jpg',
            }}
            style={{
              width: 128,
              height: 128,
              resizeMode: 'contain',
              borderRadius: 10,
            }}
          />
        </Row>
      </Card>
    </ContainerComponent>
  );
}

export default SwiperOne