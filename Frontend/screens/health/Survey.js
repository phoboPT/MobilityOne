import React, {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Center,
  NativeBaseProvider,
  Button,
  Stack,
  KeyboardAvoidingView,
  Divider,
  View,
  Image,
  Text,
  ScrollView,
  FormControl,
  Checkbox,
} from 'native-base';

import V1 from './V1';
import V2 from './V2';

import {icons, SIZES} from '../../constants/index';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(55, 71, 79)',
  },
  image: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
  },
  view: {flexDirection: 'row', height: 40, backgroundColor: 'white'},
  touchable: {
    backgroundColor: 'white',
    width: 50,
    paddingLeft: SIZES.padding * 1,
    justifyContent: 'center',
  },
  view_2: {
    paddingTop: 10,
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
    paddingTop: 5,

    fontSize: 24,
    fontWeight: '400',
  },
});
const Survey = ({navigation}) => {
  const [formData, setData] = useState({});
  const [state, setState] = useState(0);
  const [selected, setSelected] = useState([]);

  const renderHeader = () => {
    return (
      <View style={styles.view}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.touchable}>
          <Image
            source={icons.menu}
            resizeMode="contain"
            style={styles.image}
            alt="menu"
          />
        </TouchableOpacity>
        <View style={styles.view_2}>
          <Text style={styles.text_settings}>Settings</Text>
        </View>
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {renderHeader()}
        <ScrollView h="100%">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Center w="100%">
              <Box safeArea p="2" py="2" w="97%">
                <Heading
                  size="lg"
                  fontWeight="600"
                  color="white"
                  _dark={{
                    color: 'warmGray.50',
                  }}>
                  Survey
                </Heading>

                <VStack space={5} mt="3">
                  {state === 0 && (
                    <>
                      <Text color="white" type="email" autoComplete="email">
                        Declaração de Consentimento Informado Eu, ao aceitar a
                        opção “Sim, aceito e tenho conhecimento do que me será
                        pedido e para que serve." fui informado de que o Estudo
                        de Investigação acima mencionado se destina a medir os
                        níveis de atividade física do universo do Politécnico do
                        Porto e do Instituto Politécnico de Viana do Castelo.
                        Sei que neste estudo está prevista a realização de
                        questionários tendo-me sido explicado em que consistem e
                        quais os seus possíveis efeitos. Foi-me garantido que
                        todos os dados relativos à identificação dos
                        participantes neste estudo são confidenciais e que será
                        mantido o anonimato. Sei que posso recusar-me a
                        participar ou interromper a qualquer momento a
                        participação no estudo, sem nenhum tipo de penalização
                        por este facto. Compreendi a informação que me foi dada,
                        tive oportunidade de fazer perguntas e as minhas dúvidas
                        foram esclarecidas. Aceito participar de livre vontade
                        no estudo acima mencionado. Também autorizo a divulgação
                        dos resultados obtidos no meio científico, garantindo o
                        anonimato. Nome do Investigador e Contacto: Andreia
                        Sofia Pinheiro de Sousa, asp@ess.ipp.pt
                      </Text>

                      <FormControl>
                        <FormControl.Label>
                          <Text color="white">
                            Declaração de Consentimento Informado
                          </Text>
                        </FormControl.Label>
                        <Checkbox.Group
                          onChange={setSelected}
                          value={selected}
                          accessibilityLabel="choose numbers">
                          <Checkbox value="true">
                            <Text color="white">Aceito</Text>
                          </Checkbox>
                        </Checkbox.Group>
                      </FormControl>
                    </>
                  )}

                  {state === 1 && <V1 />}
                  {state === 2 && <V2 />}
                </VStack>
                <Divider />
                <Center>
                  <Stack direction="row" mb="2.5" mt="1.5" space={3}>
                    <Button
                      onPress={() => {
                        setState(state - 1);
                      }}
                      mt="2"
                      colorScheme="indigo"
                      disabled={state < 1}>
                      Back
                    </Button>
                    <Button
                      onPress={() => {
                        setState(state + 1);
                      }}
                      mt="2"
                      disabled={selected[0] !== 'true'}
                      colorScheme="indigo">
                      Next
                    </Button>
                  </Stack>
                </Center>
              </Box>
            </Center>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default Survey;
