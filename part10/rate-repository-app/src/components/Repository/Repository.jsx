import { useParams } from 'react-router-native';
import { FlatList, Linking, Pressable, StyleSheet, View } from 'react-native';

import useRepository from '../../hooks/useRepository';
import ReviewItem from '../Review/ReviewItem';
import RepositoryItem from './RepositoryItem';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  separator: {
    height: 10,
  },
  button: {
    width: 150,
    padding: 6,
    color: '#fff',
    borderRadius: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
  },

});

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository(id, 2);

  const handlePress = () => {
    Linking.openURL(repository.url);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return repository && (
    <View>
      <RepositoryItem repository={repository} />
      <Pressable onPress={handlePress} style={styles.container}>
        <Text style={styles.button}>
          Open in GitHub
        </Text>
      </Pressable>
      <FlatList
        data={repository.reviews.edges}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item.node} />}
        keyExtractor={({ id }) => id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Repository;