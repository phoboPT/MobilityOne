import React, {useState} from 'react';
import {TouchableOpacity, Alert, Platform} from 'react-native';
import api from '../../services/api';
import images from '../../constants/images';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  KeyboardAvoidingView,
  Checkbox,
  Radio,
  Divider,
} from 'native-base';

const V1 = ({navigation}) => {
  async function saveUser(user) {
    await AsyncStorage.setItem('@App:userID', JSON.stringify(user));
  }

  // temail@testdefff.com
  async function onSubmit() {
    try {
      const response = await api.post('/users/signin', {
        email: formData.email,
        password: formData.password,
      });
      saveUser(response.data.id);

      navigation.navigate('Drawer');
    } catch (err) {
      console.log(err);
      if (err.data.errors[0].message !== undefined) {
        Alert.alert(err.data.errors[0].message);
      } else {
        Alert.alert('Error! Please try again!');
      }
    }
  }

  const [formData, setData] = useState({});
  const [risk, setRisk] = useState('one');
  const [cardioIllness, setCardioIllness] = useState('0');
  const [heartAtack, setHeartAtack] = useState('0');
  const [smoke, setSmoke] = useState('0');
  return (
    <NativeBaseProvider>
      <Heading
        mt="1"
        _dark={{
          color: 'warmGray.200',
        }}
        color="coolGray.400"
        fontWeight="medium"
        size="xs">
        Cardio
      </Heading>
      <VStack space={5} mt="3">
        <FormControl>
          <Text color="white">
            Gostaria saber qual o seu risco cardiovascular?
          </Text>

          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={risk}
            onChange={nextValue => {
              setRisk(nextValue);
            }}>
            <Radio value="yes" my={1}>
              <Text color="white">Sim</Text>
            </Radio>
            <Radio value="no" my={1}>
              <Text color="white">Não</Text>
            </Radio>
          </Radio.Group>
        </FormControl>
        <Divider />
        <FormControl>
          <FormControl.Label>
            <Text color="white">
              Já teve alguma uma doença cardiovascular, respiratória e
              metabólica?
            </Text>
          </FormControl.Label>

          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={cardioIllness}
            onChange={nextValue => {
              setCardioIllness(nextValue);
            }}>
            <Radio value="1" my={1}>
              <Text color="white">Sim</Text>
            </Radio>
            <Radio value="2" my={1}>
              <Text color="white">Não</Text>
            </Radio>
            <Radio value="3" my={1}>
              <Text color="white">
                Não sei o que são doenças cardiovasculares, respiratórias e
                metabólicas
              </Text>
            </Radio>
          </Radio.Group>
        </FormControl>
        <Divider />
        {cardioIllness === '1' && (
          <>
            <FormControl>
              <FormControl.Label>
                <Text color="white" type="email" autoComplete="email">
                  Indique que doenças já teve (por exemplo: se teve um AVC,
                  escreva, AVC)
                </Text>
              </FormControl.Label>
              <Input
                color="white"
                placeholder="AVC, diabetes, etc"
                onChangeText={value => setData({...formData, illness: value})}
              />
            </FormControl>
            <Divider />
          </>
        )}

        <FormControl>
          <FormControl.Label>
            <Text color="white">
              Algum dos seus familiares (pais ou irmãos) teve enfarte do
              miocárdio, ou foi submetido a revascularização coronária ou morte
              súbita antes dos 55 anos em familiares masculinos de 1º grau ou
              antes dos 65 em familiares femininos de 1º grau?
            </Text>
          </FormControl.Label>

          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={heartAtack}
            onChange={nextValue => {
              setHeartAtack(nextValue);
            }}>
            <Radio value="1" my={1}>
              <Text color="white">Sim</Text>
            </Radio>
            <Radio value="2" my={1}>
              <Text color="white">Não</Text>
            </Radio>
            <Radio value="3" my={1}>
              <Text color="white">Não sei</Text>
            </Radio>
          </Radio.Group>
        </FormControl>
        <Divider />
        <FormControl>
          <FormControl.Label>
            <Text color="white">É fumador?</Text>
          </FormControl.Label>

          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={smoke}
            onChange={nextValue => {
              setSmoke(nextValue);
            }}>
            <Radio value="1" my={1}>
              <Text color="white">Sim</Text>
            </Radio>
            <Radio value="2" my={1}>
              <Text color="white">Não</Text>
            </Radio>
          </Radio.Group>
        </FormControl>
        <HStack mt="6" justifyContent="center" />
      </VStack>
    </NativeBaseProvider>
  );
};

export default V1;
