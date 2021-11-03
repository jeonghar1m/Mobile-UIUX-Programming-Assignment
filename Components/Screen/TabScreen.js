import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LandingPage from './LandingPage/LandingPage';
import SearchingPage from './SearchingPage/SearchingPage';
import NotificationPage from './NotificationPage/NotificationPage';
import SettingPage from './SettingPage/SettingPage';
import UserPage from './UserPage/UserPage';


const Tab = createMaterialBottomTabNavigator();

function TabScreen() {
    return (
        <Tab.Navigator
          initialRouteName="LandingPage"
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: '#000000' }}
          labelStyle={{ fontSize: 12 }}
        >
            <Tab.Screen 
                name="LandingPage"
                component={LandingPage} 
                options={{
                    tabBarLabel: '홈', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="home" color={"#fff"} size={26} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="SearchingPage" 
                component={SearchingPage}
                options={{
                    tabBarLabel: '검색', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="magnify" color={"#fff"} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="NotificationPage" 
                component={NotificationPage} 
                options={{
                    tabBarLabel: '알림', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="bell" color={"#fff"} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="SettingPage"
                component={SettingPage}
                options={{
                    tabBarLabel: '설정', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="cog" color={"#fff"} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="UserpagePage"
                component={UserPage}
                options={{
                    tabBarLabel: '내 정보', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account" color={"#fff"} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
      )
}

export default TabScreen;
