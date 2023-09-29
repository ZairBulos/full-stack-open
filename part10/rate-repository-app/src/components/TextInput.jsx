import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    color: theme.colors.textSecondary,
    borderColor: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;