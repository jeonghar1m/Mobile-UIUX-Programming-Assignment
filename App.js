import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabScreen from './Components/Screen/TabScreen';
import MemberPage from './Components/Screen/MemberPage/MemberPage';
import MovieDetailPage from './Components/Screen/MovieDetailPage/MovieDetailPage';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: 'yellow',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Router" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tab" component={TabScreen} />
          <Stack.Screen name="MemberPage" component={MemberPage} />
          <Stack.Screen name="MovieDetailPage" component={MovieDetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}