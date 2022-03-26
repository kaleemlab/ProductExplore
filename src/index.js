import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import {AddScreen, HomeScreen, OnBoardingScreen, ProfileScreen, SearchScreen, SettingScreen,} from "./screens";
import {Platform} from "react-native";
import SignInScreen from "./screens/SignIn";
import SignUpScreen from "./screens/SignUp";
import HomeDetailScreen from "./screens/HomeDetailScreen";
import Firebase from "../firebase";
import firebase from 'firebase/app';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const auth = Firebase.auth();
console.disableYellowBox = true;

const firebaseConfig = {
    apiKey: "AIzaSyAV9GbaxgWYH7YkSIIXmO-POWEuviCE4Jo",
    authDomain: "productexploreone.firebaseapp.com",
    projectId: "productexploreone",
    storageBucket: "productexploreone.appspot.com",
    messagingSenderId: "295820649154",
    appId: "1:295820649154:web:cb297899ea544952f7d15b",
    measurementId: "G-P1DRTXRNE0"
};

const TabsNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            shifting={true}
            labeled={false}
            sceneAnimationEnabled={false}
            activeColor="#00aea2"
            inactiveColor="#95a5a6"
            barStyle={{backgroundColor: '#ffff'}}
            tabBarOptions={{
                showLabel: false,
                activeTintColor: '#fff',
                inactiveTintColor: 'lightgray',
                inactiveBackgroundColor: '#fff',
                style: {
                    paddingBottom: 4,
                    paddingTop: 4,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 40,
                }

            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <Ionicons name="home" size={24}/>,
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: () => <Ionicons name="search" size={24}/>,
                }}
            />
            <Tab.Screen
                name="Add"
                component={AddScreen}
                options={{
                    tabBarIcon: () => <Ionicons name="add" size={24}/>,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingScreen}
                options={{
                    tabBarIcon: () => <Ionicons name="settings" size={24}/>,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: () => <Ionicons name="person" size={24}/>,
                }}
            />

        </Tab.Navigator>
    );
};

const RootStackScreen = () => {

    if (!firebase.apps.length) {
        console.log('Connected with Firebase')
        firebase.initializeApp(firebaseConfig);
    }

    return (
        <RootStack.Navigator mode="modal">
            <RootStack.Screen
                name="OnBoardingScreen"
                component={OnBoardingScreen}
                options={{
                    headerShown: true,
                    title: "🚀 ProductExplore 🔍"
                }}/>
            <RootStack.Screen
                name="Main"
                component={TabsNavigator}
                options={{
                    headerShown: false,
                    title: "Explore Products"
                }}
            />
            <RootStack.Screen
                name="Add"
                component={AddScreen}/>
            <RootStack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                    headerShown: true,
                    title: "Sign In"
                }}/>
            <RootStack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    headerShown: true,
                    title: "Sign Up"
                }}/>
            <RootStack.Screen
                name="HomeDetail"
                title={"Product Details"}
                component={HomeDetailScreen}
                options={{
                    headerShown: true,
                    title: "Product Details"
                }}/>
        </RootStack.Navigator>
    );
};

export default RootStackScreen;
