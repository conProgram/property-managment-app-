import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, StatusBar, ImageBackground, KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserPermissions from "../devicePermissions/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../Fire";

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        user: {
            name: "",
            email: "",
            password: "",
            avatar: "../assets/lez.jpg",
            accessCode: "",
            accessInstructions: ""
        },
        errorMessage: null
    };

    handleSignUp = () => {
        Fire.shared.createUser(this.state.user);
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(accessCode);
        console.log(accessInstructions);
    };

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ user: { ...this.state.user, avatar: result.uri } });
        }
    };


    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'flex-end', }} behavior="padding" enabled>
                <ImageBackground source={require("../assets/tempBg.png")} style={{width: '100%', height: '100%'}} >  
                <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'flex-end'}}>
                <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
                        <Ionicons
                            name="ios-add"
                            size={40}
                            color="#FFF"
                            style={{ marginTop: 6, marginLeft: 2,  }}
                        ></Ionicons>
                    </TouchableOpacity>
               
                
                
                <Text style={styles.greeting}>{`ADD A Photo of your property here\n`}</Text>
                
                

                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    
                    <Ionicons name="ios-arrow-round-back" size={40} color="#FFF"></Ionicons>
                </TouchableOpacity>
                

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                
                <View style={styles.form}>
                    
                        <Text style={styles.inputTitle}> Enter name of property </Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor = "#d48e15"
                            placeholder = "For example Stunning Waterfront Villa"
                            onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
                            value={this.state.user.name}
                        ></TextInput>
                    
                        <Text style={styles.inputTitle}>Email Address (Your guests will use this to login)</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
                            value={this.state.user.email}
                        ></TextInput>
                   
                        <Text style={styles.inputTitle}>Password (Your guests will use this to login)</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
                            value={this.state.user.password}
                        ></TextInput>

                    <Text style={styles.inputTitle}>Access Code to the property</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={accessCode => this.setState({ user: { ...this.state.user, accessCode } })}
                            value={this.state.user.accessCode}
                        ></TextInput>
                    
                    <Text style={styles.inputTitle}>Access instructions to the property</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            multiline = {true}
                            onChangeText={accessInstructions => this.setState({ user: { ...this.state.user, accessInstructions } })}
                            value={this.state.user.accessInstructions}
                        ></TextInput>
                    

                </View>
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                </TouchableOpacity>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
        
    },
    greeting: {
        marginTop: 40,
        fontSize: 30,
        fontWeight: "500",
        textAlign: "center",
        color: "#FFF",
        marginBottom: -80
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#ffffff",
        fontSize: 17,
        textTransform: "uppercase",
        fontWeight: '700'
    },
    input: {
        borderBottomColor: "#ffffff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#d48e15"
       
    },
    button: {
        backgroundColor: '#d48e15',
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
    },
    back: {
        position: "absolute",
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 160//needs changeing 
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        //borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        
    }
});
