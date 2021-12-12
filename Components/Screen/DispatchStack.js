import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './MainStack';
import { useDispatch } from 'react-redux';
import { auth } from '../../_actions/user_action';

const Stack = createNativeStackNavigator();

function DispatchStack() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [])

    return (
        <Stack.Navigator initialRouteName="Router" screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainStack" component={MainStack} />
        </Stack.Navigator>
    )
}

export default DispatchStack
