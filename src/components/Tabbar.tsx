import React, {type ReactNode} from 'react';
import {
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Button from './Button';
import Col from './Col';
import Row from './Row';
import Text from './TextComponent';
import {colors} from '../constants/colors';

export interface TabbarProps {
  title: string;
  titleStyleProps?: StyleProp<TextStyle>;
  onSeeMore?: () => void;
  showSeeMore?: boolean;
  renderSeemore?: ReactNode | string;
  tabbarStylesProps?: StyleProp<ViewStyle>;
}
const Tabbar = (props: TabbarProps) => {
  const {
    title,
    titleStyleProps,
    onSeeMore,
    showSeeMore,
    renderSeemore,
    tabbarStylesProps,
  } = props;

  return (
    <Row styles={[{marginBottom: 8}, tabbarStylesProps]}>
      <Col>
        <Text size={16} text={title} weight={'600'} styles={titleStyleProps} />
      </Col>
      {showSeeMore === false ? null : renderSeemore ? (
        typeof renderSeemore === 'string' ? (
          <TouchableOpacity onPress={onSeeMore}>
            <Text text={renderSeemore} color={colors.primary} size={14} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onSeeMore}>
            {renderSeemore}
          </TouchableOpacity>
        )
      ) : (
        <Button
          title="See more"
          onPress={onSeeMore ? () => onSeeMore() : () => undefined}
          type="link"
          inline
          textStyleProps={{
            fontSize: 14,
          }}
        />
      )}
    </Row>
  );
};

export default Tabbar;
