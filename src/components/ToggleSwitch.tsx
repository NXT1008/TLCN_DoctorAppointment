import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface Props {
  isOn: boolean; // Trạng thái bật/tắt ban đầu
  onToggle: (isOn: boolean) => void; // Hàm được gọi khi người dùng chuyển đổi toggle
  onColor?: string; // Màu khi bật
  offColor?: string; // Màu khi tắt
  size?: 'large' | 'medium' | 'small'; // Kích thước toggle
  label?: string; // Nhãn của toggle
  labelStyle?: StyleProp<TextStyle>; // Style cho nhãn
  thumbOnStyle?: StyleProp<ViewStyle>; // Style cho thumb khi bật
  thumbOffStyle?: StyleProp<ViewStyle>; // Style cho thumb khi tắt
  trackOnStyle?: StyleProp<ViewStyle>; // Style cho track khi bật
  trackOffStyle?: StyleProp<ViewStyle>; // Style cho track khi tắt
  disabled?: boolean; // Vô hiệu hóa toggle
  circleColor?: string; // Màu vòng tròn
  animationSpeed?: number; // Tốc độ animation
  useNativeDriver?: boolean; // Sử dụng Native Driver cho animation
}

// Component ToggleSwitch với props có giá trị cố định (mặc định)
const ToggleSwitch = ({
  isOn = false, // Giá trị mặc định cho isOn là false
  onToggle,
  onColor = '#4cd137', // Màu khi bật mặc định là màu xanh lá
  offColor = '#dcdde1', // Màu khi tắt mặc định là màu xám
  size = 'medium', // Kích thước mặc định là 'medium'
  label = '', // Nhãn mặc định là rỗng
  labelStyle = {}, // Style mặc định cho nhãn là một object rỗng
  thumbOnStyle = {}, // Style mặc định cho thumb khi bật là rỗng
  thumbOffStyle = {}, // Style mặc định cho thumb khi tắt là rỗng
  trackOnStyle = {}, // Style mặc định cho track khi bật là rỗng
  trackOffStyle = {}, // Style mặc định cho track khi tắt là rỗng
  disabled = false, // Mặc định không vô hiệu hóa toggle
  circleColor = '#fff', // Màu mặc định của vòng tròn là trắng
  animationSpeed = 200, // Tốc độ animation mặc định là 200ms
  useNativeDriver = true, // Mặc định sử dụng Native Driver
}: Props) => {
  const [toggleStatus, setToggleStatus] = useState(isOn);
  const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));

  const handleToggle = () => {
    if (disabled) return;

    setToggleStatus(!toggleStatus);
    Animated.timing(animatedValue, {
      toValue: toggleStatus ? 0 : 1,
      duration: animationSpeed,
      useNativeDriver,
    }).start();

    if (onToggle) {
      onToggle(!toggleStatus);
    }
  };

  // Kích thước động dựa trên prop `size`
  // const toggleSize = {
  //   small: {width: 40, height: 20, circleSize: 18},
  //   medium: {width: 60, height: 30, circleSize: 28},
  //   large: {width: 80, height: 40, circleSize: 38},
  // }[size];
  const toggleSize = {
    small: {width: 40, height: 20, circleSize: 14}, // Nhỏ hơn so với track
    medium: {width: 60, height: 30, circleSize: 24}, // Nhỏ hơn so với track
    large: {width: 80, height: 40, circleSize: 32}, // Nhỏ hơn so với track
  }[size];

  const circlePosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, toggleSize.width - toggleSize.circleSize - 6], // trái và phải
  });

  return (
    <View style={styles.container}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      <TouchableWithoutFeedback onPress={handleToggle}>
        <View
          style={[
            styles.track,
            {
              width: toggleSize.width,
              height: toggleSize.height,
              backgroundColor: toggleStatus ? onColor : offColor,
            },
            toggleStatus ? trackOnStyle : trackOffStyle, // Áp dụng style cho track
          ]}>
          <Animated.View
            style={[
              styles.circle,
              {
                width: toggleSize.circleSize,
                height: toggleSize.circleSize,
                backgroundColor: circleColor,
                transform: [{translateX: circlePosition}],
              },
              toggleStatus ? thumbOnStyle : thumbOffStyle, // Áp dụng style cho thumb
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

// StyleSheet cho ToggleSwitch
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
  track: {
    borderRadius: 20,
    justifyContent: 'center',
    padding: 2,
  },
  circle: {
    borderRadius: 50,
  },
});

export default ToggleSwitch;
