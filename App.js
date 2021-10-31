import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from './Components/Screen/LandingScreen';
import SearchingScreen from './Components/Screen/SearchingScreen';
import NotificationScreen from './Components/Screen/NotificationScreen';
import SettingScreen from './Components/Screen/SettingScreen';
import UserScreen from './Components/Screen/UserScreen';
import MemberScreen from './Components/Screen/MemberScreen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: 'yellow',
  },
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Router() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LandingScreen" component={LandingScreen} />
      <Tab.Screen name="SearchingScreen" component={SearchingScreen} />
      <Tab.Screen name="NotificationScreen" component={NotificationScreen} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} />
      <Tab.Screen name="UserScreen" component={UserScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Router">
          <Stack.Screen name="MyApp" component={Router} />
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
          <Stack.Screen name="SearchingScreen" component={SearchingScreen} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="SettingScreen" component={SettingScreen} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="MemberScreen" component={MemberScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}