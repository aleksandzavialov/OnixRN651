import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axios';

export const set = (method, url, body, headers = {}) => {
  return axiosInstance({
    url,
    data: headers['Content-Type'] === 'multipart/form-data' ? body : JSON.stringify(body),
    method,
    headers
  }).then(({ data }) => data).catch(({ message }) => { throw message; });
};

export const authSet = (method, url, body, headers = {}) => {
  return AsyncStorage.getItem('accessToken').then((token) => {
    return set(
      method,
      url,
      body,
      {
        Authorization: `Bearer ${token}`,
        ...headers
      }
    );
  });
};

export const get = (url, headers = {}) => {
  return axiosInstance.get(url, { headers }).then((data) => data).catch(({ message }) => { throw message; });
};

export const authGet = (url, headers = {}) => {
  return AsyncStorage.getItem('accessToken').then((token) => {
    return get(
      url,
      {
        Authorization: `Bearer ${token}`,
        ...headers
      }
    );
  });
};
