import { Formik } from 'formik';
import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import useReview from '../hooks/useReview';

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: 0,
    text: ''
};

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required!'),
    repositoryName: yup
        .string()
        .required('Password is required!'),
    rating: yup
        .number()
        .min(0, 'Provide a number between 0 and 100.')
        .max(100, 'Provide a number between 0 and 100.')
        .integer()
        .required('Rating number between 0 and 100 is required!'),
    text: yup
        .string(),
});

const AddReview = ({ onSubmit }) => {
    return (
        <View>
        <FormikTextInput name="ownerName" placeholder="Repository Owner Name" />
        <FormikTextInput name="repositoryName" placeholder="PRepository Name" />
        <FormikTextInput name="rating" placeholder="Rating between 0 to 100" />
        <FormikTextInput name="text" placeholder="Review" />
        <TouchableWithoutFeedback onPress={onSubmit}>
          <Text>Add a Review</Text>
        </TouchableWithoutFeedback>
      </View>
    );
}

const reviewForm = () => {
    const [createReview] = useReview();
    const history = useHistory();  

    const onSubmit = async (values) => {
        const { ownerName, rating, repositoryName, text } = values;
        console.log('owvwer name', values)
        try {
            const data = await createReview({ ownerName, rating:Number(rating), repositoryName, text})
            let id = data.createReview.repository.id;
            history.push(`/${id}`);
            return console.log('data', data)
        } catch (error) {
            console.log('error is', error);
        }
    }
    return (
        <Formik 
          initialValues={initialValues} 
          validationSchema={validationSchema} 
          onSubmit={onSubmit}>
          {({ handleSubmit }) => <AddReview onSubmit={handleSubmit} />}
        </Formik>
      );
}

export default reviewForm;