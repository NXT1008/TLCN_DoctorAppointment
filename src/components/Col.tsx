import { TouchableOpacity, type StyleProp, type ViewStyle } from 'react-native';
import React, { type ReactNode } from 'react';

type Props = {
  flex?: number;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const Col = (props: Props) => {
  const { flex, children, styles, onPress } = props;

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[{ flex: flex ?? 1 }, styles]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Col;
