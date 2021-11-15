import React, { useState } from 'react';
import { StyleSheet, Platform, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

function SearchingPage({navigation}) {
    const [SearchValue, setSearchValue] = useState("");

    return (
      <View style={styles.container}>
        <TextInput style={styles.inputArea} onChangeText={(value) => setSearchValue(value)} />
        <Button icon="magnify" mode="contained" onPress={() => navigation.navigate("SearchResults", {SearchValue: SearchValue})}>검색</Button>
      </View>
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
    }
  });

export default SearchingPage;