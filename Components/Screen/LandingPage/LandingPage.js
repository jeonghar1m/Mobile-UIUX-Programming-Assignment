import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, SafeAreaView } from 'react-native';
import { movieApiBaseUrl, movieImageBaseUrl, api_key } from '../../Config';

function LandingPage({navigation}) {
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
              }
              
              //setItems([...items, ...res.results]);
              setItems(res.results);
              setMode("Normal");
              // setPage(res.page + 1);
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {items.map((item, index) => (
          <View style={{flexDirection:'row', alignItems:'center'}} key={index}>
            <TouchableHighlight onPress={() => navigation.navigate("MovieDetailPage", {movieId: item.id})}>
              <Image style={styles.movieImage} source={{uri: item.poster_path}} />
            </TouchableHighlight>
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  movieImage: {
    resizeMode: 'contain',
    flex: 0,
    width: 100,
    height: 100,
    marginTop: 24
  },
  movieTitle: {
    marginLeft: 0,
    fontWeight: 'bold'
  }
});

export default LandingPage;