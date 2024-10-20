import React, {ReactNode} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Modal from 'react-native-modal';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appInfo} from '../../../constants/appInfos';
import {Card, Row, Space} from '../../../components';

interface Props {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  icon?: ReactNode; // Tùy biến icon
  type?: 'one-button' | 'two-button'; // Loại modal (1 nút OK hoặc 2 nút OK/Cancel)
}

const ModalComponent = (props: Props) => {
  const {
    isVisible,
    message,
    onConfirm,
    onCancel,
    icon,
    type = 'two-button',
  } = props;

  // Animation nhấp nháy cho icon
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'zoomInUp'}
      animationOut={'zoomOutUp'}>
      <Card styles={styles.modalContent}>
        <Row justifyContent="space-between" alignItems="stretch">
          {/* Hiển thị message */}
          <Text style={styles.message}>{message}</Text>
          <Space width={10} />
          {/* Icon với animation nhấp nháy */}
          {icon && (
            <Animated.View style={{opacity: fadeAnim}}>{icon}</Animated.View>
          )}
        </Row>

        {/* Các nút điều khiển */}
        <View style={styles.buttonContainer}>
          {type === 'two-button' && (
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onConfirm} style={styles.button}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    padding: 8,
    backgroundColor: '#0B8FAC',
    borderRadius: 10,
    flex: 0.5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: fontFamilies.regular,
  },
});

export default ModalComponent;
