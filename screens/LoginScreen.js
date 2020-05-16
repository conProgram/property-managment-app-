import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, StatusBar, LayoutAnimation, Image, Dimensions, Button, KeyboardAvoidingView } from "react-native";
import * as firebase from "firebase";
import Animated, { Easing } from 'react-native-reanimated'; //External libarys used 
import { TapGestureHandler, State } from 'react-native-gesture-handler';



const { width, height } = Dimensions.get('window');

const { //All varibled used from the clock timing libary these are used throughout the code
  Value,
  navigation,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate, //
  Extrapolate //Screen movement
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 2000, //Speed on the sliding animation 
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

export default class LoginScreen extends React.Component {
 

  constructor(props) {
        super(props);



        this.buttonOpacity = new Value(1);
    
        this.onStateChange = event([
          {
            nativeEvent: ({ state }) => //Tells us the state of the handler so we can therefore run animation 
              block([
                cond(
                  eq(state, State.END),
                  set(this.buttonOpacity, runTiming(new Clock(), 1, 0)) //Sets button to invisable when clicked 
                )
              ])
          }
        ]);
    
        this.onCloseState = event([
          {
            nativeEvent: ({ state }) => //Tells us the state of the handler so we can therefore run animation 
              block([
                cond(
                  eq(state, State.END),
                  set(this.buttonOpacity, runTiming(new Clock(), 0, 1)) //Sets button to invisable when clicked opposite to above
                )
              ])
          }
        ]);
    
        this.buttonY = interpolate(this.buttonOpacity, { //Change in the button opacitys
          inputRange: [0, 1],
          outputRange: [100, 0],
          extrapolate: Extrapolate.CLAMP
        });
    
        this.bgY = interpolate(this.buttonOpacity, { //This moved the background up to expose the sign in box's
          inputRange: [0, 1],
          outputRange: [-height / 3, 0], //Hight of the sign in box
          extrapolate: Extrapolate.CLAMP
        });
    
        this.TextInputZindex = interpolate(this.buttonOpacity, { //This moved the background up to expose the sign in box's
          inputRange: [0, 1],
          outputRange: [1, -1], //Hight of the sign in box
          extrapolate: Extrapolate.CLAMP
        });
        this.TextInputY = interpolate(this.buttonOpacity, { //This moved the background up to expose the sign in box's
          inputRange: [0, 1],
          outputRange: [0, 100], //Hight of the sign in box
          extrapolate: Extrapolate.CLAMP
        });
    
        this.textInputOpacity = interpolate(this.buttonOpacity, { //This moved the background up to expose the sign in box's
          inputRange: [0, 1],
          outputRange: [1, 0], //Hight of the sign in box
          extrapolate: Extrapolate.CLAMP
        });
      }

    static navigationOptions = {
        headerShown: false
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
        console.log(email);
        console.log(password);
  };
  
    

    
    render() {
      return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end', }} behavior="padding" enabled>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white', //Colour of sliding background eg login info
            justifyContent: 'flex-end'
          }}
        >
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ translateY: this.bgY }]
            }}
          >
            <Image
              source={require('../assets/bg.jpg')}
              style={{ flex: 1, height: null, width: null }}
            />
  
  
          </Animated.View>
  
          <View style={{ height: height / 3, justifyContent: 'centre' }}>
  
  
            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
              <Animated.View //First button creation 
                style={{
                  ...styles.button,
                  opacity: this.buttonOpacity, //Set at start of code
                  transform: [{ translateY: this.buttonY }]
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
              </Animated.View>
            </TapGestureHandler>
  
  
           
  
            <Animated.View //Second button creation 
              style={{
                ...styles.button,
                // fontSize: 22,
                // placeholderTextColor='black',
                // backgroundColor: '#dea31b',
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
  
              <Button title='Do you own a property ?' color='black' onPress={() => this.props.navigation.navigate("Register")} />
            </Animated.View>
         
            <Animated.View style={{
  
              zIndex: this.TextInputZindex,
              opacity: this.textInputOpacity,
              transform: [{ translateY: this.TextInputY }],
              height: height / 3, ...StyleSheet.absoluteFill, top: null, justifyContent: 'flex-end'
            }
            
            }>
                
              <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                <Animated.View style={styles.closeButton}>
                  <Animated.Text style={{ fontSize: 15 }}> X </Animated.Text>
                </Animated.View>
              </TapGestureHandler>
  
              
              
                        <TextInput
                        placeholder="Villa Code"
                        style={styles.TextInput}
                             autoCapitalize="none"
                             onChangeText={email => this.setState({ email })}
                             value={this.state.email}
                             placeholderTextColor="black"
                         ></TextInput>
              
                       
                          <TextInput
                             placeholder="Password"
                             style={styles.TextInput}
                             placeholderTextColor="black"
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                         ></TextInput>
                         
              
                
                <TouchableOpacity
                style={{ alignSelf: "center", marginTop: 32 }}
                     onPress={() => this.handleLogin()}
                     
                 >
                     <Text style={{ color: "#1eb375", fontSize: 20, fontWeight: "800" }}>
                         Sign in 
                    </Text>
                    

                    </TouchableOpacity>
                <View style={{ alignSelf: "center", marginTop: 30}}>

                </View>
                


                 </Animated.View>
                 
                 </View>
      </View>
                
      </KeyboardAvoidingView>
      );}}
      
      
        
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
        fontWeight: '700',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
    },
    secondButton: {
      backgroundColor: 'white',
      height: 70,
      marginHorizontal: 20,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      shadowOffset: { width: 2, height: 2 },
      shadowColor: '#6899e8',
      shadowOpacity: 0.2,
      shadowOffset: { width: 2, height: 2 },
      shadowColor: 'black',
      shadowOpacity: 0.4,
      borderColor: '#6899e8',
      fontWeight: 'bold'
  
  
    },
    closeButton: {
      height: 40,
      width: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: -20,
      left: width / 2 - 20,
      shadowOffset: { width: 2, height: 2 },
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowOffset: { width: 2, height: 2 },
      shadowColor: 'black',
      shadowOpacity: 0.4
  
    },
    TextInput: {
      height: 50,
      borderRadius: 25,
      borderWidth: 0.5,
      
      paddingLeft: 10,
  
      marginVertical: 5,
      borderColor: '#24fc03'
    }
  
});
