import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, SafeAreaView, Text } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { Button } from 'react-native-paper';
import { api_key } from '../../Config';

function SearchPage({navigation}) {
    const [SearchValue, setSearchValue] = useState("");
    const [Items, setItems] = useState([]);

    useEffect(() => {
      const searchTo = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=ko-KR&query=${SearchValue}`;
      
      fetch(searchTo)
        .then(res => res.json())
        .then(res => setItems(res.results))
    }, [SearchValue])

    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.autocompleteContainer}>
          <Autocomplete
            data={Items}
            value={SearchValue}
            onChangeText={(value) => setSearchValue(value)}
            flatListProps={{
              keyExtractor: (_, idx) => idx,
              renderItem: ({ item }) => <Text style={{marginBottom: '3%'}} onPress={() => navigation.navigate("SearchResults", {SearchValue: item.title})}>{item.title}</Text>,
            }}
          />
        </SafeAreaView>
        <Button icon="magnify" mode="contained" onPress={() => (SearchValue !== "") ? navigation.navigate("SearchResults", {SearchValue: SearchValue}) : alert('검색어를 입력하세요.')}>검색</Button>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputArea: {
      backgroundColor: '#aaaaaa',
      borderRadius: 5,
      padding:5,
      margin:5,
      width: Platform.isPad ? 500 : 300
    },
    autocompleteContainer: {
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: '20%',
      zIndex: 1,
      justifyContent: 'center'
    }
  });

export default SearchPage;