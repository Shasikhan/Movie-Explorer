import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../utils/themeContext';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {registerUser} from '../services/auth';
import {useUser} from '../utils/userContext';

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignUpScreen({navigation}) {
  const {currentTheme} = useTheme();
  const {setUser} = useUser();

  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(null);

  const handleRegister = async (email: string, password: string) => {
    setSignUpError(null);
    setLoading(true);
    const {data, error} = await registerUser(email, password);
    setLoading(false);

    if (error) {
      console.log('Error:', error);
      setSignUpError(error);
      // optionally show a toast or message
    } else {
      console.log('Success:', data);
      setUser({
        ...data,
        email: email,
      });
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.colors.background,
        },
      ]}>
      <Text
        style={[
          styles.heading,
          {
            color: currentTheme.colors.primaryText,
          },
        ]}>
        Sign up
      </Text>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={SignUpSchema}
        onSubmit={values => handleRegister(values.email, values.password)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View style={styles.formikContainer}>
            {signUpError && (
              <Text style={[styles.error, {color: 'red', textAlign: 'center'}]}>
                {signUpError}
              </Text>
            )}
            <TextInput
              editable={!loading}
              placeholder="eve.holt@reqres.in"
              placeholderTextColor={currentTheme.colors.secondaryText}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={[
                styles.input,
                {
                  borderColor: currentTheme.colors.textInputBorder,
                  color: currentTheme.colors.primaryText,
                },
              ]}
            />
            {touched.email && errors.email && (
              <Text style={[styles.error, {color: 'red'}]}>{errors.email}</Text>
            )}
            <TextInput
              editable={!loading}
              placeholder="pistol"
              placeholderTextColor={currentTheme.colors.secondaryText}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              style={[
                styles.input,
                {
                  borderColor: currentTheme.colors.textInputBorder,
                  color: currentTheme.colors.primaryText,
                },
              ]}
            />
            {touched.password && errors.password && (
              <Text style={[styles.error, {color: 'red'}]}>
                {errors.password}
              </Text>
            )}
            {loading ? (
              <ActivityIndicator color={currentTheme.colors.accent} />
            ) : (
              <Button title="Sign Up" onPress={handleSubmit as any} />
            )}
            {!loading && (
              <Button
                onPress={() => navigation.navigate('signin')}
                title="Already have an account? Sign in"
              />
            )}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '60%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formikContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    width: '80%',
    minHeight: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  error: {
    alignSelf: 'flex-start',
    marginLeft: 45,
    fontSize: 12,
    marginBottom: 4,
  },
});
