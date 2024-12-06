import firestore from '@react-native-firebase/firestore';
import {ArrowLeft2} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Card,
  Divider,
  Section,
  Space,
  TextComponent,
} from '../../../../components';
import Container from '../../../../components/ContainerComponent';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {HealthReport} from '../../../../models/HealthReports';
import {Doctor} from '../../../../models/Doctor';
import {DateTime} from '../../../../utils/DateTime';
import auth from '@react-native-firebase/auth';

const HealthReportScreen = ({navigation}: any) => {
  const [reports, setReports] = useState<HealthReport[]>([]);
  const [doctors, setDoctors] = useState<{[key: string]: Doctor}>({});

  useEffect(() => {
    const userId = auth().currentUser?.uid;

    // Subscribe to health reports
    const unsubscribeReports = firestore()
      .collection('health_reports')
      .where('patientId', '==', userId)
      .onSnapshot(
        async snapshot => {
          const reportsData = snapshot.docs.map(doc => ({
            ...doc.data(),
            healthReportId: doc.id,
            dateOfDischarge: new Date(doc.data().dateOfDischarge.seconds * 1000),
          })) as HealthReport[];
          setReports(reportsData);

          // Fetch doctors' information
          const doctorIds = [
            ...new Set(reportsData.map(report => report.doctorId)),
          ];
          const doctorsData: {[key: string]: Doctor} = {};

          await Promise.all(
            doctorIds.map(async doctorId => {
              const doctorDoc = await firestore()
                .collection('doctors')
                .doc(doctorId)
                .get();
              if (doctorDoc.exists) {
                doctorsData[doctorId] = doctorDoc.data() as Doctor;
              }
            }),
          );

          setDoctors(doctorsData);
        },
        error => {
          console.error('Error listening to reports:', error);
        },
      );

    // Cleanup subscription
    return () => unsubscribeReports();
  }, []);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 20,
          paddingTop: 20,
        }}>
        <Section
          styles={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Medical Reports History</Text>
        </Section>

        {reports.map((report, index) => (
          <Card
            key={report.healthReportId}
            styles={{marginBottom: 16, marginHorizontal: 0}}>
            <TextComponent
              font={fontFamilies.semiBold}
              size={16}
              color="#1c77ff"
              text={`Medical Report #${index + 1}`}
              textAlign="center"
              styles={{marginBottom: 10}}
            />

            <View style={styles.cardRow}>
              <TextComponent
                text="Doctor:"
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text style={styles.cardValue}>
                {doctors[report.doctorId]?.name || 'Unknown Doctor'}
              </Text>
            </View>
            <Divider styles={{marginVertical: 8}} />

            <View style={styles.cardRow}>
              <TextComponent
                text="Date of Discharge:"
                font={fontFamilies.semiBold}
                color="#333"
              />
              <Text style={styles.cardValue}>
                {DateTime.dateToDateString(report.dateOfDischarge)}
              </Text>
            </View>
            <Divider styles={{marginVertical: 8}} />

            <TextComponent
              text="History and Physical Assessment"
              font={fontFamilies.semiBold}
              color="#333"
              size={14}
            />
            <Space height={5} />
            <Text style={styles.contentText}>{report.histoty}</Text>

            <Space height={10} />

            <TextComponent
              text="Treatment Plan"
              font={fontFamilies.semiBold}
              color="#333"
              size={14}
            />
            <Space height={5} />
            <Text style={styles.contentText}>{report.planTreatment}</Text>

            <Space height={10} />

            <TextComponent
              text="Condition at Discharge"
              font={fontFamilies.semiBold}
              color="#333"
              size={14}
            />
            <Space height={5} />
            <Text style={styles.contentText}>{report.conditon}</Text>
          </Card>
        ))}

        {reports.length === 0 && (
          <TextComponent
            text="No medical reports available"
            font={fontFamilies.regular}
            size={14}
            color="#666"
            textAlign="center"
          />
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#21a691',
    fontFamily: 'Poppins-Bold',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  cardValue: {
    fontFamily: fontFamilies.regular,
    color: '#333',
  },
  contentText: {
    fontFamily: fontFamilies.regular,
    color: '#333',
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 8,
  },
});

export default HealthReportScreen;
