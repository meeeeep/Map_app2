'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles= require('./styles.js');
const ActionButton = ('./components/button.js')
const ListItem = ('./components/addresslist.js')
const constants = styles.constants;
const { StyleSheet, Text, View, TabBarIOS, ListView} = ReactNative;

class TabBar extends Component {

	constructor(props){
		super(props);
		this.state = {
			selectedTab: 0
		}
	}

		handleTabPress(tab){
		this.setState({selectedTab: tab})
	    }
	
			
	render (){
		return (

   <TabBarIOS>


		<TabBarIOS.Item 
			systemIcon = "history"
			selected= {this.state.selectedTab === 0}
		onPress=  {() => this.handleTabPress(0)}
	>	
            <View>
			     <Text> Address History </Text> 
			  </View>

		</TabBarIOS.Item>


		</TabBarIOS>
            
	    )
	}
  
}

module.exports = TabBar;

// <ListView 
//                     // dataSource= {this.state.dataSource} 
//                     // renderRow= {this._renderItem.bind(this)}
//                     style= {styles.listview}
//                     enableEmptySections={true}>
//                   </ListView>

 //       //           <ActionButton 
		//       // // onPress={this._addItem.bind(this)} 
		//       // title="Search Address"/>