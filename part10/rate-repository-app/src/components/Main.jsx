import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Routes, Route, Navigate } from 'react-router-native';

import theme from '../theme';
import AppBar from './AppBar/AppBar';
import RepositoryList from './Repository/RepositoryList';
import Repository from './Repository/Repository';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import CreateReview from './Review/CreateReview';
import MyReviewList from './Review/MyReviewList';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.backgroundColors.main
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/repositories/:id' element={<Repository />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/create-review' element={<CreateReview />} />
        <Route path='/my-reviews' element={<MyReviewList />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;