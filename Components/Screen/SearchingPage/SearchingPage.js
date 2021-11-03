import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

function SearchingPage() {
    const [SearchValue, setSearchValue] = useState("");
    return (
      <View style={styles.container}>
        <TextInput style={{ backgroundColor: '#aaaaaa', borderRadius: 5, padding:5, margin:5, width: 500 }} onChangeText={(value) => setSearchValue(value)} />
        <Button icon="magnify" mode="contained" onPress={() => console.log('Search')}>검색</Button>
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
  });

export default SearchingPage;