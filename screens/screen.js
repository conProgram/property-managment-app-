import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text, 
  View,
  TouchableOpacity 
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";

import Swiper from "./swiper";



export default class screen extends Component {
  static navigationOptions = {
    headerShown: false
};
  render() {
    return (
      
      <Swiper navigation={this.props.navigation}>
        {/* First screen */}
        <View style={styles.slide}>
        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>           
        <Ionicons name="ios-arrow-round-back" size={40} color="#FFF"></Ionicons>
        </TouchableOpacity>
          <Icon name="ios-home" {...iconStyles} />
          <Text style={styles.header}>one</Text>
          <Text style={styles.text}>one</Text>
        </View>


        {/* Second screen */}
        <View style={styles.slide}>
          <Icon name="ios-people" {...iconStyles} />
          <Text style={styles.header}>two</Text>
          <Text style={styles.text}>two</Text>
        </View>



        {/* Third screen */}
        <View style={styles.slide}>
          <Icon name="ios-videocam" {...iconStyles} />
          <Text style={styles.header}>three</Text>
          <Text style={styles.text}>three</Text>
        </View>
      </Swiper>
    );
  }
}
const iconStyles = {
  size: 100,
  color: "#FFFFFF"
};
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#16a085"
  },
  // Header styles
  header: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15
  },
  // Text below header
  text: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 18,
    marginHorizontal: 40,
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
  } 
});
AppRegistry.registerComponent("Screen", () => Screen);
