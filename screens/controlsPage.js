import React from "react";
import { View, Text, StyleSheet,Button, ImageBackground, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import Fire from "../Fire";
import { createNavigationContainer } from "react-navigation";

export default class controlsPage extends React.Component {
    
    render() {
        return (
           
            
            <View style={styles.container}>
            <NavigationContainer>
            <ImageBackground source={require("../assets/VillaMate.png")} style={{width: '100%', height: '100%'}} >
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("poolControls")}>
            <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 25 }}>Pool Controls</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("acControls")}>
            <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 25 }}>A/C Controls</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("maintenceLog")}>
            <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 25 }}>maintence Log</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("ownerChat")}>
            <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 25 }}>Live chat page</Text>
            </TouchableOpacity>
            </ImageBackground>
            </NavigationContainer>
            
        </View>
       
    );
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#000000',
        justifyContent: "center"
       
    },
    button: {
        backgroundColor: '#72249c',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        fontSize: 50,
        marginTop: 100
    },
    backgroundImage: {
            
        alignItems: "center",
        backgroundColor: '#000000',
        justifyContent: "center",
            flex: 1,
            width: '100%',
            height: '100%',
            // flexDirection: 'column',
            // backgroundColor:'transparent',
            // justifyContent: 'flex-start',
        
        
        }}

        
    
);