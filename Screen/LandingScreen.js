import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function LandingScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text>LandingScreen</Text>
        <Button title="로그인페이지로 이동" onPress={() => navigation.navigate("MemberScreen")} />
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

export default LandingScreen;