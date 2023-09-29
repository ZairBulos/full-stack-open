import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Link } from 'react-router-native';
import { Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { FlatList, View, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ 
  repositories, 
  order, 
  setOrder, 
  searchQuery,
  onChangeSearch,
  onEndReach 
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Link to={`/repositories/${item.id}`}>
          <RepositoryItem repository={item} />
        </Link>
      )}
      keyExtractor={item => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <View>
          <Searchbar
            placeholder='Search'
            value={searchQuery}
            onChangeText={onChangeSearch}
          />
          <Picker
            selectedValue={order}
            onValueChange={(itemValue) => setOrder(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label='Latest repositories' value='latest' />
            <Picker.Item label='Highest rated repositories' value='highestRated' />
            <Picker.Item label='Lowest rated repositories' value='lowestRated' />
          </Picker>
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 1000);

  let orderBy;
  let orderDirection;
  const first = 2;
  switch (order) {
    case 'latest':
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
    case 'highestRated':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'lowestRated':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
  }

  const { repositories, fetchMore } = useRepositories(
    orderBy, orderDirection, searchKeyword, first
  );

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchQuery={searchQuery}
      onChangeSearch={onChangeSearch}
      onEndReach={onEndReach}
    />
  );
}

export default RepositoryList;