import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from './Text';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
import  AuthStorage from '../utils/authStorage';

const token = new AuthStorage();

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  // ...
});

const AppBar = () => {
  const apolloClient = useApolloClient();

  const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {fetchPolicy: 'cache-and-network',});
  //console.log('dataaa authorized?', data.authorizedUser)

  const logOut = async() => {
    // console.log('log outtt')
    await token.removeAccessToken();
    // apolloClient.resetStore();
    const aftertoken = await token.getAccessToken()
    // apolloClient.resetStore();
    console.log('token', token)

    console.log('log outtt token', aftertoken)
    console.log('data.authorizedUser',data.authorizedUser)
  
  
  }

  return <View style={styles.container}>
    <ScrollView horizontal>
      <Link to="/"><Text color="headline" fontWeight="bold">Repositories</Text></Link>
      {data.authorizedUser!=null?<Link onPress={logOut}><Text color="headline" fontWeight="bold">Sign Out</Text></Link>:
      <Link to="/sign-in"><Text color="headline" fontWeight="bold">Sign In</Text></Link>}
    </ScrollView>
    </View>;
};

export default AppBar;