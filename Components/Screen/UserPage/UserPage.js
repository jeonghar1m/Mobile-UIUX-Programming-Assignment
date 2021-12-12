import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Gravatar } from 'react-native-gravatar';
import { auth } from '../../../_actions/user_action';

function UserPage({ navigation }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const logoutHanlder = () => {
    axios.get('https://harim-graduation-project.herokuapp.com/api/users/logout');
    navigation.navigate('MemberScreen');
    dispatch(auth());
  }
  
  if(user.userData) {
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
  return (
    <>
    </>
  )
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