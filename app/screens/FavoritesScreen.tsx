import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useUser} from '../utils/userContext';

export default function FavoritesScreen({navigation}) {
  const {favorites} = useUser();

  const renderMovies = ({item}) => (
    <Pressable
      onPress={() => {
        navigation.navigate('Movie', {
          movieID: item.id,
        });
      }}
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

  return (
    <View>
      {favorites && favorites.length > 0 && (
        <FlatList
          data={favorites}
          numColumns={3}
          renderItem={renderMovies}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            padding: 16,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />
      )}
    </View>
  );
}
