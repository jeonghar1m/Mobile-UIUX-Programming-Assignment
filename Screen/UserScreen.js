import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function UserScreen() {
    return (
      <View style={styles.container}>
        <Text>UserScreen</Text>
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

export default UserScreen;