import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { shallowEqual, useSelector } from 'react-redux';
import HomeScreen from '../screens/Home/Home';
import SignInScreen from '../screens/SignIn/SignIn';
import NavigationService from '../utils/navigationService';
import theme from '../theme';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { token } = useSelector(({ auth: { accessToken } }) => ({ token: accessToken }), shallowEqual);
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
      return token ? 'Home' : 'SignIn';
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
