import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Router() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LandingPage" component={LandingPage} />
      <Tab.Screen name="SearchingPage" component={SearchingPage} />
      <Tab.Screen name="NotificationPage" component={NotificationPage} />
      <Tab.Screen name="SettingPage" component={SettingPage} />
      <Tab.Screen name="UserPage" component={UserPage} />
    </Tab.Navigator>
  )
}

function LandingPage({navigation}) {
  return (
    <View style={styles.container}>
      <Text>LandingPage</Text>
      <Button title="로그인페이지로 이동" onPress={() => navigation.navigate("MemberPage")} />
    </View>
  );
}

function SearchingPage() {
  return (
    <View style={styles.container}>
      <Text>SearchingPage</Text>
    </View>
  );
}

function NotificationPage() {
  return (
    <View style={styles.container}>
      <Text>NotificationPage</Text>
    </View>
  );
}

function SettingPage() {
  return (
    <View style={styles.container}>
      <Text>SettingPage</Text>
    </View>
  );
}

function UserPage() {
  return (
    <View style={styles.container}>
      <Text>UserPage</Text>
    </View>
  );
}

function MemberPage() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="LoginPage" component={LoginPage} />
      <Drawer.Screen name="RegisterPage" component={RegisterPage} />
    </Drawer.Navigator>
  )
}

function LoginPage() {
  return (
    <View style={styles.container}>
      <Text>LoginPage</Text>
    </View>
  )
}

function RegisterPage() {
  return (
    <View style={styles.container}>
      <Text>RegisterPage</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Router">
        <Stack.Screen name="MyApp" component={Router} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="SearchingPage" component={SearchingPage} />
        <Stack.Screen name="NotificationPage" component={NotificationPage} />
        <Stack.Screen name="SettingPage" component={SettingPage} />
        <Stack.Screen name="UserPage" component={UserPage} />
        <Stack.Screen name="MemberPage" component={MemberPage} />
      </Stack.Navigator>
    </NavigationContainer>
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
