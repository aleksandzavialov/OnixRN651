import React, { useState, useEffect, Suspense } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import { setUserInitialData } from './src/store/auth/actions';
import './src/i18n';

const Main = () => {
  const dispatch = useDispatch();
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  useEffect(() => {
    AsyncStorage.multiGet(['accessToken', 'refreshToken', 'user']).then(([accessToken, refreshToken, user]) => {
      if (accessToken?.[1] && refreshToken?.[1] && user?.[1]) {
        dispatch(setUserInitialData(accessToken[1], refreshToken[1], JSON.parse(user[1])));
      }
      setDataIsLoaded(true);
    }).catch(() => setDataIsLoaded(true));
  }, []);

  return (
    <Suspense fallback={<View />}>
      {dataIsLoaded ? <AppNavigator /> : <View />}
    </Suspense>
  );
};

export default Main;
