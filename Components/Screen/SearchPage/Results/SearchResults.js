import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Platform } from 'react-native';
import { movieImageBaseUrl, api_key } from '../../../Config';
import { Card, Title, Button } from 'react-native-paper';

function SearchResults({navigation, route}) {
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState("Loading");
  const [NumColumns, setNumColumns] = useState(Platform.isPad ? 4 : 2);

  const renderItems = ({ item }) => {
    return (
      <Card key={item.title} onPress={() => navigation.navigate("MovieDetailPage", {movieId: item.id})} style={{marginBottom: '5%', marginLeft: '5%', width: Platform.isPad ? '19%' : '42%'}}>
      <Card.Cover source={{uri: item.backdrop_path}} />
      <Card.Content>
          <Title style={{textAlign: 'center'}} key={item.title} numberOfLines={1}>{item.title}</Title>
      </Card.Content>
      </Card>
    )
  }

  const fetchMovies = () => {
    const searchTo = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=ko-KR&query=${route.params.SearchValue}`;
    
    fetch(searchTo)
        .then(res => res.json())
        .then(res => {
            setItems(res.results);

            for(let index = 0; index < res.results.length; index++) {
                res.results[index].backdrop_path = `${movieImageBaseUrl}original${res.results[index].backdrop_path}`;
            }
            setMode("Normal");
        })
        .catch(err => {
            setMode("404");
        });
  }

  useEffect(() => {
    fetchMovies();
  }, [])

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
        <Button icon="arrow-left" mode="contained" style={{width: 100}} onPress={() => navigation.goBack(null)}>뒤로</Button>
        <FlatList 
          data={items}
          renderItem={renderItems}
          keyExtractor={(item) => String(item.id)}
          numColumns={NumColumns}
        />
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

export default SearchResults;