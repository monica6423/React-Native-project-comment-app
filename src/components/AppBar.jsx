import React, {useContext} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from './Text';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
import  AuthStorage from '../utils/authStorage';
import AuthStorageContext from "../contexts/AuthStorageContext";

//const token = new AuthStorage();

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  // ...
});

const AppBar = () => {
  const apolloClient = useApolloClient();

  const authStorage = useContext(AuthStorageContext);
  console.log('auth storage use context:', authStorage)

  const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {fetchPolicy: 'cache-and-network',});
  console.log('dataaa authorized?', data)

  const logOut = async() => {
    await authStorage.removeAccessToken();

    console.log('data.authorizedUser  logout',data.authorizedUser)
    apolloClient.resetStore();
  
  }

  return <View style={styles.container}>
    <ScrollView horizontal>
      <Link to="/"><Text color="headline" fontWeight="bold">Repositories </Text></Link>
      {data?.authorizedUser&&
      <Link to="/add-review">
        <Text color="headline" fontWeight="bold">Create a Review </Text>
      </Link>}

      {data?.authorizedUser?(
      <Link onPress={logOut} to="/sign-in">
        <Text color="headline" fontWeight="bold">Sign Out </Text>
      </Link>):
      (<Link to="/sign-in">
        <Text color="headline" fontWeight="bold">Sign In </Text>
      </Link>)}

    </ScrollView>
    </View>;
};

export default AppBar;