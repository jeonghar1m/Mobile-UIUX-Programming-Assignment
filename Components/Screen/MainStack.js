import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabScreen from './TabScreen';
import MemberScreen from './MemberScreen';
import SplashScreen from './SplashScreen';

const Stack = createNativeStackNavigator();

function MainStack({navigation}) {
    return (
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="MemberScreen" component={MemberScreen} />
            <Stack.Screen name="TabScreen" component={TabScreen} />
        </Stack.Navigator>
    )
}

export default MainStack
