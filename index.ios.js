/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';


class Map_app2 extends Component {
	
  render() {
    return (

  <View style={styles.container}>

    <MapView
      style={styles.map}
     initialRegion={{
      latitude: 33.749249,
      longitude: -84.387314,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0121,
    }}
    />
    </View>

    // <MapView.Marker


//     <MapView
//   region={this.state.region}
//   onRegionChange={this.onRegionChange}
// >
//   {this.state.markers.map(marker => (
//     <MapView.Marker
//       coordinate={{latitude: 39.749632,
//       	longitude: -105.000363}}
//       title={ "Hello"}
//       description={"Ping"}
//     />
//   ))}
// </MapView>

  
   

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
  	position: 'absolute',
  	top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
