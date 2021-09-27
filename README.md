# React native boilerplate

## React Native CLI

This template only works with the new CLI. Make sure you have uninstalled the legacy `react-native-cli` first (`npm uninstall -g react-native-cli`), for the below command to work. If you wish to not use `npx`, you can also install the new CLI globally (`npm i -g @react-native-community/cli` or `yarn global add @react-native-community/cli`).

If you tried the above and still get the *react-native-template-react- native-template-typescript: Not found error*, please try adding the [--ignore-existing](https://github.com/npm/npx#description) flag to the npx call to force npx to ignore any locally installed versions of the CLI.


Further information can be found here: https://github.com/react-native-community/cli#about

## Features

- react-navigation
- i18next
- react-native-bootsplash
- react-redux
- redux-thunk
- eslint airbnb
- husky
- jest

## Installation and run

Read [Setting up the development environment](https://nodejs.org/) for your OS.

**For run android**

```sh
npx react-native run-android
```

**For run ios**

```sh
cd ios
pod install
cd ../
npx react-native run-ios
```

## Issues

**./gradlew EACCES error when running**
```sh
chmod 755 android/gradlew (sudo chmod 755 android/gradlew)
```
