import AsyncStorage from '@react-native-community/async-storage';
import {create} from 'apisauce';

const auth = create({
  baseURL: 'http://smob.esce.ipvc.pt:3000/api',
});

auth.addAsyncRequestTransform(request => async () => {
  const token = await AsyncStorage.getItem('@App:token');

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

auth.addResponseTransform(response => {
  if (!response.ok) {
    throw response;
  }
});

const orders = create({
  baseURL: 'http://smob.esce.ipvc.pt:3001/api',
});

orders.addAsyncRequestTransform(request => async () => {
  const token = await AsyncStorage.getItem('@App:token');

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

orders.addResponseTransform(response => {
  if (!response.ok) {
    throw response;
  }
});

const routes = create({
  baseURL: 'http://smob.esce.ipvc.pt:3002/api',
});

routes.addAsyncRequestTransform(request => async () => {
  const token = await AsyncStorage.getItem('@App:token');

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

routes.addResponseTransform(response => {
  if (!response.ok) {
    throw response;
  }
});

const vehicles = create({
  baseURL: 'http://smob.esce.ipvc.pt:3003/api',
});

vehicles.addAsyncRequestTransform(request => async () => {
  const token = await AsyncStorage.getItem('@App:token');

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

vehicles.addResponseTransform(response => {
  if (!response.ok) {
    throw response;
  }
});

export {auth, orders, routes, vehicles};
