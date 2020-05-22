import React from "react";
//import FirebaseKeys from "./config";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs"; 
import { Ionicons } from "@expo/vector-icons";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import recommendations from "./screens/recommendations";
import upload from "./screens/upload";
import controlsPage from "./screens/controlsPage";
import homeScreen from "./screens/homeScreen";
import WeatherApi from "./screens/WeatherApi";

import poolControls from "./screens/poolControls";
import maintenceLog from "./screens/maintenceLog";
import acControls from "./screens/acControls";
import maintencePost from "./screens/maintencePost";


import screen from "./screens/screen";
import swiper from "./screens/swiper";

import Chat from "./screens/Chat";




const AppNavigator = createStackNavigator({
        poolControls: {
            screen: poolControls
        },
        maintenceLog:{
            screen: maintenceLog
        },
        maintencePost: {
            screen: maintencePost
        },
        acControls:{
            screen: acControls
        },
        upload: {
            screen: upload
        }
        
});

const intructionsScroller =  createStackNavigator({
    screen:{
        screen:screen,
        navigationOptions:{
            title: "screen"
        }
    },
    swiper: {
        screen:swiper,
        navigationOptions:{
            title:"swiper"
        }
    },
});


const AppContainer = createStackNavigator(
    
{


    default: createBottomTabNavigator(
        {
            recommendations: {
                screen: recommendations,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-book" size={24} color={tintColor} />
                }
            },
            Chat : {
                screen: Chat,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatbubbles" size={24} color={tintColor} />
                }
            },
            homeScreen: {
                screen: homeScreen,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => (
                        <Ionicons
                            name="ios-home"
                            size={35}
                            color={tintColor}
                            style={{
                                shadowColor: "#72249c",
                                shadowOffset: { width: 0, height: 10 },
                                shadowRadius: 10,
                                shadowOpacity: 0.3
                            }}
                        />
                    )
                }
            },
            WeatherApi: {
                screen:  WeatherApi,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-sunny" size={24} color={tintColor} />
                }
            },
            controlsPage: {
                screen: controlsPage,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-options" size={30} color={tintColor} />
                }
            },
           

        },
        

        {
            defaultNavigationOptions: {
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    if (navigation.state.key === "Post") {
                        navigation.navigate("postModal");
                    } else {
                        defaultHandler();
                    }
                } 
            },
            tabBarOptions: {
                activeTintColor: "#d1dffe",
                inactiveTintColor: "#2a3550",
                
                showLabel: false,
    
                style:{
                    backgroundColor: '#717eb6',
                }
            }
        }

),

postModal: {
    screen: maintencePost,
    screen: upload}
},
{
    mode: "modal",
headerMode: "none"
},

)


const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
});
 
export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppContainer,
            nav: AppNavigator,
            Auth: AuthStack,
            inst: intructionsScroller,
            
        },
        {
            initialRouteName: "Loading"
        }
    )
);
