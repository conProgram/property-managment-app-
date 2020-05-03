import React from "react";
import { View, Text, StyleSheet,Button, ImageBackground, Image } from "react-native";
import * as firebase from "firebase";
import Fire from "../Fire";

export default class poolControls extends React.Component {

    static navigationOptions = {
        headerShown: false
    };
  
    render() {
        return (
            <View style={styles.container}>
                 <ImageBackground source={require("../assets/VillaMate.png")} style={{width: '100%', height: '100%'}} >
                     
                <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "800", marginTop: 20 }}>THIS IS THE POOL CONTROLS </Text>
                
                <Button
                    onPress={() => {
                        Fire.shared.signOut();
                    }}
                    title="Log out"
                />
          
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
    
    profile: {
        marginTop: 64,
        alignItems: "center"
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 68
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