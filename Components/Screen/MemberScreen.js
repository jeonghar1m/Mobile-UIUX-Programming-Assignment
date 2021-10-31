import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from 'react-native-paper';

const Drawer = createDrawerNavigator();

function LoginScreen() {
    return (
      <View style={styles.container}>
        <Button icon="account-circle" mode="contained" onPress={() => console.log('Login')}>Login</Button>
      </View>
    )
  }
  
  function RegisterScreen() {
    return (
      <View style={styles.container}>
        <Button icon="account-circle" mode="contained" onPress={() => console.log('Login')}>Register</Button>
      </View>
    )
  }

function MemberScreen() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="LoginScreen" component={LoginScreen} />
        <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
      </Drawer.Navigator>
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

export default MemberScreen;