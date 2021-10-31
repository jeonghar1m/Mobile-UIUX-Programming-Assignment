import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

function SearchingScreen() {
    return (
      <View style={styles.container}>
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

export default SearchingScreen;