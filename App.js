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
import fireChat from "./screens/fireChat";
import upload from "./screens/upload";
import notifications from "./screens/notifications";
import profilePage from "./screens/profilePage";
import controls from "./screens/controls";


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
            upload: {
                screen: upload,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-image" size={24} color={tintColor} />
                }
            },
            controls: {
                screen: controls,
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
            notifications: {
                screen: notifications,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-options" size={24} color={tintColor} />
                }
            },
            profilePage: {
                screen: profilePage,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-sunny" size={30} color={tintColor} />
                }
            }
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
                activeTintColor: "#ff31f7",
                inactiveTintColor: "#6f3460",
                
                showLabel: false,
    
                style:{
                    backgroundColor: '#000000',
                }
            }
        }

),

postModal: {
    screen: upload}
},
{
    mode: "modal",
headerMode: "none"

})


const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppContainer,
            Auth: AuthStack
        },
        {
            initialRouteName: "Loading"
        }
    )
);
