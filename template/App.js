import React, { Suspense } from 'react';
import { Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import './src/i18n';

export default function Main() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  return (
    <Suspense fallback={<View />}>
      <AppNavigator />
    </Suspense>
  );
}
