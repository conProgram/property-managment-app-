import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, StatusBar, LayoutAnimation } from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    
    state = {
        email: "",
        password: "",
        errorMessage: null
    };

    handleLogin = () => {
        const { email, password } = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/Profile.png")} style={{width: '100%', height: '100%'}} >  
                <StatusBar barStyle="light-content"></StatusBar>
                
                <Text style={styles.greeting}>{`Welcome to\n`}<Text style={{ fontWeight: "900", color: "#72249c" }}>POST It</Text>
                
                </Text>

                
                    

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                   
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 25 }}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate("Register")}
                >
                    <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "800" }}>
                        New Member? <Text style={{ fontWeight: "900", color: "#72249c" }}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
                </ImageBackground>
            </View>
            
        );
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    stretch: {
        width: 50,
        height: 200,
        resizeMode: 'stretch'
      },
    greeting: {
        marginTop: 100,
        fontSize: 40,
        fontWeight: "400",
        textAlign: "center",
        color: "#ffffff"
        
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#72249c",
        fontSize: 17,
        textTransform: "uppercase",
        fontWeight: '700'
    },
    input: {
        borderBottomColor: "#ffffff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#07f00b"
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
        fontSize: 50
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    }
});
