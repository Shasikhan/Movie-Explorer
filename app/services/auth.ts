import axios from 'axios';

const Auth_API_BASE_URL = 'https://reqres.in/api';

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${Auth_API_BASE_URL}/register`, {
      email,
      password,
    });
    return {data: response.data, error: null};
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.error || 'Something went wrong',
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${Auth_API_BASE_URL}/login`, {
      email,
      password,
    });
    return {data: response.data, error: null};
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.error || 'Something went wrong',
    };
  }
};
