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

const SwiperOne4 = (props: Props) => {
  const {title, body, image} = props;
  return (
    <ContainerComponent>
      <Card styles={{height: 170, borderRadius: 5}} color="#1399ba">
        <Row styles={{justifyContent: 'space-between'}}>
          <Col>
            <TextComponent
              text={`Health care, anytime, anywhere!`}
              size={18}
              color="#fff"
              styles={{fontFamily: fontFamilies.bold}}
            />
            <TextComponent
              text={
                'Connect to a specialist quickly, no matter where you are. Your health is always guaranteed'
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
              uri: 'https://res.cloudinary.com/xuanthe/image/upload/v1733329379/bwhi1kyhy0j0w5v8vaxo.jpg',
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

export default SwiperOne4;
