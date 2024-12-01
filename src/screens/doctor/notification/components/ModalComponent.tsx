import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {colors} from '../../../../constants/colors';
import {Button, Space, TextComponent} from '../../../../components';
import {Notification} from '../../../../models/Notification';
import {Appointment} from '../../../../models/Appointment';

interface NotificationWithAppointment {
  notification: Notification;
  appointment: Appointment;
}

interface Props {
  visible: boolean;
  onPressCancel: () => void;
  notification: NotificationWithAppointment;
}

const ModalComponent = ({
  visible,
  onPressCancel,
  notification,
}: Props) => {
  const {notification: notif, appointment} = notification;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Notification Details</Text>

          {/* Hiển thị thông tin notification */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Title:</Text>
            <Text
              style={{
                fontFamily: fontFamilies.semiBold,
                fontSize: 14,
                color: '#000',
                flex: 1,
              }}>
              {notif.title || 'N/A'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Message:</Text>
            <Text style={styles.infoValue}>{notif.body || 'N/A'}</Text>
          </View>

          {/* Hiển thị thông tin appointment */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Doctor:</Text>
            <Text style={styles.infoValue}>
              {notif.name || 'N/A'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>
              {appointment.scheduleDate
                ? appointment.scheduleDate.toLocaleDateString()
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>{appointment.status || 'N/A'}</Text>
          </View>
          {appointment.status === 'Completed' && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Download:</Text>
              <Text
                style={{
                  fontFamily: fontFamilies.semiBold,
                  fontSize: 14,
                  color: '#00bcf5',
                  flex: 1,
                }}>
                Health Report
              </Text>
            </View>
          )}
          {/* Buttons */}
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
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    color: colors.primary,
    width: 120,
  },
  infoValue: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    width: '80%',
    justifyContent: 'space-between',
  },
});

export default ModalComponent;
