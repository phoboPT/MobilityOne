import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {icons, SIZES, COLORS, images} from '../constants';
import {Button as ButtonNative, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import {vehicles, routes} from '../services/api';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../utils/language';
import {
  Select,
  NativeBaseProvider,
  Button,
  Center,
  View,
  Text,
  Image,
  Alert,
  CheckIcon,
  FormControl,
  Modal,
} from 'native-base';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const google_api_key = 'AIzaSyDH_jy13qugt-fXmVxtENy6n-BozWpBpUQ';
const styles = StyleSheet.create({
  container: {flexDirection: 'row', height: 50, zIndex: 4},
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
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

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
            alt="back"
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
      <>
        <Text />
        <Center>
          <View
            style={{
              // overflow: 'hidden',
              // height: 200,
              width: '80%',
              zIndex: 2,
              // marginBottom: 300,
              // backgroundColor: 'red',
            }}>
            <Button onPress={() => setShowModal(true)}>
              {I18n.t('HOME_initial_button')}
            </Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px" height="500px">
                <Modal.CloseButton />
                <Modal.Header>{I18n.t('HOME_initial')}</Modal.Header>
                <Modal.Body>
                  <GooglePlacesAutocomplete
                    placeholder="Where do you want to go?"
                    minLength={5}
                    returnKeyType={'search'}
                    listViewDisplayed="auto"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                      setStartLocation(details.geometry.location);
                    }}
                    query={{
                      key: google_api_key,
                      language: 'pt',
                    }}
                    styles={{
                      textInputContainer: {
                        width: '100%',
                        backgroundColor: '#FFF',
                      },
                      listView: {},
                    }}
                    debounce={200}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      {I18n.t('BUTTON_cancel')}
                    </Button>
                    <Button
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      {I18n.t('BUTTON_save')}
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
            <Text />
            <Button onPress={() => setShowModal1(true)}>
              {I18n.t('HOME_final_button')}
            </Button>
            <Modal isOpen={showModal1} onClose={() => setShowModal1(false)}>
              <Modal.Content maxWidth="90%" height="500px">
                <Modal.CloseButton />
                <Modal.Header>{I18n.t('HOME_final')}</Modal.Header>
                <Modal.Body>
                  <GooglePlacesAutocomplete
                    placeholder="Where do you want to go?"
                    minLength={5}
                    returnKeyType={'search'}
                    listViewDisplayed="auto"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                      setStartLocation(details.geometry.location);
                    }}
                    query={{
                      key: google_api_key,
                      language: 'pt',
                    }}
                    styles={{
                      textInputContainer: {
                        width: '100%',
                        backgroundColor: '#FFF',
                      },
                      listView: {},
                    }}
                    debounce={200}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      {I18n.t('BUTTON_save')}
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </View>
          <Text />
        </Center>
        <Text />

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
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          _light={{
            bg: 'coolGray.100',
          }}
          _dark={{
            bg: 'coolGray.800',
          }}
          onValueChange={itemValue => setVehicleChoosed(itemValue)}>
          {userVehicles.map(item => {
            return <Select.Item label={item.carModel} value={item.id} />;
          })}
        </Select>
        <Text />
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

        <FormControl>
          <Input
            style={{
              width: '80%',
            }}
            variant="outline"
            placeholder={I18n.t('CREATECARPOOLING_description')}
            multiline
            onChange={e => setDescription(e.value)}
          />
        </FormControl>
        <DatePicker
          collapsable
          minimumDate={new Date()}
          locale="pt"
          is24hourSource="locale"
          androidVariant="iosClone"
          date={date}
          onDateChange={setDate}
        />
        <Text />
        <ButtonNative
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
      </>
    );
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <ImageBackground
          style={{resizeMode: 'cover', height: '100%'}}
          source={images.background}>
          {loading ? (
            <View>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            <>
              {renderHeader()}
              <Center>{renderCreateCarPooling()}</Center>
            </>
          )}
        </ImageBackground>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default CreateCarPooling;
