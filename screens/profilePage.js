import React from "react";
import { View, Text, StyleSheet,Button, ImageBackground, Image } from "react-native";
import * as firebase from "firebase";
import Fire from "../Fire";

export default class profilePage extends React.Component {
    
    state = {
        user: {}
    };

    unsubscribe = null;

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });

        const user = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({ user: doc.data() });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    
    
    

    
    render() {
        return (
            <View style={styles.container}>
                 <ImageBackground source={require("../assets/Profile.png")} style={{width: '100%', height: '100%'}} >
                     
            <View style={{ marginTop: 200, alignItems: "center" }}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={
                            this.state.user.avatar
                                ? { uri: this.state.user.avatar }
                                : require("../assets/saz.jpg")
                        }
                        style={styles.avatar}
                    />
                    
                    
                </View>
                <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "800", marginTop: 20 }}>Welcome {this.state.displayName}!</Text>
                
                <Button
                    onPress={() => {
                        Fire.shared.signOut();
                    }}
                    title="Log out"
                />
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
        width: 136,
        height: 136,
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