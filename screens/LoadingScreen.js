import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import firebase from "firebase";
import Fire from "../Fire";

export default class LoadingScreen extends React.Component {
    componentDidMount() {
        if (Fire.shared.uid) {
            this.props.navigation.navigate("App");
        } else {

            //Checks to see which user has logged in
            firebase.auth().onAuthStateChanged(user => {
                this.props.navigation.navigate(user ? "App" : "Auth");
            });
        }
    }

    render() {
        return (
            <View style={styles.loadingBox}>
                 
                <Text style={styles.loadingText}>Loading VillaMate ... </Text>
                <ActivityIndicator size="large" color= "#2a3550"></ActivityIndicator>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingBox:{
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#93A1DF"
		
	},
	loadingText:{
		paddingBottom: 30,
		color: "#2a3550",
		fontSize: 15,
		fontWeight: "bold"
	}
});