import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {colors} from '../../../../constants/colors';
import {Button, Row, Space, TextComponent} from '../../../../components';

interface Props {
  visible: boolean;
  onPressOK: () => void;
  onPressCancel: () => void;
  patientName: string;
}

const ModalComponent = ({
  visible,
  onPressCancel,
  onPressOK,
  patientName,
}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirmation</Text>
          <Text style={styles.confirmText}>
            Confirm update of medical records for patient{' '}
            <Text style={styles.patientName}>{patientName}</Text> ?
          </Text>
          <Space height={10} />
          <TextComponent
            text="Please check the information carefully before continuing"
            textAlign="center"
            numberOfLine={3}
            styles={{
              fontFamily: fontFamilies.semiBold,
              fontSize: 14,
              color: colors.primary,
            }}
          />

          <View style={styles.buttonRow}>
            <Button
              title="Close"
              styles={{
                backgroundColor: colors.danger,
                paddingVertical: 12,
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
                paddingVertical: 12,
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
