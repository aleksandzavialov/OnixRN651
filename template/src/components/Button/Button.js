import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ title, onPress }) => {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      alignItems: 'center',
      padding: 10,
      margin: 10,
      borderRadius: 6
    }
  });
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text>
        {title}
      </Text>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Button;
