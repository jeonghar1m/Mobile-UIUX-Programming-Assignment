import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function SettingScreen() {
    return (
      <View style={styles.container}>
        <Text>SettingScreen</Text>
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

export default SettingScreen;