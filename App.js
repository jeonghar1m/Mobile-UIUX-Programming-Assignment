import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabScreen from './Components/Screen/TabScreen';
import Reducer from './_reducers';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F9F9F9',
    accent: 'yellow',
  },
};

const Stack = createNativeStackNavigator();

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

export default function App() {
  return (
    <ReduxProvider store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Router" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Tab" component={TabScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}