/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  TextInput,
  TouchableHighlight, 
  AlertIOS
} from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
const Search= require('./components/search.js');
const styles= require('./components/styles.js');
const ActionButton = require('./components/button.js');


// Initialize Firebase: const is a read only reference to a value, which makes since here, because you don't want to override the value of firebase.
const firebaseConfig = {
    apiKey: "AIzaSyC-mxSz2gXmxpvaRJ-QFQ2HVpnBmXFd1Lc",
    authDomain: "mapapp2-fe262.firebaseapp.com",
    databaseURL: "https://mapapp2-fe262.firebaseio.com",
    projectId: "mapapp2-fe262",
    storageBucket: "mapapp2-fe262.appspot.com",
    messagingSenderId: "8654993061"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


class Map_app2 extends Component {

	constructor(props){
		super(props);

		this.state = {
			region: {
		      latitude: 33.749249,
		      longitude: -84.387314,
		      latitudeDelta: 0.0922,
		      longitudeDelta: 0.0121
			},
			coordinate: {
				latitude: 33.749249,
				longitude: -84.387314
			},
		};
		
	  this.onRegionChange = this.onRegionChange.bind(this);
	}
  onRegionChange(region){
		this.setState({region});
	}
	
  render() {
  	    	console.log(this.state.coordinate);

    return (

		<View style={styles.container}>
		<MapView
		  style={styles.map}
		  region={this.state.region}
		  onRegionChange={this.onRegionChange}
		>
		 
		<MapView.Marker
		  coordinate={{
		  	latitude: this.state.coordinate.latitude,
		    longitude: this.state.coordinate.longitude 
		  }}
		>

		</MapView.Marker>
		    <ActionButton 
		      onPress={this._addItem.bind(this)} 
		      title="Search Address"/>
		</MapView>


		</View>

    );
  }


  _addItem() {
	var coordinates = this.state.coordinate;
    AlertIOS.prompt(
      'Look up address',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Enter',
          onPress: (value) => Geocoder.geocodeAddress(value).then(res => {
    // res is an Array of geocoding object (see below)
                                this.state.coordinate.latitude = res[0].position.lat 
                                this.state.coordinate.longitude = res[0].position.lng
                                this.onRegionChange(this.state.coordinate)

                              })

                   .catch(err => console.log(err)) 
        }
    
      ],
       'plain-text'
    );
      
  }

}





AppRegistry.registerComponent('Map_app2', () => Map_app2);
