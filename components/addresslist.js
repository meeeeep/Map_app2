mport React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { ScrollView, TouchableHighlight, Text } = ReactNative;

var ListItem = React.createClass({
	render: function(){
	 return (
      <TouchableHighlight onPress={this.props.onPress}>
        <ScrollView style={styles.li}>
          <Text style={styles.liText}>
            {this.props.item.address}

            </Text>
        </ScrollView>
      </TouchableHighlight>
          
     );

	}
})


module.exports = ListItem;