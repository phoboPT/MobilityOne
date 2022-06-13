import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {icons, SIZES, COLORS, images} from '../constants';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import {vehicles, routes} from '../services/api';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../utils/language';
import {
  Select,
  NativeBaseProvider,
  Container,
  Box,
  Center,
  KeyboardAvoidingView,
} from 'native-base';

const styles = StyleSheet.create({
  container: {flexDirection: 'row', height: 50, zIndex: 1},
  container2: {flexDirection: 'column', height: 50, zIndex: 20},
});

const CreateCarPooling = ({navigation}) => {
  const [description, setDescription] = React.useState('');
  const [startLocation, setStartLocation] = React.useState('');
  const [endLocation, setEndLocation] = React.useState('');
  const [estimatedTime, setEstimatedTime] = React.useState(10);
  const [userVehicles, setUserVehicles] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [vehicle, setVehicle] = React.useState([]);
  const [capacities, setCapacities] = React.useState(null);
  const [capacity, setCapacity] = React.useState(null);
  const [userImage, setUserImage] = React.useState(null);
  const [vehicleChoosed, setVehicleChoosed] = React.useState(null);
  const [date, setDate] = useState(new Date());

  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);

  const [items, setItems] = useState([
    {label: 'ESTG', value: 'Escola Superior de Tecnologia e Gestão'},
    {label: 'ESE', value: 'Escola Superior de Educação'},
    {label: 'ESA', value: 'Escola Superior Agrária'},
    {label: 'ESS', value: 'Escola Superior de Saúde'},
    {label: 'ESDL', value: 'Escola Superior de Desporto e Lazer'},
    {label: 'ESCE', value: 'Escola Superior de Ciências Empresariais'},
    {label: 'SAS', value: 'Serviços Académicos'},
  ]);

  useEffect(() => {
    async function checkIfUserHasVehicles() {
      try {
        const response = await vehicles.get('/vehicles/me');
        if (response.data.length === 0) {
          Alert.alert(I18n.t('CREATECARPOOLING_needs_vehicle'), null, [
            {
              text: I18n.t('CREATECARPOOLING_cancel'),
              onPress: () => navigation.navigate('Home'),
              style: 'cancel',
            },
            {
              text: I18n.t('CREATECARPOOLING_add_vehicle'),
              onPress: () => navigation.navigate('CreateVehicle'),
            },
          ]);
        } else {
          setUserVehicles(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function getUserImage() {
      try {
        const value = await AsyncStorage.getItem('@App:userIMAGE');
        if (value !== null) {
          setUserImage(value);
        } else {
          setUserImage(
            'https://res.cloudinary.com/hegs/image/upload/v1625155512/default-user_amkn6r.png',
          );
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUserImage();
    checkIfUserHasVehicles();
  }, []);
  const validateInputs = () => {
    //Enviar dados
    if (
      description === null ||
      startLocation === '' ||
      endLocation === '' ||
      date == null ||
      vehicle == null ||
      capacity == null
    ) {
      Alert.alert(I18n.t('CREATECARPOOLING_missing_information'));
    } else {
      postCarPooling();
    }
  };

  const postCarPooling = async () => {
    try {
      await routes.post('/routes', {
        type: '2',
        startLocation: startLocation,
        endLocation: endLocation,
        vehicleId: vehicle,
        state: 'AVAILABLE',
        description: description,
        estimatedTime: estimatedTime,
        startDate: date,
        userImage: userImage,
        capacity: capacity,
      });
      Alert.alert(I18n.t('CREATECARPOOLING_success'));
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert(I18n.t('CREATECARPOOLING_error'));
    }
  };

  const carPoolingCapacity = async idVehicle => {
    setVehicle(idVehicle);
    var capacityList = [];
    var arrayOfObjects = [];
    var vehicleCapacity = 0;

    // Find Vehicle Capacity By ID
    for (var i = 0; i < userVehicles.length; i++) {
      if (userVehicles[i].id === idVehicle) {
        vehicleCapacity = userVehicles[i].capacity;
      }
    }

    // Generate Numbers from Max Capacity to 2 (Driver + Someone is the Minimum Value)
    capacityList = Array(vehicleCapacity - 1)
      .fill()
      .map((d, i) => i + 2);

    // For each element create an object to push to array so we can list on Dropdown
    capacityList.forEach(element => {
      arrayOfObjects.push({value: element, label: element});
    });

    setCapacities(arrayOfObjects);
    setVehicleChoosed(true);
  };
  function renderHeader() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 1,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            paddingRight: 35,

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 24, fontWeight: '400'}}>
            {I18n.t('CREATECARPOOLING_title')}
          </Text>
        </View>
      </View>
    );
  }

  function renderCreateCarPooling() {
    return (
      <Center>
        <Box>
          <Select
            value={startLocation}
            minWidth="300"
            mx={{
              base: 0,
              md: 'auto',
            }}
            accessibilityLabel={"I18n.t('HOME_dropdown_placeholder_start')"}
            placeholder={I18n.t('HOME_dropdown_placeholder_start')}
            items={items}
            onValueChange={itemValue => setStartLocation(itemValue)}
            _selectedItem={{
              bg: 'cyan.600',
            }}>
            <Select.Item
              label="Escola Superior de Tecnologia e Gestão"
              value="ESTG"
              lat="41.693463"
              long="-8.846654"
            />
            <Select.Item
              label="Escola Superior de Educação"
              value="ESE"
              lat="41.702491"
              long="-8.820698"
            />
            <Select.Item
              label="Escola Superior Agrária"
              value="ESA"
              lat="41.793549"
              long="-8.54277"
            />
            <Select.Item
              label="Escola Superior de Saúde"
              value="ESS"
              lat="41.697553"
              long="-8.836266"
            />
            <Select.Item
              label="Escola Superior de Desporto e Lazer"
              value="ESDL"
              lat="42.117427"
              long="-8.271185"
            />
            <Select.Item
              label="Escola Superior de Ciências Empresariais"
              value="ESCE"
              lat="42.031629"
              long="-8.632825"
            />
            <Select.Item
              label="Serviços Académicos"
              value="SAS"
              lat="41.693286"
              long="-8.832566"
            />
          </Select>
          <Select
            value={endLocation}
            minWidth="300"
            mx={{
              base: 0,
              md: 'auto',
            }}
            accessibilityLabel={I18n.t('HOME_dropdown_placeholder_start')}
            placeholder={I18n.t('HOME_dropdown_placeholder_start')}
            items={items}
            onValueChange={itemValue => setEndLocation(itemValue)}
            _selectedItem={{
              bg: 'cyan.600',
            }}>
            <Select.Item
              label="Escola Superior de Tecnologia e Gestão"
              value="ESTG"
              lat="41.693463"
              long="-8.846654"
            />
            <Select.Item
              label="Escola Superior de Educação"
              value="ESE"
              lat="41.702491"
              long="-8.820698"
            />
            <Select.Item
              label="Escola Superior Agrária"
              value="ESA"
              lat="41.793549"
              long="-8.54277"
            />
            <Select.Item
              label="Escola Superior de Saúde"
              value="ESS"
              lat="41.697553"
              long="-8.836266"
            />
            <Select.Item
              label="Escola Superior de Desporto e Lazer"
              value="ESDL"
              lat="42.117427"
              long="-8.271185"
            />
            <Select.Item
              label="Escola Superior de Ciências Empresariais"
              value="ESCE"
              lat="42.031629"
              long="-8.632825"
            />
            <Select.Item
              label="Serviços Académicos"
              value="SAS"
              lat="41.693286"
              long="-8.832566"
            />
          </Select>

          <Text />
          {/* {vehicle && (
            <Select
              minWidth="300"
              mx={{
                base: 0,
                md: 'auto',
              }}
              items={vehicle}
              accessibilityLabel={I18n.t('HOME_dropdown_car')}
              placeholder={I18n.t('HOME_dropdown_car')}
              onValueChange={itemValue => setVehicleChoosed(itemValue)}
              _selectedItem={{
                bg: 'cyan.600',
              }}>
              <Select.Item
                label="Serviços Académicos"
                value="SAS"
                lat="41.693286"
                long="-8.832566"
              />
              {vehicle.map(item => {
                return <Select.Item label="23" value={item.id} />;
              })}
            </Select>
          )} */}

          <Select
            value={vehicleChoosed}
            minWidth="300"
            mx={{
              base: 0,
              md: 'auto',
            }}
            items={vehicle}
            accessibilityLabel={I18n.t('HOME_dropdown_car')}
            placeholder={I18n.t('HOME_dropdown_car')}
            onValueChange={itemValue => setVehicleChoosed(itemValue)}
            _selectedItem={{
              bg: 'cyan.600',
            }}>
            <Select.Item
              label="Serviços Académicos"
              value="SAS"
              lat="41.693286"
              long="-8.832566"
            />
            {vehicle.map(item => {
              console.log(item);
              return <Input label="23" value={item.id} />;
            })}
          </Select>

          <Text
            style={{
              alignSelf: 'center',
              fontSize: SIZES.body2,
              marginBottom: 15,
              fontWeight: '400',
              color: COLORS.black,
            }}>
            {I18n.t('CREATECARPOOLING_estimatedTime')}
          </Text>
          <NumericInput
            value={estimatedTime}
            onChange={value => setEstimatedTime(value)}
            onLimitReached={() => Alert.alert(I18n.t('CREATECARPOOLING_alert'))}
            totalWidth={240}
            editable
            minValue={10}
            totalHeight={50}
            iconSize={25}
            step={5}
            containerStyle={{
              marginBottom: 17,
            }}
            valueType="real"
            rounded
            textColor="black"
            iconStyle={{color: 'white'}}
            rightButtonBackgroundColor={COLORS.primary}
            leftButtonBackgroundColor={COLORS.gray}
          />

          <Input
            style={{
              width: '300px',
            }}
            variant="outline"
            placeholder={I18n.t('CREATECARPOOLING_description')}
            multiline
          />

          <DatePicker
            collapsable
            minimumDate={new Date()}
            locale="pt"
            is24hourSource="locale"
            androidVariant="iosClone"
            date={date}
            onDateChange={setDate}
          />

          <Button
            onPress={() => validateInputs()}
            buttonStyle={{
              backgroundColor: COLORS.primary,
              borderRadius: 10,
            }}
            titleStyle={{color: COLORS.white}}
            icon={
              <Icon
                name="chevron-circle-down"
                style={{marginLeft: 10}}
                size={28}
                color="white"
              />
            }
            iconRight
            title={I18n.t('CREATECARPOOLING_create')}
          />
        </Box>
      </Center>
    );
  }

  return (
    <NativeBaseProvider>
      <ImageBackground
        style={{flex: 1, resizeMode: 'cover'}}
        source={images.background}>
        {loading ? (
          <View>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <>
            {renderHeader()}
            {renderCreateCarPooling()}
          </>
        )}
      </ImageBackground>
    </NativeBaseProvider>
  );
};

export default CreateCarPooling;
