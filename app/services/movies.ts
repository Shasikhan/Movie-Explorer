import axios from 'axios';

const BASE_URL = 'https://www.freetestapi.com/api/v1/';

export const getMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movies`);
    return {data: response.data, error: null};
  } catch (error) {
    console.log('Error fetching movies:', error.message);
    return {data: null, error: error.message || 'Something went wrong'};
  }
};

export const getMovieDetails = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/movies/${id}`);
    return {data: response.data, error: null};
  } catch (error) {
    console.log('Error fetching movies:', error.message);
    return {data: null, error: error.message || 'Something went wrong'};
  }
};
