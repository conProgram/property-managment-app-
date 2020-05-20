import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image, ImageBackground, KeyboardAvoidingView } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";

const firebase = require("firebase");
require("firebase/firestore");

export default class upload extends React.Component {
    state = {
        postName: "",
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
        Fire.shared
            .addPost({postName: this.state.postName.trim(), text: this.state.text.trim(), localUri: this.state.image, user: this.state.user })
            .then(ref => {
                this.setState({ text: "", image: "../assets/lez.jpg" });
                this.props.navigation.goBack();
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
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#000000"></Ionicons>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{fontSize: 20,
                            fontWeight: "500",
                        color: "#fff",
                            alignItems: 'center',
                            justifyContent: 'center'}}>Upload</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    {/* <Image source={require("../assets/VillaMate.png")} style={styles.avatar}></Image>  */}
                    {/* <Image source={this.state.user.avatar ? { uri: this.state.user.avatar } : require("")} style={styles.avatar} </Image> */}
                    {/* <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={styles.inputText}
                        placeholder="Upload a post to this property's Log Book "
                        placeholderTextColor= "#e3075b"
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                    </View>
                    <View>
                     <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={styles.inputText}
                        placeholder="What is your name"
                        placeholderTextColor= "#e3075b"
                        onChangeText={postName => this.setState({ postName })}
                        value={this.state.postName}
                    ></TextInput> */}
                </View>

                <View style={styles.form}>
                    
                        <Text style={styles.inputTitle}> Your post description </Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor = "#d48e15"
                            placeholder = "For example 'Got to try the golf at sunset' "
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={text => console.log(text)}
                            onChangeText={text => this.setState({ text })}
                            value={this.state.text}
                        ></TextInput>
                    
                        <Text style={styles.inputTitle}>Your name ?</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={postName => console.log(postName)}
                            onChangeText={postName => this.setState({ postName })}
                            value={this.state.postName}
                        ></TextInput> 
                        </View>


                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
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
        flex: 1
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
        fontWeight:"300"  
          
    },

    inputText: {
        
        margin: 32,
        flexDirection: "row",
        color:"#e3075b", 
        fontWeight:"300"  
          
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
});
