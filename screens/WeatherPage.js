import React, {Component} from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import { Ionicons } from "@expo/vector-icons";


export default class WeatherPage extends Component {

	render() {
		let time;
		var date = new Date(this.props.detail.dt*1000);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var apiDay = date.getDate();
		var apiMonth = date.getMonth() + 1; 
		var apiyear = date.getUTCFullYear();

		var apiMonthString = date.getUTCDate();

		

		time = hours + ':' + minutes.substr(-2);

		return (
			

			<Card containerStyle={styles.card}>
				
				<Text style ={styles.notes}> <Ionicons name="ios-pin" size={24} color={'#717eb6'} /> {this.props.location}</Text>
		
				
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.time}>{time}</Text>
					<Text style={styles.time}>{Math.round( this.props.detail.main.temp * 10) / 10 }&#8451;</Text>
					
					
				</View>

				<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />
				
				<View style={{flexDirection:'row', justifyContent:'space-between'}}>
					<Text style={styles.notes}>{this.props.detail.weather[0].description}</Text>
					<Text style={styles.notes}>{apiDay} / {apiMonth} / {apiyear}</Text>
					
					
				</View>
				
			</Card>


			

		
		);

		
	}
}

const styles = StyleSheet.create({
	card:{
		backgroundColor:'#FFFFFF50',
		borderWidth:0,
		borderRadius:20
	},
	time:{
		fontSize:38,
		color:'#717eb6'
	},
	notes: {
		fontSize: 18,
		paddingBottom: 10,
		color:'#717eb6',
		textTransform:'capitalize'
	}
});