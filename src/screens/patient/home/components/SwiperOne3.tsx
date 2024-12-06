import {Image} from 'react-native';
import React from 'react';
import {
  Card,
  Col,
  ContainerComponent,
  Row,
  Space,
  TextComponent,
} from '../../../../components';
import {fontFamilies} from '../../../../constants/fontFamilies';

interface Props {
  title?: string;
  body?: string;
  image?: string;
}

const SwiperOne3 = (props: Props) => {
  const {title, body, image} = props;
  return (
    <ContainerComponent>
      <Card styles={{height: 170, borderRadius: 5}} color="#1399ba">
        <Row styles={{justifyContent: 'space-between'}}>
          <Col>
            <TextComponent
              text={`Modern medical solutions at your fingertips!`}
              size={16}
              color="#fff"
              styles={{fontFamily: fontFamilies.bold}}
            />
            <TextComponent
              text={
                'Easily look up information, book an appointment and receive online consultation. All just on your phone.'
              }
              size={10}
              color="#fff"
              numberOfLine={4}
              styles={{fontFamily: fontFamilies.regular}}
            />
          </Col>
          <Space width={5} />
          <Image
            source={{
              uri: 'https://res.cloudinary.com/xuanthe/image/upload/v1733330809/yzvolnhikgogelji8r1i.png',
            }}
            style={{
              width: 128,
              height: 128,
              resizeMode: 'contain',
              borderRadius: 10,
              backgroundColor: '#b7daed',
            }}
          />
        </Row>
      </Card>
    </ContainerComponent>
  );
};

export default SwiperOne3;
