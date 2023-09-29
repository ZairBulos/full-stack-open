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

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FormikTextInput
          name='ownerName'
          placeholder='Repository owner name'
        />
        <FormikTextInput
          name='repositoryName'
          placeholder='Repository name'
        />
        <FormikTextInput
          name='rating'
          placeholder='Rating between 0 and 100'
        />
        <FormikTextInput
          name='text'
          placeholder='Review'
        />
        <Pressable onPress={onSubmit}>
          <Text fontWeight='bold' fontSize='subheading' style={styles.button}>
            Create a review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateReviewForm;