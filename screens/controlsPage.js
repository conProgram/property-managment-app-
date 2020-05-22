import React from "react";
import { View, Text, StyleSheet,Button, ImageBackground, Image, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import Fire from "../Fire";


export default class controlsPage extends React.Component {
    
    render() {
        return (
           
            
            <View style={styles.container}>
            <ImageBackground source={require("../assets/plamBackground.png")} style={{width: '100%', height: '100%'}} >
            <Text style={styles.greeting}>{`CONTROLS\n`}</Text>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("poolControls")}>
            <Text style={styles.controlButton}>Pool Controls</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("acControls")}>
            <Text style={styles.controlButton}>A/C Controls</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("maintenceLog")}>
            <Text style={styles.controlButton}>Maintenance Log</Text>
            </TouchableOpacity>
            
            <View style={styles.logoutButton}>
                <Button title='LOG OUT' color= "#717eb6"
                onPress={() => {
                        Fire.shared.signOut();
                    }} />
                </View>
            </ImageBackground>
            
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
        backgroundColor: '#d8e4fe70',
        height: 50,
        marginHorizontal: 20,
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
        marginTop: 80,
        
        
    },
    greeting: {
        marginTop: 100,
        fontSize: 30,
        fontWeight: "500",
        textAlign: "center",
        color: "#435480",
        marginBottom: -30,
        marginHorizontal: 20,
        marginVertical: 50
    },
    controlButton:{
        color: "#FFF", 
        fontWeight: "500", 
        fontSize: 25 
    },
    logoutButton: {
        backgroundColor: '#d8e4fe70',
        height: 50,
        marginHorizontal: 20,
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
        marginTop: 80,
        
        
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