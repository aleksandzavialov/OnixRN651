import AsyncStorage from '@react-native-async-storage/async-storage';
import { batch } from 'react-redux';
import { SET_USER_TOKENS, SET_USER_DATA } from './types';

const setUserTokens = (accessToken, refreshToken) => ({
  type: SET_USER_TOKENS,
  accessToken,
  refreshToken
});

const setUserData = (user) => ({ type: SET_USER_DATA, user });

export const setUserInitialData = (accessToken = '', refreshToken = '', data = {}) => {
  return (dispatch) => {
    return AsyncStorage.multiSet([
      ['accessToken', accessToken],
      ['refreshToken', refreshToken],
      ['user', JSON.stringify(data)]
    ]).then(() => {
      batch(() => {
        dispatch(setUserTokens(accessToken, refreshToken));
        dispatch(setUserData(data));
      });
    });
  };
};

export const setUserAccountData = (data) => {
  return (dispatch) => {
    return AsyncStorage.setItem('user', JSON.stringify(data)).then(() => {
      dispatch(setUserData(data));
    });
  };
};
