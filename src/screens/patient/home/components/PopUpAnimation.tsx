import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';


interface PopUpAnimationProps {
  visible: boolean;
  onComplete?: () => void;
  content?: string;
}

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({
  visible,
  onComplete,
  content,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
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
          source={require('../../../../assets/animations/success.json')}
          autoPlay
          loop={false}
          onAnimationFinish={onComplete}
          style={styles.animation}
        />
        <Text style={styles.text}>
          {content ? content : 'Login Successful!'}
        </Text>
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
    color: '#21a691',
  },
});

export default PopUpAnimation;
