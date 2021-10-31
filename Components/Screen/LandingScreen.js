import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { movieApiBaseUrl, movieImageBaseUrl } from '../Config';
import { api_key } from '../PrivateConfig';

function LandingScreen({navigation}) {
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState("Loading");
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  const fetchMovies = useCallback(() => {
    const movieInfo = `${movieApiBaseUrl}popular?api_key=${api_key}&language=ko-KR&page=${page}`;
    
    if(isFetching) {
        fetch(movieInfo)
        .then(res => res.json())
        .then(res => {
            for(let index = 0; index < res.results.length; index++) {
                res.results[index].poster_path = `${movieImageBaseUrl}original${res.results[index].poster_path}`;
                res.results[index].id = `/movie/${res.results[index].id}`;
            }
            
            //setItems([...items, ...res.results]);
            setItems(res.results);
            setMode("Normal");
            setPage(res.page + 1);
            setIsFetching(false);
        })
        .catch(err => {
            setMode("404");
        });
    }
  }, [api_key, isFetching, items, page])

  useEffect(() => {
    if(isFetching)
      fetchMovies();
  }, [page, fetchMovies, isFetching])

  if(mode === "Loading") {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
  else if(mode === "404") {
    return (
      <View style={styles.container}>
        <Text>404 Not Found</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Button icon="account-circle" mode="contained" onPress={() => navigation.navigate("MemberScreen")}>Login</Button>
      {items.map(item => (
        <Image style={styles.movieImage} source={{uri: item.poster_path}} key={item.title} resizeMode="contain" />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieImage: {
    width: 100,
    height: 70,
  },
});

export default LandingScreen;