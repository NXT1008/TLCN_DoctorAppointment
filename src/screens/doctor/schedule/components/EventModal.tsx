import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {colors} from '../../../../constants/colors';
import {Button, Row, Space} from '../../../../components';
import { DateTime } from '../../../../utils/DateTime';

interface EventProp {
  courseId: string;
  day: number;
  startTime: string;
  endTime: string;
  color?: string;
  title?: string;
  location?: string;
  section?: string;
  groupIndex?: number;
}

interface EventModalProps {
  visible: boolean;
  event: EventProp | null;
  onClose: () => void;
}

const EventModal = ({visible, event, onClose}: EventModalProps) => {
  if (!event) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Event Details</Text>

          {/* Thông tin event */}
          <View style={styles.eventDetails}>
            <Row justifyContent="space-between">
              <Text style={styles.label}>Title:</Text>
              <Text style={styles.value}>{event.title || 'No Title'}</Text>
            </Row>
            <Row justifyContent="space-between">
              <Text style={styles.label}>Day:</Text>
              <Text style={styles.value}>{DateTime.convertDayToText(event.day)}</Text>
            </Row>
            <Row justifyContent="space-between">
              <Text style={styles.label}>Start Time:</Text>
              <Text style={styles.value}>{event.startTime}</Text>
            </Row>
            <Row justifyContent="space-between">
              <Text style={styles.label}>End Time:</Text>
              <Text style={styles.value}>{event.endTime}</Text>
            </Row>
            <Row justifyContent="space-between">
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.value}>
                {event.location || 'Not Provided'}
              </Text>
            </Row>
            <Row justifyContent="space-between">
              <Text style={styles.label}>Section:</Text>
              <Text style={styles.value}>{event.section || 'None'}</Text>
            </Row>
            <Row justifyContent="space-between">
              <Text style={styles.label}>Group Index:</Text>
              <Text style={styles.value}>
                {event.groupIndex !== undefined ? event.groupIndex : 'None'}
              </Text>
            </Row>
          </View>

          {/* Button đóng modal */}
          <View style={styles.closeButtonContainer}>
            <Button
              title="Close"
              styles={{
                backgroundColor: colors.danger,
                paddingVertical: 12,
              }}
              textStyleProps={{
                fontFamily: fontFamilies.semiBold,
                fontSize: 14,
                color: '#fff',
              }}
              onPress={onClose}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    width: '90%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  eventDetails: {
    marginBottom: 20,
  },
  label: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    color: colors.primary,
  },
  value: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 16,
    color: colors.primary,
  },
  closeButtonContainer: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
});

export default EventModal;
