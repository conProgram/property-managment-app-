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
        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("Login")}>           
        <Ionicons name="ios-arrow-round-back" size={40} color="#FFF"></Ionicons>

        </TouchableOpacity>
          <Icon name="ios-home" {...iconStyles} />
          <Text style={styles.header}>Welcome to VillaMate</Text>
          <Text style={styles.text}>Want to make renting easier?</Text>
        </View>


        {/* Second screen */}
        <View style={styles.slide}>
          <Icon name="ios-people" {...iconStyles} />
          <Text style={styles.header}>What VillaMate offers </Text>
          <Text style={styles.text}> 1 . Live chat between you and your guests </Text>
          <Text style={styles.text}> 2 . Log book from previous guest reccomendations </Text>
          <Text style={styles.text}> 3 . Weather forecast based on your geo-location </Text>
          <Text style={styles.text}> 4 . Maintenance Log you can view to see if anything needs fixing in your property </Text>
          <Text style={styles.text}> 5 . Amenity Controls for your property </Text>
        </View>



        {/* Third screen */}
        <View style={styles.slide}>
          <Icon name="ios-happy" {...iconStyles} />
          <Text style={styles.header}>How does a guest log in?</Text>
          <Text style={styles.text}> 1. You will provide the guest with aN email and password to login to your app</Text>
          <Text style={styles.text}> 2. The guests will then be shown a unique app specific to your property</Text>
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
    backgroundColor: "#93A1DF"
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
