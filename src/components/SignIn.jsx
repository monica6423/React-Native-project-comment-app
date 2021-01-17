import React from 'react';
import FormikTextInput from './FormikTextInput';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn'
import  AuthStorage from '../utils/authStorage';
import { useHistory } from "react-router-dom";

const token = new AuthStorage();

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

const SignInForm = ({ onSubmit }) => {
  
    return (
        <View>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" />
        <TouchableWithoutFeedback onPress={onSubmit}>
          <Text>Sign in</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

const setToken = async(accessToken) => {
  await token.setAccessToken(accessToken);
  //apolloClient.resetStore();
  console.log('set token after reset', accessToken)
}

const signOut = async() => {
  await token.removeAccessToken()
}

const SignIn = () => {
  let history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password})
      console.log('data sign in:',data);
      //setToken(data.authorize.accessToken);
      history.push("/");
    }catch(e){
      console.log(e);
    }

  }

  return (
    <Formik 
      initialValues={initialValues} 
      validationSchema={validationSchema} 
      onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );;
};

export default SignIn;