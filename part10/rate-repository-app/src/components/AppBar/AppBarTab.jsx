import React from 'react';
import { StyleSheet } from 'react-native';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  tab: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  }
});

const AppBarTab = ({ title }) => {
  return (
    <Text style={styles.tab}>
      {title}
    </Text>
  );
};

export default AppBarTab;