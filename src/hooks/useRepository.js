import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({id}) => {
    console.log('id is', id)
    const { data} = useQuery(GET_REPOSITORY, {fetchPolicy: "no-cache", variables:{id}});
    const repository = data?.repository;

    return {repository};
}

export default useRepository;