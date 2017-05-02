'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';


const styles = require('./styles.js');
const ActionButton = require('../components/button.js');

const constants = styles.constants;
const { StyleSheet, Text, View, TextInput, ScrollView} = ReactNative;



class Search extends Component {
            
         constructor(props){
            super(props);

            this.state= {
            	textInput: ''
            }
         }
	render () {
		return (
			
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
		);
    }
    _addItem = () => { 
// adds users address to list and moves marker and mapview to that region
     Geocoder.geocodeAddress(this.state.textInput).then(res => { console.log(res)
     // res is an Array of the geocoding object returning the address the user inputs onpress of enter
                                this.state.coordinate.latitude = res[0].position.lat 
                                this.state.coordinate.longitude = res[0].position.lng
                                this.state.region = {latitude: res[0].position.lat,
                                                     longitude: res[0].position.lng}

                                this.onRegionChange(this.state.region)

                                this.itemsRef.push({
                                	address: res[0].formattedAddress, 
                                	latCoordinates: res[0].position.lat, 
                                	lngCoordinates: res[0].position.lng
                                })
                            })

           .catch(err => console.log(err)) 

    }
    
    
    
   


}


module.exports = Search;