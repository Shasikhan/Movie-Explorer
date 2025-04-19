import React, {createContext, useContext, useEffect, useState} from 'react';
import {
  getValueFromStorage,
  removeValueFromStorage,
  setValueInStorage,
} from './storage';

const UserContext = createContext({
  user: null,
  setUser: (val: any) => {},
  logout: () => {},
  loading: true,
  favorites: [],
  setFavorites: val => {},
});

export const UserProvider = ({children}) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavoritesState] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getValueFromStorage('user');
        const favoriteData = await getValueFromStorage('favorites');

        if (userData) {
          setUserState(JSON.parse(userData));
        }

        if (favoriteData) {
          setFavoritesState(JSON.parse(favoriteData));
        }
      } catch (e) {
        console.log('Failed to load user', e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const setUser = async userData => {
    try {
      await setValueInStorage('user', JSON.stringify(userData));
      setUserState(userData);
    } catch (e) {
      console.log('Error saving user to AsyncStorage', e);
    }
  };

  const logout = async () => {
    try {
      await removeValueFromStorage('user');
      setUserState(null);
      setFavoritesState([]);
    } catch (e) {
      console.log('Error clearing user from AsyncStorage', e);
    }
  };

  const setFavorites = async favList => {
    try {
      await setValueInStorage('favorites', JSON.stringify(favList));
      setFavoritesState(favList);
    } catch (e) {
      console.log('Error saving favorites to AsyncStorage', e);
    }
  };

  return (
    <UserContext.Provider
      value={{user, setUser, logout, loading, favorites, setFavorites}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
