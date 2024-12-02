import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import moduleName from '../assets/animations/payment_success.json'
import { fontFamilies } from '../constants/fontFamilies';

const url = '../assets/animations/success.json';
const URL = '../assets/animations/payment_success.json';

interface PopUpAnimationProps {
  visible: boolean; // Điều khiển hiển thị popup
  onComplete?: () => void; // Gọi khi animation hoàn tất
  content?: string;
}

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({
  visible,
  onComplete,
  content
}) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation mờ dần

  useEffect(() => {
    if (visible) {
      // Hiển thị với hiệu ứng fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Ẩn với hiệu ứng fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return visible ? (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <View style={styles.popup}>
        <LottieView
          source={require(url)} // Đường dẫn đến file JSON
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            if (onComplete) onComplete();
          }}
          style={styles.animation}
        />
        <Text style={styles.text}>{content ? `${content}` : `Operation Successful!` }</Text>
      </View>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  animation: {
    width: 150,
    height: 150,
  },
  text: {
    marginTop: 10,
    fontFamily: fontFamilies.semiBold,
    fontSize: 16,
    color: '#4caf50',
  },
});

export default PopUpAnimation;
