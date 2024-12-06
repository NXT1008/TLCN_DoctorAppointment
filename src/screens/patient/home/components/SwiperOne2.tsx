import {Image} from 'react-native';
import React from 'react';
import {
  Card,
  Col,
  ContainerComponent,
  Row,
  TextComponent,
} from '../../../../components';
import {fontFamilies} from '../../../../constants/fontFamilies';

interface Props {
  title?: string;
  body?: string;
  image?: string;
}

const SwiperOne2 = (props: Props) => {
  const {title, body, image} = props;
  return (
    <ContainerComponent>
      <Card styles={{height: 170, borderRadius: 5}} color="#1399ba">
        <Row styles={{justifyContent: 'space-between'}}>
          <Col>
            <TextComponent
              text={`Your health is our priority!`}
              size={18}
              color="#fff"
              styles={{fontFamily: fontFamilies.bold}}
            />
            <TextComponent
              text={`The application helps you access top specialists. We always accompany you for your health`}
              size={12}
              color="#fff"
              numberOfLine={4}
              styles={{fontFamily: fontFamilies.regular}}
            />
          </Col>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/xuanthe/image/upload/v1733329372/j2a8izwd4smzybtz9vug.jpg',
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
};

export default SwiperOne2;
