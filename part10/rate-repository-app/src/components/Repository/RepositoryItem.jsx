import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
  textContainer: {
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  language: {
    width: 100,
    padding: 6,
    color: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
  }
});

const formatNumber = (number) => {
  return number >= 1000
    ? `${Math.round(number / 1000 * 10) / 10}k`
    : number;
};

const RepositoryItem = ({ repository }) => {
  if (!repository) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.flexCol}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: repository.ownerAvatarUrl }}
            testID='ownerAvatarUrl'
          />
        </View>
        <View style={styles.flexCol}>
          <Text fontSize='subheading' fontWeight='bold' testID='fullName'>
            {repository.fullName}
          </Text>
          <Text color='textSecondary' testID='description'>
            {repository.description}
          </Text>
          <Text style={styles.language} testID='language'>
            {repository.language}
          </Text>
        </View>
      </View>
      <View style={styles.flexRow}>
        <View style={[styles.flexCol, styles.textContainer]} testID='stargazersCount'>
          <Text fontWeight='bold'>{formatNumber(repository.stargazersCount)}</Text>
          <Text color='textSecondary'>Stars</Text>
        </View>
        <View style={[styles.flexCol, styles.textContainer]} testID='forksCount'>
          <Text fontWeight='bold'>{formatNumber(repository.forksCount)}</Text>
          <Text color='textSecondary'>Forks</Text>
        </View>
        <View style={[styles.flexCol, styles.textContainer]} testID='reviewCount'>
          <Text fontWeight='bold'>{repository.reviewCount}</Text>
          <Text color='textSecondary'>Reviews</Text>
        </View>
        <View style={[styles.flexCol, styles.textContainer]} testID='reviewCount'>
          <Text fontWeight='bold'>{repository.ratingAverage}</Text>
          <Text color='textSecondary'>Rating</Text>
        </View>
      </View>
    </View>
  );
}

export default RepositoryItem;