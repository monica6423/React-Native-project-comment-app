import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
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
    <ScrollView horizontal>
      <Link to="/"><Text color="headline" fontWeight="bold">Repositories</Text></Link>
      <Link to="/sign-in"><Text color="headline" fontWeight="bold">Sign In</Text></Link>
    </ScrollView>
    </View>;
};

export default AppBar;