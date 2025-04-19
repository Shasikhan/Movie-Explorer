import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './authNavigator';
import {useUser} from '../utils/userContext';
import {ActivityIndicator, View} from 'react-native';
import HomeDrawer from './homeNavigator';

const Stack = createStackNavigator();

export default function Routes() {
  const {user, loading} = useUser();
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={HomeDrawer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
