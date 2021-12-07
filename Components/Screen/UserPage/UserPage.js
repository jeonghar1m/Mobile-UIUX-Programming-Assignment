import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import * as Update from "expo-updates";
import { useSelector } from 'react-redux';
import { Gravatar } from 'react-native-gravatar';

function UserPage() {
  const user = useSelector(state => state.user);

  const logoutHanlder = () => {
    axios.get('https://harim-graduation-project.herokuapp.com/api/users/logout');
    alert('로그아웃 완료');
    Update.reloadAsync();
  }
  
  return (
    <View style={styles.container}>
      <Gravatar options={{
        email: user.userData.email,
        parameters: {"size": "100"},
        secure: true
      }} />
      <Text>{user.userData.nickname}</Text>
      <Button icon="arrow-left" mode="contained" style={{width: 100}} onPress={logoutHanlder}>로그아웃</Button>
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

export default UserPage;