import {View, Modal, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../../constants/colors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import SpecializationComponent from './SpecializationComponent'; // Component chuyên khoa đã được thiết kế
import {Button} from '../../../../components';
import {Specialization} from '../../../../models/Specialization';

interface Props {
  visible: boolean;
  specializations: Specialization[]; // Danh sách các chuyên khoa
  onClose: () => void;
  onSelectSpecialization?: (specialization: Specialization) => void; // Callback khi chọn chuyên khoa
}

const SpecializationModalComponent = (props: Props) => {
  const {visible, specializations, onClose, onSelectSpecialization} = props;
  const [selectedId, setSelectedId] = useState<string>(''); // Thêm state này

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            margin: 20,
            width: '90%',
            maxHeight: '80%', // Để modal không chiếm quá nhiều màn hình
            padding: 20,
            paddingHorizontal: 40,
            borderRadius: 20,
            backgroundColor: '#DEE3E7',
          }}>
          <Text
            style={{
              fontFamily: fontFamilies.bold,
              fontSize: 20,
              color: colors.primary,
              marginBottom: 20,
              textAlign: 'center',
            }}>
            Choose Specialization
          </Text>

          {/* Danh sách chuyên khoa */}
          <ScrollView>
            {/* Component "All" */}
            <SpecializationComponent
              data={{specializationId: 'All', name: 'All', image: ''}} // Đặt dữ liệu tên là "All" cho component
              onPress={() => {
                setSelectedId('All');
                if (onSelectSpecialization) {
                  onSelectSpecialization({
                    specializationId: 'All',
                    name: 'All',
                    image: '',
                  }); // Truyền 'All' để xác định chọn tất cả
                }
              }}
              isSelected={selectedId === 'All'}
              stylesCard={{
                justifyContent: 'flex-start',
                paddingHorizontal: 15,
              }}
            />

            {/* Danh sách từng chuyên khoa */}
            {specializations.map(specialization => (
              <SpecializationComponent
                key={specialization.specializationId}
                data={specialization}
                onPress={() => {
                  setSelectedId(specialization.specializationId);
                  if (onSelectSpecialization) {
                    onSelectSpecialization(specialization);
                  }
                }}
                isSelected={selectedId === specialization.specializationId}
                stylesCard={{
                  justifyContent: 'flex-start',
                  paddingHorizontal: 15,
                }}
              />
            ))}
          </ScrollView>

          <View style={{marginTop: 20, width: '80%', alignSelf: 'center'}}>
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

export default SpecializationModalComponent;
