/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {MapView, Marker} from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Map_app2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: []
		}
		this.handlePress = this.handlePress.bind(this);
	}
	handlePress(e) {
		this.setState({
			
			markers: [...this.state.markers,
			{
				coordinate: e.nativeEvent.coordinate,
				cost: `$${getRandomInt(50, 300)}`
			}
		]
		})


	}
  render() {
    return (
      <MapView
      style= {styles.container}
    initialRegion={{
      latitude: 33.847666,
      longitude: -84.3730527,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    onPress= {this.handlePress}
    >
    {this.state.markers.map((marker) => {
    	return <Marker {...marker} />
    })}
 </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Map_app2', () => Map_app2);
