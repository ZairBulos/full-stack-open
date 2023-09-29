import React from 'react';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';

import theme from '../../theme';
import AppBarTab from './AppBarTab';
import useMe from '../../hooks/useMe';
import useSignOut from '../../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.dark
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  }
});

const AppBar = () => {
  const { me, loading } = useMe();
  const [signOut] = useSignOut();

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.flexRow}>
        <Link to='/'>
          <AppBarTab title='Repositories' />
        </Link>
        {me
          ? <>
            <Link to='/create-review'>
              <AppBarTab title='Create a review' />
            </Link>
            <Link to='/my-reviews'>
              <AppBarTab title='My reviews' />
            </Link>
            <Pressable onPress={signOut}>
              <AppBarTab title='Sign Out' />
            </Pressable>
          </>
          : <>
            <Link to='/sign-in'>
              <AppBarTab title='Sign In' />
            </Link>
            <Link to='/sign-up'>
              <AppBarTab title='Sign Up' />
            </Link>
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;