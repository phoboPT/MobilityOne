import React, {useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  NativeModules,
  Text,
} from 'react-native';
import {NativeBaseProvider, View, Image} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../utils/language';

import {COLORS, SIZES, images} from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

import {request, PERMISSIONS} from 'react-native-permissions';
const {HAR_Module} = NativeModules;

const Onboarding = ({navigation}) => {
  // Render

  useEffect(() => {
    async function setAR() {
      request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(result => {
        console.log(result);
      });
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
        console.log(result);
      });
      const isChecked = await AsyncStorage.getItem('@App:activityRequest');
      if (isChecked === 'true') {
        HAR_Module.HAR_Begin_Service();
      } else {
        HAR_Module.HAR_Stop_Service();
      }
    }

    setAR();
  });

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{alignItems: 'center', marginHorizontal: SIZES.padding}}>
            <Text />
            <Text style={{fontWeight: '600', fontSize: 45}}>
              {I18n.t('APP_name')}
            </Text>
            <Text
              style={{
                color: COLORS.gray,
                marginTop: SIZES.padding,
                textAlign: 'center',
                fontSize: 15,
              }}>
              {I18n.t('ONBOARDING_title')}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.shadow,
              {
                marginTop: SIZES.padding * 2,
                width: '70%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onPress={() => navigation.navigate('AuthLoading')}>
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
              }}
              colors={['#46aeff', '#5884ff']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={{color: COLORS.white}}>
                {I18n.t('ONBOARDING_start')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Onboarding;
