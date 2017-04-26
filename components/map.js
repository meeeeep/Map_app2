import React, {Component} from 'react';
import ReactNative from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
// import * as firebase from 'firebase';

const styles = require('./styles.js')
const { 
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  TextInput,
  TouchableHighlight, 
  ListView,
  TabBarIOS,
  AlertIOS } = ReactNative;

  // Initialize Firebase: const is a read only reference to a value, which makes since here, because you don't want to override the value of firebase.
// const firebaseConfig = {
//     apiKey: "AIzaSyC-mxSz2gXmxpvaRJ-QFQ2HVpnBmXFd1Lc",
//     authDomain: "mapapp2-fe262.firebaseapp.com",
//     databaseURL: "https://mapapp2-fe262.firebaseio.com",
//     projectId: "mapapp2-fe262",
//     storageBucket: "mapapp2-fe262.appspot.com",
//     messagingSenderId: "8654993061"
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);



class Map extends Component {

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


			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2})
		};
		// this.itemsRef = this.getRef().child('items');
	   this.onRegionChange = this.onRegionChange.bind(this);
	}
    onRegionChange(region){
		this.setState({region});
	}

	// getRef(){ // initializing firebase database
	// 	return firebaseApp.database().ref();
	// }

 // listenForItems(itemsRef){ // function that sets up list of items to be recorded in the database
	// itemsRef.on('value', (snap) => {
	// 	var items = [];
	// 	snap.forEach((child) =>{
 //           items.push({
 //           address: child.val()._address,
 //           latCoordinates: child.val()._latCoordinates,
 //           lngCoordinates: child.val()._lngCoordinates,
 //         	 _key: child.key
 //           });
 //           console.log(items)
 //     	});
	
 //     this.setState({
 //     	dataSource: this.state.dataSource.cloneWithRows(items),
 //      });
	
	// });

 // }

  // componentDidMount() {
  //   this.listenForItems(this.itemsRef);
  // }

  render() {
  	    	// console.log(this.state.region);
        //   console.log(this.state.coordinate)

    return (


	 <View style={styles.container}>

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
	    </MapView>
				
	  </View>	


    );
  }


  _addItem() { // adds users address to list and moves marker and mapview to that region
    AlertIOS.prompt(
      'Look up address',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Enter',
          onPress: (value) => Geocoder.geocodeAddress(value).then(res => {
    // res is an Array of the geocoding object returning the address the user inputs onpress of enter

                                this.state.coordinate.latitude = res[0].position.lat 
                                this.state.coordinate.longitude = res[0].position.lng
                                this.state.region = {latitude: res[0].position.lat,
                                                     longitude: res[0].position.lng}

                                this.onRegionChange(this.state.region)

                                // this.itemsRef.push({
                                // 	address: res[0].formattedAddress, 
                                // 	latCoordinates: res[0].position.lat, 
                                // 	lngCoordinates: res[0].position.lng
                                // })
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





module.exports= Map;