import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovies} from '../services/movies';

export default function MovieListScreen({navigation}) {
  const [moviesList, setMoviesList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovies()
      .then(res => {
        if (res.data) {
          setMoviesList(res.data);
          setFilteredMovies(res.data);
        } else if (res.error) {
          setError(res.error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = moviesList.filter(movie =>
      movie.title.toLowerCase().includes(query),
    );
    setFilteredMovies(filtered);
  }, [searchQuery, moviesList]);

  const renderMovies = ({item}) => (
    <Pressable
      onPress={() =>
        navigation.navigate('Movie', {
          movieID: item.id,
        })
      }
      style={{
        flex: 1,
        margin: 8,
        maxWidth: '48%',
        alignItems: 'center',
        borderRadius: 8,
        padding: 8,
      }}>
      <Image
        source={{uri: item.poster}}
        style={{
          width: '100%',
          height: 150,
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          marginTop: 8,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {item.title}
      </Text>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <TextInput
        placeholder="Search movies..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          margin: 16,
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
        }}
      />
      {filteredMovies && filteredMovies.length > 0 ? (
        <FlatList
          data={filteredMovies}
          numColumns={3}
          renderItem={renderMovies}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingBottom: 16,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />
      ) : (
        <Text style={{textAlign: 'center', marginTop: 16}}>
          No movies found.
        </Text>
      )}
    </View>
  );
}
