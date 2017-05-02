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
  TabBarIOS,
  AlertIOS
} from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
const Search= require('./components/search.js');
const styles= require('./components/styles.js');
const ActionButton = require('./components/button.js');
const ListItem = require('./components/addresslist.js');
const Map = require('./components/map.js');


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

		this.state = { // setting the initial state of the map data to show atlanta region with marker along with listview data
			region: {
			  latitude: 33.753746,
		      longitude: -84.386330,
		      latitudeDelta: 0.0922,
		      longitudeDelta: 0.0121
		  },
			
			coordinate: {
				latitude: 33.749249,
				longitude: -84.387314,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0121
			},

		   selectedTab: 0,

		   textInput: "",


			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2})
		};
		this.itemsRef = this.getRef().child('items');
	   this.onRegionChange = this.onRegionChange.bind(this);
	}
    onRegionChange(region){
		this.setState({region});
	}

	getRef(){ // initializing firebase database
		return firebaseApp.database().ref();
	}

	handleTabPress(tab){
		this.setState({selectedTab: tab})
	    }

 listenForItems(itemsRef){ // function that sets up list of items to be recorded in the database
	itemsRef.on('value', (snap) => {
		var items = [];
		snap.forEach((child) =>{
           items.push({
           address: child.val().address,
         	 _key: child.key
           });
           console.log(items)
     	});
	
     this.setState({
     	dataSource: this.state.dataSource.cloneWithRows(items),
      });
	
	});

 }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
  	    	// console.log(this.state.region);
        //   console.log(this.state.coordinate)

    return (
<TabBarIOS>
    <TabBarIOS.Item
    systemIcon='search'
     selected= {this.state.selectedTab === 0}
     onPress= {() => this.handleTabPress(0)}>
     <MapView
		  style={styles.map}
		  region={this.state.region}
		  onRegionChange={this.onRegionChange}>
			
		 
			<MapView.Marker
			  coordinate={{ 
			  	latitude: this.state.coordinate.latitude,
			    longitude: this.state.coordinate.longitude 
			  }}
			  onPress= {() => console.log(this.state.coordinate)}
			/>

			<View>
			<TextInput 
			style={styles.input}
			placeholder= 'Look up address'
			returnKeyType= 'search'
			keyboardType= 'numbers-and-punctuation'
			value= {this.state.textInput}
			onChangeText={(textInput) => this.setState({textInput})}
		      />

		      <ActionButton 
		      onPress={this._addItem.bind(this)} 
		      title="Search Address"/>
			</View>
		
	    </MapView>
    </TabBarIOS.Item>  

    <TabBarIOS.Item
			systemIcon = "history"
			selected= {this.state.selectedTab === 1}
		    onPress=  {() => this.handleTabPress(1)}
	>	
            <View style= {styles.container}>
			     <Text style={styles.tabContent}> Address History </Text> 
			     <ListView 
                    dataSource= {this.state.dataSource} 
                    renderRow= {this._renderItem.bind(this)}
                    style= {styles.listview}
                    enableEmptySections={true}>
                  </ListView>
			  </View>

		</TabBarIOS.Item>
</TabBarIOS>
	 	
    );
  }
_addItem() { var value = this.state.textInput;
	
	// var value = this.state.textInput
// adds users address to list and moves marker and mapview to that region
     Geocoder.geocodeAddress(value).then(res => { console.log(value)

     // res is an Array of the geocoding object returning the address the user inputs onpress of enter
                                this.state.coordinate.latitude = res[0].position.lat 
                                this.state.coordinate.longitude = res[0].position.lng
                                this.state.region = {latitude: res[0].position.lat,
                                                     longitude: res[0].position.lng}
                                                     console.log(this)
                                                     console.log(this.state.region)
                                                     console.log(this.onRegionChange)

                                this.onRegionChange(this.state.region)

                                this.itemsRef.push({
                                	address: res[0].formattedAddress, 
                                	latCoordinates: res[0].position.lat, 
                                	lngCoordinates: res[0].position.lng
                                })
                            })

           .catch(err => console.log(err)) 

    }
  // _addItem() { // adds users address to list and moves marker and mapview to that region
  //   AlertIOS.prompt(
  //     'Look up address',
  //     null,
  //     [
  //       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  //       {
  //         text: 'Enter',
  //         onPress: (address) => Geocoder.geocodeAddress(address).then(res => {
  //   // res is an Array of the geocoding object returning the address the user inputs onpress of enter

  //                               this.state.coordinate.latitude = res[0].position.lat 
  //                               this.state.coordinate.longitude = res[0].position.lng
  //                               this.state.region = {latitude: res[0].position.lat,
  //                                                    longitude: res[0].position.lng}

  //                               this.onRegionChange(this.state.region)

  //                               this.itemsRef.push(
  //                                 {address: res[0].formattedAddress}
  //                               )
  //                           })

  //                  .catch(err => console.log(err)) 
  //       }
    
  //     ],

  //      'plain-text'
  //   );
  // }

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
