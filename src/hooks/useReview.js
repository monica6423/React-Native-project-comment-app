import { useMutation} from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
    const [ mutate, result] = useMutation(CREATE_REVIEW);

    const createReview = async ({ownerName, rating, repositoryName, text }) => {
        const { data } = await mutate({
            variables: { ownerName, rating, repositoryName, text}
        })
        console.log('data in mutate', data)
        return data;
    };

    return [createReview, result];
};

export default useReview;