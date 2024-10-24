import React from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  TextComponent,
} from '../../../components';
import {Image} from 'react-native';
import {Clock, Heart, Icon, Location, Map, Map1, Star, Star1} from 'iconsax-react-native';
import {fontFamilies} from '../../../constants/fontFamilies';

interface Props {
  onPress: () => void;
}

const DoctorComponent = (props: Props) => {
  const {onPress} = props;
  return (
    <Card styles={{marginHorizontal: 5, borderRadius: 20}} shadowed>
      <Row justifyContent="flex-start" alignItems="flex-start" flex={1}>
        <Image
          source={require('../../../assets/images/doctor.png')}
          style={{
            width: 100,
            height: 100,
            flex: 1,
            resizeMode: 'stretch',
            borderRadius: 20,
          }}
        />
        <Space width={10} />
        <Col flex={2}>
          <Row
            justifyContent="space-between"
            alignItems="flex-start"
            styles={{marginBottom: -8}}>
            <TextComponent
              text="Doctor Name"
              size={16}
              font={fontFamilies.semiBold}
            />
            <Heart color="#000" />
          </Row>
          <Divider styles={{marginBottom: -10, marginTop: -10}} />
          <TextComponent
            text="Specialization"
            size={13}
            font={fontFamilies.regular}
            color="gray"
          />
          <Row justifyContent="flex-start" alignItems="stretch">
            <Location color="#000" size={16} />
            <Space width={8} />
            <TextComponent
              text="Hospital Name"
              size={13}
              font={fontFamilies.regular}
              color="gray"
              styles={{ marginTop: 0, marginBottom: 0 }}
            />
          </Row>
          <Row justifyContent="flex-start" alignItems="stretch">
            <Star1 color="#FEB052" size={20} />
            <Space width={3} />
            <TextComponent
              text="5"
              size={12}
              font={fontFamilies.regular}
              color="gray"
            />
            <Divider type="vertical" />
            <TextComponent
              text="1,872 Reviews"
              size={12}
              font={fontFamilies.regular}
              color="gray"
            />
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default DoctorComponent;
