import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

const Layout = ({
  children, style, bottomSafeArea, topSafeArea,
}) => {
  const { colors: { mainColor } } = useTheme();
  const { bottom, top } = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainColor,
      ...(bottomSafeArea && { paddingBottom: bottom }),
      ...(topSafeArea && { paddingTop: top })
    },
    viewContainer: {
      flex: 1
    },
  });

  return (
    <View style={[styles.container, style]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.viewContainer}>
        {children}
      </View>
    </View>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
  bottomSafeArea: PropTypes.bool,
  topSafeArea: PropTypes.bool,

};

Layout.defaultProps = {
  style: {},
  bottomSafeArea: false,
  topSafeArea: false,
};

export default Layout;
