import React from "react";
import { View, Text, StyleSheet, Image, FlatList, ImageBackground, ActivityIndicator, TouchableOpacity, TextInput, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import firebase from "firebase";
import Fire from "../Fire";


export default class Chat extends React.Component {

    state = {
        posts: [],
        text: "",
    };

    async componentDidMount() {
        const {email} = await firebase.auth().currentUser; //waits for current email to be loaded
       // console.log(email);

       Fire.shared.user(user => {
        this.setState({ user });
        });
        


        this.ref = firebase.firestore();

        this.ref
            .collection("messages").where('user.email', '==' ,email)
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {
                //gets snapshot of database to show
                posts = [];
                snapshot.forEach(post => {
                    posts.push(post.data());
                    console.log('post', post.data());

                    //add each post to the posts array here
                });
                this.setState({ posts });
            });
    }

    handlePost = () => {
      Fire.shared
          .addMessage({text: this.state.text.trim(),user: this.state.user })
          .then(ref => {
              this.setState({ text: ""});
          })
          .catch(error => {
              alert(error);
          });
          Keyboard.dismiss();
  };

    
    renderPost = post => {
        let image = <Image source={require("../assets/lez.jpg")} style={styles.avatar}></Image>;

        if (post.user.avatar) {
            image = <Image source={{ uri: post.user.avatar }} style={styles.avatar} />;
        }

        return (
            <View style={styles.feedItem}>
                {image}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                        <Text style={styles.post}>{post.text}</Text>

                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>

                       
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            
            <View style={styles.container}>
                
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Owner Live chat</Text>

                   
                    

                </View>

                <View style={styles.form}>
                        <Text style={styles.inputTitle}> Send a message to the owner</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor = "#d48e15"
                            placeholder = "e.g What is the wifi Password ?"
                            backgroundColor = "#d8e4fe70"
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={text => console.log(text)}
                            onChangeText={text => this.setState({ text })}
                            value={this.state.text}
                        ></TextInput>
                        <TouchableOpacity onPress={this.handlePost}>
                        <Text style={styles.button}>Send</Text>
                    </TouchableOpacity>
            </View>
                
                <ImageBackground source={require("../assets/plamBackground.png")} style={{width: '100%', height: '100%'}} > 
                <FlatList
                
                    style={styles.feed}
                    data={this.state.posts}
                    renderItem={({ item }) => this.renderPost(item)} //Rendering the items from the post array
                    keyExtractor={(_, index) => index.toString()} //Gives each post a unique key
                    showsVerticalScrollIndicator={false}
                ></FlatList>
                
                
              
              
            </ImageBackground>
            </View>
            
            
        );
    }

    
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        
       
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#CFDEFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
        color: "#93A1DF"
        
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFFFFF50",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8,
        
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 20,
        fontWeight: "500",
        color: "#93a1df"
    },
    timestamp: {
        fontSize: 11,
        color: "#8490c8",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#7480b1"
    },
    inputContainer: {
      backgroundColor: "#FFFFFF50",
      margin: 32,
      flexDirection: "row",
      color:"#e3075b", 
      fontWeight:"300"  
        
  },

  inputText: {
      paddingTop: 30,
      margin: 100,
      //flexDirection: "row",
      color:"#e3075b", 
      fontWeight:"300",
        
  },

  button: {
      backgroundColor: '#d8e4fe70',
      alignSelf: "center",
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
      marginTop: 50,
      marginBottom: 40
      
      
  },
  form: {
      marginTop: 20,
      marginHorizontal: 30
  },
  inputTitle: {
      color: "#d48e15",
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
});


