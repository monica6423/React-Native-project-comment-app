import React from 'react';
import FormikTextInput from './FormikTextInput';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import * as yup from 'yup';

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

const SignIn = () => {

  const onSubmit = (values) => {
    console.log('form submit vassxxxlue',values);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );;
};

export default SignIn;