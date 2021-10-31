import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';

function UserScreen() {
    return (
      <View style={styles.container}>
        <Avatar.Image size={100} source={require('../../assets/user_profile.png')} />
        <Text>User Nickname</Text>
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