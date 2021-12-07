import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LandingPage from './LandingPage/LandingPage';
import SearchPage from './SearchPage/SearchPage';
import NotificationPage from './NotificationPage/NotificationPage';
import SettingPage from './SettingPage/SettingPage';
import UserPage from './UserPage/UserPage';
import MovieDetailPage from './MovieDetailPage/MovieDetailPage';
import SearchResults from './SearchPage/Results/SearchResults';
import LoginPage from './MemberPage/LoginPage';
import RegisterPage from './MemberPage/RegisterPage';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../_actions/user_action';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const LandingPageScreen = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="MovieDetailPage" component={MovieDetailPage} />
        </Stack.Navigator>
    )
}

const SearchPageScreen = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SearchPage" component={SearchPage} />
            <Stack.Screen name="SearchResults" component={SearchResults} />
            <Stack.Screen name="MovieDetailPage" component={MovieDetailPage} />
        </Stack.Navigator>
    )
}

const MemberPageScreen = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />
        </Stack.Navigator>
    )
}

function TabScreen() {
    const user = useSelector(state => state.user);

    return (
        <Tab.Navigator
          initialRouteName="LandingPage"
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: '#000000' }}
          labelStyle={{ fontSize: 12 }}
        >
            <Tab.Screen 
                name="Landing"
                component={LandingPageScreen} 
                options={{
                    tabBarLabel: '홈', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="home" color={"#fff"} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Search" 
                component={SearchPageScreen}
                options={{
                    tabBarLabel: '검색', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="magnify" color={"#fff"} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Notification" 
                component={NotificationPage} 
                options={{
                    tabBarLabel: '알림', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="bell" color={"#fff"} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingPage}
                options={{
                    tabBarLabel: '설정', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="cog" color={"#fff"} size={26} />
                    ),
                }}
            />
            {(user.userData && !user.userData.isAuth) &&
                <Tab.Screen
                    name="Member"
                    component={MemberPageScreen}
                    options={{
                        tabBarLabel: '로그인', 
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="account" color={"#fff"} size={26} />
                        ),
                    }}
                />
            }
            {(user.userData && user.userData.isAuth) &&
                <Tab.Screen
                    name="Userpage"
                    component={UserPage}
                    options={{
                        tabBarLabel: '내 정보', 
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="account" color={"#fff"} size={26} />
                        ),
                    }}
                />
            }
        </Tab.Navigator>
      )
}

export default TabScreen;
