import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {colors} from '../../../../constants/colors';
import {Button, Row, Space, TextComponent} from '../../../../components';

interface Props {
  visible: boolean;
  onPressOK: () => void;
  onPressCancel: () => void;
}

const ModalComponent = ({
  visible,
  onPressCancel,
  onPressOK,
}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirmation</Text>
          <Space height={10} />
          <TextComponent
            text="Do you really confirm to cancel this appointment?"
            textAlign="center"
            numberOfLine={3}
            styles={{
              fontFamily: fontFamilies.semiBold,
              fontSize: 16,
              color: colors.primary,
            }}
          />

          <View style={styles.buttonRow}>
            <Button
              title="Cancel"
              styles={{
                backgroundColor: colors.danger,
                paddingVertical: 8,
                flex: 1,
                marginHorizontal: 5,
              }}
              textStyleProps={{
                fontFamily: fontFamilies.semiBold,
                fontSize: 14,
                color: '#fff',
              }}
              onPress={onPressCancel}
            />
            <Button
              title="OK"
              styles={{
                backgroundColor: colors.success,
                paddingVertical: 8,
                flex: 1,
                marginHorizontal: 5,
              }}
              textStyleProps={{
                fontFamily: fontFamilies.semiBold,
                fontSize: 14,
                color: '#fff',
              }}
              onPress={onPressOK}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    margin: 20,
    width: '90%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
  },
  patientName: {
    fontFamily: fontFamilies.bold,
    color: 'orange', // Đặt màu khác cho tên bệnh nhân
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default ModalComponent;
