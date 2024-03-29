import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';

import ReviewForm from './ReviewFrom';
import SingleRepository from './SingleRepository';
import AppBar from './AppBar';
import theme from '../theme';
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
    <AppBar />
    <Switch>
      <Route path="/" exact>
        <RepositoryList />
      </Route>
      <Route path="/sign-in" exact>
        <SignIn />
      </Route>
      <Route path="/sign-up" exact>
        <SignUp />
      </Route>
      <Route path="/add-review" exact>
        <ReviewForm />
      </Route>
      <Route path="/:id" exact>
        <SingleRepository />
      </Route>
      <Redirect to="/" />
    </Switch>
    </View>
  );
};

export default Main;