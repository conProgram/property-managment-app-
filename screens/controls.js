import React from "react";
import { View, Text, StyleSheet,TouchableOpacity, ImageBackground } from "react-native";
import * as firebase from "firebase";

export default class controls extends React.Component {
    
    state = { email: "", displayName: "" };

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
    }

    signOutUser = () => {
        firebase.auth().signOut();
    };
    
    render() {
        return (
            <View style={styles.container}>
        <ImageBackground source={require("../assets/Notifications_.png")} style={styles.backgroundImage} >
       
            <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "800" }}> All notifications for: {this.state.email}!</Text>

            
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
        
        
        },}
        
    
);
