import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

const images = {
  home: require('../../../assets/images/home.png'),
  diagnose: require('../../../assets/images/diagnose.png'),
  notification: require('../../../assets/images/notification.png'),
  setting: require('../../../assets/images/setting.png'),
};

type ScreenNames = 'Home' | 'AppointmentHistory' | 'Notification' | 'Setting';

const BottomNavigation = () => {
  const [isHomeActive, setIsHomeActive] = useState(true);
  const [isAppointmentActive, setIsAppointmentActive] = useState(false);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [isSettingActive, setIsSettingActive] = useState(false);

  const handleNavPress = (screen: ScreenNames) => {
    setIsHomeActive(false);
    setIsAppointmentActive(false);
    setIsNotificationActive(false);
    setIsSettingActive(false);

    switch (screen) {
      case 'Home':
        setIsHomeActive(true);
        break;
      case 'AppointmentHistory':
        setIsAppointmentActive(true);
        break;
      case 'Notification':
        setIsNotificationActive(true);
        break;
      case 'Setting':
        setIsSettingActive(true);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem} onPress={() => {}}>
        <Image
          source={images.home}
          style={[styles.icon, isHomeActive && styles.activeIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => {}}>
        <Image
          source={images.diagnose}
          style={[styles.icon, isAppointmentActive && styles.activeIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => {}}>
        <Image
          source={images.notification}
          style={[styles.icon, isNotificationActive && styles.activeIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => {}}>
        <Image
          source={images.setting}
          style={[styles.icon, isSettingActive && styles.activeIcon]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 29,
    tintColor: '#27403e',
  },
  activeIcon: {
    tintColor: '#21a691',
    transform: [{scale: 1.2}],
  },
});
