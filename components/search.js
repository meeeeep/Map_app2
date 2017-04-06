'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
import MapView from 'react-native-maps';

const styles = require('./styles.js');
const constants = styles.constants;
const { StyleSheet, Text, View, TextInput, ScrollView} = ReactNative;

var Search = React.createClass({
	render: function(){
		return (
			

			<TextInput 
			style={styles.input}
			placeholder= 'Look up address'
			returnKeyType= 'search'
			onChangeText={(text) => this.setState({text})}/>
			
			);
	}
})

module.exports = Search;