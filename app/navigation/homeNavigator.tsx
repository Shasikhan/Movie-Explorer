import {View, Text, Button} from 'react-native';
import React from 'react';
import {useUser} from '../utils/userContext';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import MovieListScreen from '../screens/MovieListScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'HomeDrawer'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
    </Stack.Navigator>
  );
};

const isFocused = (stateIndex: number, index: number) => {
  if (stateIndex === index) {
    return true;
  } else {
    return false;
  }
};
const getBackgroundColor = (stateIndex: number, index: number) => {
  if (stateIndex === index) {
    return '#fff';
  } else {
    return 'transparent';
  }
};

const CustomDrawer = (props: any) => {
  const {logout} = useUser();
  return (
    <DrawerContentScrollView style={{flex: 1}}>
      <DrawerItem
        onPress={() => props.navigation.navigate('Movies')}
        focused={isFocused(props.state.index, 0)}
        label={'Movies'}
        labelStyle={{fontSize: 16}}
        style={{
          backgroundColor: getBackgroundColor(props.state.index, 1),
        }}
      />
      <DrawerItem
        onPress={() => props.navigation.navigate('Favorites')}
        focused={isFocused(props.state.index, 1)}
        label={'Favorites'}
        labelStyle={{fontSize: 16}}
        style={{
          backgroundColor: getBackgroundColor(props.state.index, 1),
        }}
      />
      <DrawerItem
        onPress={logout}
        focused={props.state.index === 3}
        label={'Logout'}
        labelStyle={{fontSize: 16}}
        style={{marginTop: 8}}
      />
    </DrawerContentScrollView>
  );
};
export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return <CustomDrawer {...props} />;
      }}>
      <Drawer.Screen name="Movies" component={MovieListScreen} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="Movie" component={MovieDetailScreen} />
    </Drawer.Navigator>
  );
}
