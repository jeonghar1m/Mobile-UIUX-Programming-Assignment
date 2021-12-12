import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function SplashScreen({ navigation }) {
    const user = useSelector(state => state.user);
    
    useEffect(() => {
        navigation.replace((user.userData && user.userData.isAuth) ? 'TabScreen' : 'MemberScreen');
    }, [])

    return (
        <>
        </>
    )
}

export default SplashScreen
