import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from 'react-native-paper';

const Drawer = createDrawerNavigator();

function LoginPage() {
    return (
      <View style={styles.container}>
        <Button icon="account-circle" mode="contained" onPress={() => console.log('Login')}>Login</Button>
      </View>
    )
  }
  
  function RegisterPage() {
    return (
      <View style={styles.container}>
        <Button icon="account-circle" mode="contained" onPress={() => console.log('Login')}>Register</Button>
      </View>
    )
  }

function MemberPage() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="LoginScreen" component={LoginPage} />
        <Drawer.Screen name="RegisterScreen" component={RegisterPage} />
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

export default MemberPage;