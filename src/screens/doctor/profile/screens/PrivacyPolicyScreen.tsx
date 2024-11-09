import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ContainerComponent,
  Section,
  TextComponent,
  Row,
  Button,
} from '../../../../components';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {ArrowLeft2} from 'iconsax-react-native';

const PrivacyPolicyScreen = ({navigation}: any) => {
  return (
    <ContainerComponent isScroll>
      <Section>
        <Row justifyContent="flex-start">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowLeft2 color="#000" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextComponent
              text="Privacy Policy"
              size={22}
              font={fontFamilies.semiBold}
              color="#0B8FAC"
            />
          </View>
        </Row>
      </Section>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextComponent
          text="1. Data Collection"
          size={18}
          font={fontFamilies.semiBold}
          styles={styles.sectionTitle}
        />
        <TextComponent
          text="We collect personal information that you provide to us when you register, use the app, and book appointments..."
          size={14}
          font={fontFamilies.regular}
          styles={styles.sectionText}
        />

        <TextComponent
          text="2. Data Usage"
          size={18}
          font={fontFamilies.semiBold}
          styles={styles.sectionTitle}
        />
        <TextComponent
          text="Your data is used to provide and improve the services of our app, such as booking appointments and managing your health records..."
          size={14}
          font={fontFamilies.regular}
          styles={styles.sectionText}
        />

        <TextComponent
          text="3. Data Sharing"
          size={18}
          font={fontFamilies.semiBold}
          styles={styles.sectionTitle}
        />
        <TextComponent
          text="We do not share your personal data with third parties except as required by law or with your consent..."
          size={14}
          font={fontFamilies.regular}
          styles={styles.sectionText}
        />

        <TextComponent
          text="4. Security"
          size={18}
          font={fontFamilies.semiBold}
          styles={styles.sectionTitle}
        />
        <TextComponent
          text="We take data security seriously and implement appropriate security measures to protect your personal information..."
          size={14}
          font={fontFamilies.regular}
          styles={styles.sectionText}
        />

        <TextComponent
          text="5. Changes to Policy"
          size={18}
          font={fontFamilies.semiBold}
          styles={styles.sectionTitle}
        />
        <TextComponent
          text="We may update this Privacy Policy from time to time. You will be notified of any changes via the app or email..."
          size={14}
          font={fontFamilies.regular}
          styles={styles.sectionText}
        />
      </ScrollView>
      <Button
        color="#0B8FAC"
        title="I agree"
        onPress={() => {
          navigation.goBack();
        }}
        styles={{marginHorizontal: 20}}
        textStyleProps={{fontFamily: fontFamilies.semiBold, fontSize: 16}}
      />
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 5,
  },
  sectionText: {
    marginBottom: 15,
  },
});

export default PrivacyPolicyScreen;
