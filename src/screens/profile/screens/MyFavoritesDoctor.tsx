import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  Row,
  Section,
  TextComponent,
} from '../../../components';
import {ArrowLeft2, Warning2} from 'iconsax-react-native';
import {fontFamilies} from '../../../constants/fontFamilies';
import DoctorComponent from '../components/DoctorComponent';
import firestore, {doc} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Doctor} from '../../../models/Doctor';
import {Patient} from '../../../models/Patient';
import ModalComponent from '../components/ModalComponent';

const MyFavoritesDoctor = (props: any) => {
  const patientId = auth().currentUser?.uid;
  const [favoriteDoctors, setFavoriteDoctors] = useState<Doctor[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [doctorIdToRemove, setDoctorIdToRemove] = useState<string | null>(null);

  useEffect(() => {
    getFavoriteDoctors();
  }, []);

  // Hàm lấy danh sách bác sĩ yêu thích của bệnh nhân
  const getFavoriteDoctors = async () => {
    try {
      // Lấy danh sách favoriteDoctors từ bệnh nhân
      const tmp = await firestore()
        .collection('patients')
        .doc(patientId)
        .get();
      const favoriteDoctorIds =
        (tmp.data()?.favoriteDoctors as string[]) || [];

      // Lấy chi tiết từng bác sĩ dựa trên doctorId trong danh sách favoriteDoctors
      const doctorPromises = favoriteDoctorIds.map(async doctorId => {
        const doctorDoc = await firestore()
          .collection('doctors')
          .doc(doctorId)
          .get();
        return {
          doctorId: doctorDoc.id,
          ...doctorDoc.data(),
        } as Doctor;
      });

      // Chờ tất cả các Promise hoàn thành và trả về danh sách bác sĩ yêu thích
      const items = await Promise.all(doctorPromises);
      setFavoriteDoctors(items);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bác sĩ yêu thích:', error);
    }
  };

  // Hàm xóa bác sĩ khỏi danh sách yêu thích
  const removeFavoriteDoctor = async () => {
    if (doctorIdToRemove) {
      try {
        await firestore()
          .collection('patients')
          .doc(patientId)
          .update({
            favoriteDoctors: firestore.FieldValue.arrayRemove(doctorIdToRemove),
          });

        // Cập nhật danh sách bác sĩ yêu thích mà không cần sửa đổi patientDoc
        setFavoriteDoctors(prevDoctors =>
          prevDoctors.filter(doc => doc.doctorId !== doctorIdToRemove),
        );

        // Đặt lại giá trị modal
        setDoctorIdToRemove(null);
        setModalVisible(false);
      } catch (error) {
        console.error('Lỗi khi xóa bác sĩ yêu thích:', error);
      }
    }
  };

  // Hàm hiển thị modal xác nhận xóa
  const confirmRemoveDoctor = (doctorId: string) => {
    setDoctorIdToRemove(doctorId);
    setModalVisible(true);
  };

  return (
    <ContainerComponent isScroll>
      <Section styles={{marginBottom: 15}}>
        <Row justifyContent="flex-start">
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="Favorites Doctors"
              size={20}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <Section>
        {favoriteDoctors.map((item, index) => (
          <DoctorComponent
            key={index}
            data={item}
            onPress={() => {
              confirmRemoveDoctor(item.doctorId);
            }}
          />
        ))}
      </Section>
      <ModalComponent
        isVisible={modalVisible}
        message="Do you want to exit?"
        onConfirm={removeFavoriteDoctor}
        onCancel={() => {
          setModalVisible(false);
        }}
        icon={<Warning2 color="#798001" size={30} />}
      />
    </ContainerComponent>
  );
};

export default MyFavoritesDoctor;
