import {View, Text, ActivityIndicator, Image, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovieDetails} from '../services/movies';
import {useUser} from '../utils/userContext';

export default function MovieDetailScreen({route}) {
  const {favorites, setFavorites} = useUser();
  const {movieID} = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToFavorites = movie => {
    const newList = [...favorites, movie];
    setFavorites(newList);
  };

  const removeFromFavorites = () => {
    const updatedList = favorites.filter(fav => fav.id !== movieID);
    setFavorites(updatedList);
  };

  const isFavorite = favorites?.some(fav => fav.id === movieID);

  useEffect(() => {
    getMovieDetails(movieID)
      .then(res => {
        console.log('Res from movie details', res);

        if (res.data) {
          setMovieDetails(res.data);
        }
        if (res.error) {
          setError(res.error);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      setMovieDetails(null);
    };
  }, [movieID]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}>
      {movieDetails && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: movieDetails.poster}}
            style={{
              width: '100%',
              height: 150,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              width: '90%',
              marginTop: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Year: {movieDetails.year}</Text>
            <Text>Rating: {movieDetails.rating}</Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 16,
            }}>
            {movieDetails.title}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 16,
            }}>
            {movieDetails.plot}
          </Text>

          {movieDetails.genre && movieDetails.genre.length > 0 && (
            <Text>Genres: {movieDetails.genre.join(', ')}</Text>
          )}
          <Button
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onPress={() =>
              isFavorite ? removeFromFavorites() : addToFavorites(movieDetails)
            }
          />
        </View>
      )}
      {error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
    </View>
  );
}
