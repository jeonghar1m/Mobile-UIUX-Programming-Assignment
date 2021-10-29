import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function LoginScreen() {
    return (
      <View style={styles.container}>
        <Text>LoginScreen</Text>
      </View>
    )
  }
  
  function RegisterScreen() {
    return (
      <View style={styles.container}>
        <Text>RegisterScreen</Text>
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