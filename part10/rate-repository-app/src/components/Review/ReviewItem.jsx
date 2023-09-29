import React from 'react';
import { format } from 'date-fns'
import { View, StyleSheet } from 'react-native';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  containerReview: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  flexRow: {
    marginTop: 15,
    flexDirection: 'row',
  },
  flexCol: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  circle: {
    textAlign: 'center',
    color: theme.colors.primary,
  }
});

const ReviewItem = ({ review }) => {
  const time = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.containerReview}>
      <View style={styles.flexRow}>
        <View style={styles.flexCol}>
          <Text style={styles.circle}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.flexCol}>
          <Text fontWeight='bold'>
            {review.user.username}
          </Text>
          <Text>
            {time}
          </Text>
          <Text color='textSecondary'>
            {review.text}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;