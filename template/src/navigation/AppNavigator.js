import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import HomeScreen from '../screens/Home/Home';
import SignInScreen from '../screens/SignIn/SignIn';
import { setUserInitialData } from '../store/auth/actions';
import NavigationService from '../utils/navigationService';
import theme from '../theme';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
  });

  const linking = {
    prefixes: [''],
    config: {
      screens: {
        SignIn: 'SignIn',
        Home: 'Home',
      },
    },
    async getInitialURL() {
      let initial = '';
      const loginLinkUrl = await AsyncStorage.multiGet(['accessToken', 'refreshToken', 'user'])
        .then(([accessToken, refreshToken, user]) => {
          let initialLink = '';
          if (accessToken?.[1] && refreshToken?.[1] && user?.[1]) {
            dispatch(setUserInitialData(accessToken[1], refreshToken[1], JSON.parse(user[1])));
            initialLink = 'Home';
          }
          return initialLink;
        });
      if (loginLinkUrl) {
        initial = loginLinkUrl;
      }
      return initial;
    },
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <NavigationContainer
          ref={NavigationService.navigationRef}
          theme={theme}
          linking={linking}
        >
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: 'center'
            }}
          >
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
