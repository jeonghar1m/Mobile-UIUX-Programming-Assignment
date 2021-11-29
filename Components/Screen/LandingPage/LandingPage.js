import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Platform } from 'react-native';
import { movieApiBaseUrl, movieImageBaseUrl, api_key } from '../../Config';
import { Card, Title } from 'react-native-paper';

function LandingPage({navigation}) {
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState("Loading");
  const [page, setPage] = useState(1);
  const [NumColumns, setNumColumns] = useState(0);

  useEffect(() => {
    fetchMovies();
    Platform.isPad ? setNumColumns(4) : setNumColumns(2);
  }, [])

  const renderItems = ({ item }) => {
    return (
      <Card key={item.title} onPress={() => navigation.navigate("MovieDetailPage", {movieId: item.id})} style={{marginBottom: '5%', marginLeft: '5%', width: Platform.isPad ? '19%' : '42%'}}>
        <Card.Cover source={{uri: item.poster_path}} />
        <Card.Content>
          <Title style={{textAlign: 'center'}} key={item.title} numberOfLines={1}>{item.title}</Title>
        </Card.Content>
      </Card>
    )
  }

  const fetchMovies = () => {
    const movieInfo = `${movieApiBaseUrl}popular?api_key=${api_key}&language=ko-KR&page=${page}`;
    
    fetch(movieInfo)
    .then(res => res.json())
    .then(res => {
        for(let index = 0; index < res.results.length; index++) {
            res.results[index].poster_path = `${movieImageBaseUrl}original${res.results[index].poster_path}`;
        }
        
        setItems([...items, ...res.results]);
        setMode("Normal");
        setPage(res.page + 1);
    })
    .catch(err => {
        setMode("404");
    });
  }

  const loadMore = () => {
    fetchMovies();
  }

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
      <FlatList 
        data={items}
        renderItem={renderItems}
        keyExtractor={(item) => String(item.title)}
        numColumns={NumColumns}
        onEndReached={loadMore}
        onEndReachedThreshold={1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: "row"
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