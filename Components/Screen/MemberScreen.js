import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './MemberPage/LoginPage';
import RegisterPage from './MemberPage/RegisterPage';

const Stack = createStackNavigator();

function MemberScreen() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />
        </Stack.Navigator>
    )
}

export default MemberScreen
