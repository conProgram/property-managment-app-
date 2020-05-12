import React, {Component} from 'react';
import { FlatList,ImageBackground, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import WeatherPage from "./WeatherPage";

var isLoaded = false;

var that = this;
	var currentDate = new Date().getDate();
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
	var sec = new Date().getSeconds(); //Current Seconds

export default class WeatherApi extends React.Component {


	constructor(props){
		super(props);
		
		this.state = {
			latitude: 0,
			longitude: 0,
			forecast: [], //Data from the weather api stored in this array
			error:'',
			isLoaded: false
		};
	}

	componentDidMount(){
		// Get the device location
		this.getLocation();
	}

	getLocation(){

		// Get the current position of the user
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState(
					(prevState) => ({
					latitude: position.coords.latitude, 
					longitude: position.coords.longitude
					}), () => { this.getWeather(); }
				);
			},
			(error) => this.setState({ forecast: error.message }),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
		);
	}

	getWeather(){

		// Construct the API url to call
		let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=e4753737c1a48cdd93e0f3290bed554f';

		// Call the API, and set the state of the weather forecast
		fetch(url)
		.then(response => response.json())
		.then(data => {
			this.setState((prevState, props) => ({
				forecast: data
				
			}));
		})
		isLoaded = true
	}

	render() {
		if(isLoaded == false){
			return(
				<View style={styles.loadingBox}>
                 
                <Text>Getting the most up to date weather data</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
                
            </View>
			);

		}

		else if(isLoaded == true){
		return (
			<View style={styles.container}>
			<View style={styles.header}>
            
			<Text style={styles.headerTitle}>The weather forecast</Text>
			<Text style={styles.notes}>Today's date is: {currentDate} / {month} / {year}</Text>
                    

            </View>
			
			<ImageBackground source={require("../assets/plamBackground.png")} style={{width: '100%', height: '100%'}} > 
			<FlatList data={this.state.forecast.list} style={{marginTop:20}} 
			keyExtractor={item => item.dt_txt} renderItem={({item}) => 
			<WeatherPage detail={item} location={this.state.forecast.city.name} />} />
			</ImageBackground>
			</View>
		);
	}
}}

const styles = StyleSheet.create({
    container: {
        flex: 1,
	},
	header: {
        paddingTop: 50,
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
	loadingBox:{
		flex: 1,
		justifyContent: "center",
        alignItems: "center"
	}
});

