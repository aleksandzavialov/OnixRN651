import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, StatusBar, ScrollView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

const Layout = ({
  children,
  style,
  bottomSafeArea,
  topSafeArea,
  withScroll,
  scrollStyle,
  styleContainer,
  keyboardShouldPersistTaps,
}) => {
  const { colors: { whiteColor } } = useTheme();
  const { bottom, top } = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: whiteColor,
      ...(bottomSafeArea && { paddingBottom: bottom }),
      ...(topSafeArea && { paddingTop: top }),
    },
    viewContainer: {
      flexGrow: 1,
    },
    scrollStyle: {
      flexGrow: 1,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      {
        withScroll ? (
          <ScrollView
            style={[styles.scrollStyle, scrollStyle]}
            contentContainerStyle={[styles.viewContainer, styleContainer]}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            bounces={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.viewContainer, styleContainer]}>
            {children}
          </View>
        )
      }
    </View>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
  bottomSafeArea: PropTypes.bool,
  topSafeArea: PropTypes.bool,
  withScroll: PropTypes.bool,
  keyboardShouldPersistTaps: PropTypes.string,
  scrollStyle: PropTypes.shape({}),
  styleContainer: PropTypes.shape({}),
};

Layout.defaultProps = {
  style: {},
  bottomSafeArea: false,
  topSafeArea: false,
  withScroll: false,
  styleContainer: {},
  scrollStyle: {},
  keyboardShouldPersistTaps: 'handled',
};

export default Layout;
