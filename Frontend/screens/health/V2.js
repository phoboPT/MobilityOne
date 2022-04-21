import React, {useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  HStack,
  NativeBaseProvider,
  Divider,
  Radio,
  Checkbox,
} from 'native-base';

const V2 = ({navigation}) => {
  const [formData, setData] = useState({});
  const [colesterol, setColesterol] = useState('0');
  const [diabetes, setDiabetes] = useState('0');
  const [pressure, setPressure] = useState([]);
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
            {
              'Sofre de colesterol alto? (LDL≥130mg/dL, HDL<40mg/dL, medicação lipidica, cholesterol total ≥200 mg/dL)'
            }
          </Text>

          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={colesterol}
            onChange={nextValue => {
              setColesterol(nextValue);
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
          <Text color="white">{'Sofre de diabetes? Ou Pre-diabetes?'}</Text>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={diabetes}
            onChange={nextValue => {
              setDiabetes(nextValue);
            }}>
            <Radio value="1" my={1}>
              <Text color="white">Sim</Text>
            </Radio>
            <Radio value="2" my={1}>
              <Text color="white">Não</Text>
            </Radio>
          </Radio.Group>
        </FormControl>
        <Divider />

        <Text color="white">
          Já teve alguma uma doença cardiovascular, respiratória e metabólica?
        </Text>
        <Checkbox.Group
          onChange={setPressure}
          value={pressure}
          accessibilityLabel="choose numbers">
          <Checkbox value="1" my={2}>
            Sim, Problema de coração
          </Checkbox>
          <Checkbox value="2"> Sim, alta pressão</Checkbox>
          <Checkbox value="3"> Não</Checkbox>
        </Checkbox.Group>
        {/* <Checkbox.Group
          onChange={setPressure}
          value={pressure}
          accessibilityLabel="choose numbers">
          <Checkbox value="1" my={1}>
            <Text color="white"> Sim, Problema de coração</Text>
          </Checkbox>
          <Checkbox value="2" my={1}>
            <Text color="white"> Sim, alta pressão</Text>
          </Checkbox>
          <Checkbox value="3" my={1}>
            <Text color="white"> Não</Text>
          </Checkbox>
        </Checkbox.Group> */}

        {/* <FormControl>
          <FormControl.Label>
            <Text color="white" type="email" autoComplete="email">
              Indique que doenças já teve (por exemplo: se teve um AVC, escreva,
              AVC)
            </Text>
          </FormControl.Label>
          <Input
            color="white"
            placeholder="AVC, diabetes, etc"
            onChangeText={value => setData({...formData, illness: value})}
          />
        </FormControl> */}

        {/* <FormControl>
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
        </FormControl> */}
        <Divider />

        <HStack mt="6" justifyContent="center" />
      </VStack>
    </NativeBaseProvider>
  );
};

export default V2;
