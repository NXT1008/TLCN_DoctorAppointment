import React from 'react';
import {
  Modal,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import {Button, Row, Space} from '../../../components';
import { Star } from 'iconsax-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectRating: (range: [number, number]) => void;
}

const ratingRanges: Array<{label: string; range: [number, number]}> = [
  {label: '4 - 5 stars', range: [4, 5]},
  {label: '3 - 4 stars', range: [3, 4]},
  {label: '2 - 3 stars', range: [2, 3]},
  {label: '1 - 2 stars', range: [1, 2]},
];

const RatingModal = ({visible, onClose, onSelectRating}: RatingModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Rating Range</Text>

          <ScrollView>
            {ratingRanges.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.ratingItem}
                onPress={() => {
                  onSelectRating(item.range);
                  onClose();
                }}>
                <Row justifyContent="flex-start" alignItems="baseline">
                  <FontAwesome name="star" size={20} color={'#ffff21'} />
                  <Space width={10} />
                  <Text style={styles.ratingText}>{item.label}</Text>
                </Row>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.closeButtonContainer}>
            <Button
              title="Close"
              styles={{
                backgroundColor: '#a82700',
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
    maxHeight: '80%',
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    backgroundColor: '#DEE3E7',
  },
  modalTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  ratingItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ratingText: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    color: colors.primary,
  },
  closeButtonContainer: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
});

export default RatingModal;
