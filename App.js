import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

//initialize the storage
const authStorage = new AuthStorage();
//send access token to Apollo server in each request
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
  <NativeRouter>
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <Main />
      </AuthStorageContext.Provider>
    </ApolloProvider>
  </NativeRouter>);
};

export default App;