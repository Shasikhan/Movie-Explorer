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
import {loginUser} from '../services/auth';
import {useUser} from '../utils/userContext';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function SignInScreen({navigation}) {
  const {currentTheme} = useTheme();
  const {setUser} = useUser();
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState(null);

  const handleLogin = async (email: string, password: string) => {
    setSignInError(null);
    setLoading(true);
    const {data, error} = await loginUser(email, password);
    setLoading(false);

    if (error) {
      console.log('Error:', error);
      setSignInError(error);
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
        Sign in
      </Text>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={SignInSchema}
        onSubmit={values => handleLogin(values.email, values.password)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View style={styles.formikContainer}>
            {signInError && (
              <Text style={[styles.error, {color: 'red', textAlign: 'center'}]}>
                {signInError}
              </Text>
            )}
            <TextInput
              editable={!loading}
              placeholder="Email"
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
              placeholder="Password"
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
              <Button title="Sign in" onPress={handleSubmit as any} />
            )}
            {!loading && (
              <Button
                onPress={() => navigation.navigate('signup')}
                title="Create new account"
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
    marginLeft: 35,
    fontSize: 12,
    marginBottom: 4,
  },
});
