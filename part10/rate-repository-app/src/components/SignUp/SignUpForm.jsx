import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import FormikTextInput from '../FormikTextInput';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#fff'
  },
  content: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    padding: 4,
    borderRadius: 4,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: theme.colors.primary
  }
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FormikTextInput
          name='username'
          placeholder='Username'
        />
        <FormikTextInput
          name='password'
          placeholder='Password'
          secureTextEntry
        />
        <FormikTextInput
          name='passwordConfirm'
          placeholder='Password confirmation'
          secureTextEntry
        />
        <Pressable onPress={onSubmit}>
          <Text fontWeight='bold' fontSize='subheading' style={styles.button}>
            Sing Up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpForm;