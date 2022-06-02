import React, {useState, useEffect} from 'react';
import {NativeModules} from 'react-native';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import ActivityDB from './ActivityDBModule';
import {View, Button, Center, Container, Switch, ScrollView} from 'native-base';
import {icons, SIZES} from '../constants/index';
import I18n from '../utils/language';
import AsyncStorage from '@react-native-community/async-storage';
const {HAR_Module} = NativeModules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 30,
    height: 30,
  },
  view: {flexDirection: 'row', height: 40},
  touchable: {
    width: 50,
    paddingLeft: SIZES.padding * 1,
    justifyContent: 'center',
  },
  view_2: {
    borderRadius: 20,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable_2: {
    borderRadius: 20,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_settings: {
    fontSize: 24,
    fontWeight: '400',
  },
});

const SettingsScreen = ({navigation}) => {
  const [checked, setCheked] = useState(false);

  useEffect(() => {
    async function setAR() {
      const isChecked = await AsyncStorage.getItem('@App:activityRequest');
      if (isChecked === 'true') {
        setCheked(true);
      } else {
        setCheked(false);
      }
    }

    setAR();
  });

  const manageAR = async () => {
    if (!checked) {
      HAR_Module.HAR_Begin_Service();
      await AsyncStorage.setItem('@App:activityRequest', 'true');
    } else {
      HAR_Module.HAR_Stop_Service();
      await AsyncStorage.setItem('@App:activityRequest', 'false');
    }
    setCheked(!checked);
  };
  // const registerUser = () => {
  //   UserProfileModule.Set_User_ID('UserID');
  //   UserProfileModule.Set_User_Name('Teste');
  //   UserProfileModule.Set_User_BirthDate('19920813');
  //   UserProfileModule.Set_User_Gender('m');
  //   UserProfileModule.Set_User_Height('165');
  //   UserProfileModule.Set_User_Weight('65');
  //   UserProfileModule.Set_Health_Activity_Risk('3');
  // };

  const renderHeader = () => {
    return (
      <View style={styles.view}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.touchable}>
          <Image
            source={icons.menu}
            resizeMode="contain"
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.view_2}>
          <Text style={styles.text_settings}>{I18n.t('SETTINGS_title')}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}

      <Center>
        <Container>
          <ScrollView h="80">
            <Center>
              <Text />
              <Text>
                {I18n.t('SETTINGS_activity')}
                <Switch
                  size="md"
                  onToggle={() => manageAR()}
                  isChecked={checked}
                />
              </Text>

              <Text> </Text>
              <Button onPress={() => navigation.navigate('Survey')}>
                {I18n.t('SETTINGS_survey')}
              </Button>
            </Center>
            <Text> </Text>
            <ActivityDB />
            <Text />

            <Text />
          </ScrollView>
        </Container>
      </Center>
    </View>
  );
};

export default SettingsScreen;
