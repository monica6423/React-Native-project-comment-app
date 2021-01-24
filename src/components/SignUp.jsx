import React from 'react';
import FormikTextInput from './FormikTextInput';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Formik } from 'formik';
import { gql, useMutation} from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn'
import  AuthStorage from '../utils/authStorage';
import { useHistory } from "react-router-dom";
import SignIn from './SignIn';

const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, 'Username too short.')
        .max(30, 'Username too long.')
        .required('Username is required!'),
    password: yup
        .string()
        .min(5, 'Password too short.')
        .max(50, 'Password too long.')
        .required('Password is required!'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match!')
        .required('Password confirmation is required!'),
});

const SignUpForm = ({ onSubmit }) => {
  
    return (
        <View>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
        <FormikTextInput name="confirmPassword" placeholder="Password Confirmation" secureTextEntry/>
        <TouchableWithoutFeedback onPress={onSubmit}>
          <Text>Sign Up</Text>
        </TouchableWithoutFeedback>
      </View>
    );
};

const SignUp = () => {
    let history = useHistory();
    const [ signIn ] = useSignIn();

    const [mutate, result] = useMutation(CREATE_USER);
    
    const onSubmit = async (values) => {
        const { username, password} = values;
        try {
            await mutate({
                variables:{
                    username, password
                }
            })
            await signIn({ username, password});
            history.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Formik 
          initialValues={initialValues} 
          validationSchema={validationSchema} 
          onSubmit={onSubmit}>
          {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
}

export default SignUp;