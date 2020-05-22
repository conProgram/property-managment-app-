import React from "react";
import { View, Text, StyleSheet,Button, ImageBackground, Image } from "react-native";
import * as firebase from "firebase";
import Fire from "../Fire";

export default class homeScreen extends React.Component {

    static navigationOptions = {
        headerShown: false
    };
    
    state = {
        user: {}
    };

    unsubscribe = null;

    componentDidMount() {
        const { email, name } = firebase.auth().currentUser;

        this.setState({ email, name });

        const user = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({ user: doc.data() });
            });
    }

    // componentWillUnmount() {
    //     this.unsubscribe();
    // }
    
    
    

    
    render() {
        return (
            <View style={styles.container}>
                 <ImageBackground source={require("../assets/plamBackground.png")} style={{width: '100%', height: '100%'}} >

                  <View style={{alignItems: "center", marginTop: 100 }} > 
                  <Text style={{ color: "#717eb6", fontSize: 20, fontWeight: "800", marginTop: 20 }}>Welcome to: </Text>
                <Text style={{ color: "#4b5f90", fontSize: 30, fontWeight: "800", marginTop: 20 }}>{this.state.user.name}  </Text> 

                  </View>
                      
            <View style={{ marginTop: 50, alignItems: "center" }}>
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

                <View style={{alignItems: "center", marginTop: 10}} > 
                  <Text style={{ color: "#717eb6", fontSize: 20, fontWeight: "800", marginTop: 20 }}>Your access code is: </Text>
                <Text style={{ color: "#4b5f90", fontSize: 30, fontWeight: "800", marginTop: 20 }}>{this.state.user.accessCode}  </Text> 
                  </View>

                <View style={styles.button}>
                <Button title='Log Out' color= "#717eb6"
                onPress={() => {
                        Fire.shared.signOut();
                    }} />
                </View>
                
                
                
                {/* <Button
                    onPress={() => {
                        Fire.shared.signOut();
                    }}
                    title="Log out"
                /> */}
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
        width: 360,
        height: 300,
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
        
        
        },
        button: {
            backgroundColor: '#d8e4fe70',
            height: 50,
            width: 170,
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
            marginTop: 30,
            
            
        },}

        
    
);