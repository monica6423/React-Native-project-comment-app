import { gql, useMutation} from '@apollo/client'
import { LOG_IN } from '../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';
const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);
    console.log('auth stoirage', authStorage, AuthStorageContext)
    const [mutate, result] = useMutation(LOG_IN);
  
    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments
        return mutate({variables: { username, password}})
    };
  
    return [signIn, result];
  };

  
  export default useSignIn;