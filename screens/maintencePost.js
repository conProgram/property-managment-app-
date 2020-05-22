import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image, ImageBackground, KeyboardAvoidingView, Keyboard } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";

const firebase = require("firebase");
require("firebase/firestore");

export default class maintencePost extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    

    state = {
        text: "",
        image: "../assets/lez.jpg",
        name: "",
        avatar: "../assets/lez.jpg"
    };

    componentDidMount() {
        this.getPhotoPermission();

        Fire.shared.user(user => {
            this.setState({ user });
        });
    }

    getPhotoPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status != "granted") {
                alert("We need permission to your photos to be able to access your photos");
            }
        }
    };

    handlePost = () => {
        console.log(this.text, this.timestamp, this.image, this.user);
        Fire.shared
            .addMaintencePost({ text: this.state.text.trim(), localUri: this.state.image, user: this.state.user })
            .then(ref => {
                this.setState({ text: "", image: "../assets/lez.jpg" });
                Keyboard.dismiss();
                this.props.navigation.navigate("maitenceLog");
            })
            .catch(error => {
                alert(error);
            });
    };

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    render() {
        
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require("../assets/plamBackground.png")} style={{width: '100%', height: '100%'}} >  
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("maintenceLog")}>
                        <Ionicons name="md-arrow-back" size={24} color="#000000"></Ionicons>
                    </TouchableOpacity>


                    
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{fontSize: 20,
                         fontWeight: "500",
                             color: "#fff",
                            alignItems: 'center',
                            justifyContent: 'center'}}>Post maintenance issue</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.inputContainer}>
                    <Image source={require("../assets/VillaMate.png")} style={styles.avatar}></Image>
                    {/* <Image source={this.state.user.avatar ? { uri: this.state.user.avatar } : require("")} style={styles.avatar} </Image> */}
                    {/* <TextInput
                        
                        multiline={true}
                        numberOfLines={4}
                        style={styles.inputText}
                        placeholder="Upload a post to this property's Log Book "
                        placeholderTextColor= "#e3075b"
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput> */}


              

                <View style={styles.form}>
                    

                <Text style={styles.inputTitle}>What is the issue ? </Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            editable={true}
                            multiline={true}
                            placeholderTextColor = "#556ca3"
                            placeholder = "E.g. ''Broken door handle'' "
                            backgroundColor = "#d8e4fe70"
                            onChangeText={text => this.setState({ text })}
                            value={this.state.text}

                        ></TextInput>    
                        </View>

                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Text style={styles.cameraPromptText}> Add a photo of the problem</Text>
                    <Ionicons name="md-camera" size={32} color="#000000"></Ionicons>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 32, marginTop: 32, height: 300}}>
                    <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
                </View>
                
                
                
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB",
        
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "500",
        color: "#fff",
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        backgroundColor: "#FFFFFF50",
        margin: 32,
        flexDirection: "row",
        color:"#e3075b", 
        fontWeight:"300",  
        height: "200"
          
    },

    inputTitle: {
        color: "#435480",
        fontSize: 17,
        textTransform: "uppercase",
        fontWeight: '700'
    },
    input: {
        borderBottomColor: "#556ca3",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 150,
        fontSize: 15,
        color: "#d48e15"
       
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32,
        
    },
    greeting: {
        marginTop: 50,
        fontSize: 30,
        fontWeight: "500",
        textAlign: "center",
        color: "#435480",
        marginBottom: -30,
        marginHorizontal: 20,
        marginVertical: 50
    },
    form: {
        backgroundColor: "#d8e4fe70",
        marginTop: 20,
        marginBottom: 40,
        marginHorizontal: 30
    },
    cameraPromptText:{
        color: "#435480",
        fontWeight: "bold",
        fontSize: 15
    }
});
