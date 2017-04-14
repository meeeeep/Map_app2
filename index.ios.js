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
      longitudeDelta: 0.0121,
			},
			markers: [], 
			showMarkers: false
		
		};
		this.onRegionChange = this.onRegionChange.bind(this);
	}
	onRegionChange(region){
		this.setState({region});
	}
   onMarkerChange(markers){
   	this.setState({markers});
   }
   
	
  render() {
    return (

  <View style={styles.container}>
    <MapView
      style={styles.map}
     region={this.state.region} // defines the current location at Atlanta on the map
     onRegionChange={this.onRegionChange}>

    	// let marker = this.state.markers
       
       this.state.markers.map(marker => (
return (
         <MapView.Marker 
         coordinate = {marker.latlng}

         // <MapView.Callout
         // onPress = {() => this._addItem()} />

         />
         ))}
       )
       <ActionButton 
        onPress={this._addItem.bind(this,marker)} 
        title="Search Address"/>

    </MapView>


    </View>

   
    );
  }



_addItem(coordinate) {

    AlertIOS.prompt(
      'Look up address',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Enter',
          onPress: (marker) => console.log(marker)

          // (coordinate) => ({latitude: this.state.region.latitude, 
          //                             longitude: this.state.region.longitude})
          




                            } 
      ],
      'plain-text'
    );
                                      console.log(coordinate)

  }
}






AppRegistry.registerComponent('Map_app2', () => Map_app2);
