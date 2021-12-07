import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabScreen from './TabScreen';
import { useDispatch } from 'react-redux';
import { auth } from '../../_actions/user_action';

const Stack = createNativeStackNavigator();

function MainStack() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth());
    }, [])

    return (
        <Stack.Navigator initialRouteName="Router" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Tab" component={TabScreen} />
        </Stack.Navigator>
    )
}

export default MainStack
