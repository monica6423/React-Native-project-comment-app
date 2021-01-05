import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
      <Text color="headline" fontWeight="bold">Repositories</Text>
    </View>;
};

export default AppBar;