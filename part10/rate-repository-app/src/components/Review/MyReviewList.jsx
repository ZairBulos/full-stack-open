import React from 'react';
import { useNavigate } from 'react-router-native'
import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';

import useMe from '../../hooks/useMe';
import useDeleteReview from '../../hooks/useDeleteReview';
import ReviewItem from './ReviewItem';
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
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  buttonView: {
    width: 150,
    padding: 4,
    color: '#fff',
    borderRadius: 4,
    marginRight: 'auto',
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
  },
  buttonDelete: {
    width: 150,
    padding: 4,
    color: '#fff',
    borderRadius: 4,
    textAlign: 'center',
    backgroundColor: 'red',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleNavigate = () => {
    navigate(`/repositories/${review.repositoryId}`);
  };  

  const handleDelete = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed')
      },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteReview({ id: review.id });
          await refetch()
        }
      }
    ], {
      cancelable: true,
      onDismiss: () => {
        Alert.alert('This alert was dismissed')
      }
    });
  };

  return (
    <View style={styles.container}>
      <ReviewItem review={review} />
      <View style={styles.flexRow}>
        <View style={styles.flexCol}>
          <Pressable onPress={handleNavigate}>
            <Text style={styles.buttonView}>
              View repository
            </Text>
          </Pressable>
        </View>
        <View style={styles.flexCol}>
          <Pressable onPress={handleDelete}>
            <Text style={styles.buttonDelete}>
              Delete review
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const MyReviewList = () => {
  const { me, loading, refetch } = useMe(true);

  if (loading) {
    return <View>
      <Text>Loading...</Text>
    </View>;
  }

  const reviews = me.reviews
    ? me.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <MyReviewItem review={item} refetch={refetch} />}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviewList;