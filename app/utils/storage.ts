import AsyncStorage from '@react-native-async-storage/async-storage';

export const setValueInStorage = async (key: string, value: string) => {
  try {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    console.log('Error saving key: ' + e);
  }
};

export const getValueFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('Error getting key: ' + e);
  }
};

export const removeValueFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Error removing key: ' + e);
  }
};
