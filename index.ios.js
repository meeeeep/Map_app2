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
  ListView,
  AlertIOS
} from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
const Search= require('./components/search.js');
const styles= require('./components/styles.js');
const ActionButton = require('./components/button.js');
const AddressList = require('./components/addresslist.js');


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
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2})
		};
		this.itemsRef = this.getRef().child('items');
	  this.onRegionChange = this.onRegionChange.bind(this);
	}
    onRegionChange(region){
		this.setState({region});
	}
	getRef(){
		return firebaseApp.database().ref();
	}
listenForItems(itemsRef){
	itemsRef.on('value', (snap) => {
		var items = [];
		snap.forEach((address) =>{
           items.push({
         	 region: address.val().address,
         	 _key: address.key
           });
     	});
	
     this.setState({
     	datasource: this.state.datasource.cloneWithRows(items),
     	coordinate: this.state.coordinate

      });
	
	});

}

  componentDidMount() {
    this.listenForItems(this.itemsRef);
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

        <ListView 
           dataSource= {this.state.dataSource} 
           renderRow= {this._renderItem.bind(this)}
           style= {styles.listview}
           enableEmptySections={true}>
           </ListView>

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

  _renderItem(item) {

    const onPress = () => {
      AlertIOS.prompt(
        'Edit or Delete Item',
        null,
        [
          // {text: 'Edit', onPress: (text) => this.itemsRef.child(item._key).update({address: this.state.region})},
          {text: 'Delete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

}





AppRegistry.registerComponent('Map_app2', () => Map_app2);
