import { gql, useMutation} from '@apollo/client'
import { LOG_IN } from '../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';
const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(LOG_IN);
  
    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments
        const {data} = await mutate({variables: { username, password}})
        await authStorage.setAccessToken(data.authorize.accessToken);

        apolloClient.resetStore();
    
        return data;
    };

    
  
    return [signIn, result];
  };

  
  export default useSignIn;