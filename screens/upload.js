import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image, ImageBackground } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";

const firebase = require("firebase");
require("firebase/firestore");

export default class upload extends React.Component {
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
        Fire.shared
            .addPost({ text: this.state.text.trim(), localUri: this.state.image, user: this.state.user })
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
                <ImageBackground source={require("../assets/Post.png")} style={{width: '100%', height: '100%'}} >  
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{fontSize: 20,
        fontWeight: "500",
        color: "#fff",
        alignItems: 'center',
        justifyContent: 'center'}}>PostIT</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={require("../assets/lez.jpg")} style={styles.avatar}></Image>
                    {/* <Image source={this.state.user.avatar ? { uri: this.state.user.avatar } : require("")} style={styles.avatar} </Image> */}
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={styles.inputContainer}
                        placeholder="Add a caption "
                        placeholderTextColor= "#e3075b"
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
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
        
    }
});
