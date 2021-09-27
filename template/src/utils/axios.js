import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { Alert } from 'react-native';
import store from '../store/store';
import navigationService from './navigationService';
import {
  MAIN_API_URL,
  BAD_REQUEST,
  AUTH_REFRESH_TOKEN,
  UNAUTHORIZED,
} from '../constants/requestStatusCodesAndUrls';
import { SET_USER_TOKENS } from '../store/auth/types';
import { CLEAR_STORE } from '../store/general/types';

const axiosInstance = axios.create({
  baseURL: MAIN_API_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

let refreshTokenPromise;

export const updateToken = (token) => {
  const { dispatch } = store;
  return axios.post(`${MAIN_API_URL}${AUTH_REFRESH_TOKEN}`, { refreshToken: token })
    .then(({ data: { data: { accessToken, refreshToken } } }) => {
      return AsyncStorage.multiSet([['accessToken', accessToken], ['refreshToken', refreshToken]]).then(() => {
        dispatch({ type: SET_USER_TOKENS, accessToken, refreshToken });
        return accessToken;
      });
    }).catch(() => {
      Alert.alert(i18next.t('error'), i18next.t('noAccess'));
      AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']).then(() => {
        navigationService.reset([{ name: 'Phone' }], 0);
        dispatch({ type: CLEAR_STORE });
      });
      return false;
    });
};

const createUpdateAuthInterceptor = async ({
  config,
  response: {
    data: {
      error,
      message,
      validationErrors,
      statusCode,
    },
  }
}) => {
  const errorData = new Error('error');
  errorData.message = {
    error,
    message,
    validationErrors,
    statusCode
  };
  let successAnswer;
  const { getState } = store;
  const { auth: { refreshToken } } = getState();
  if (statusCode === UNAUTHORIZED && refreshToken) {
    const originalRequest = config;
    if (!refreshTokenPromise) {
      refreshTokenPromise = updateToken(refreshToken);
    }
    const token = await refreshTokenPromise;
    if (token) {
      originalRequest.headers.Authorization = `Bearer ${token}`;
      successAnswer = axiosInstance(originalRequest);
    }
    refreshTokenPromise = null;
  } else if (statusCode === BAD_REQUEST) {
    const convertToString = (value) => (Array.isArray(value) ? value.join(' ') : value);
    const validationErrorsFormatted = validationErrors
      && Object.entries(validationErrors).reduce((acc, [key, value]) => ({
        ...acc, [key]: convertToString(value)
      }), {});
    errorData.message = {
      ...errorData.message,
      validationErrors: validationErrorsFormatted,
      message: message ? convertToString(message) : '',
    };
  }
  return successAnswer || Promise.reject(errorData);
};

axiosInstance.interceptors.response.use(null, createUpdateAuthInterceptor);

export default axiosInstance;
