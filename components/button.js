'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles= require('./styles.js');
const constants = styles.constants;
const { StyleSheet, Text, View, TouchableHighlight} = ReactNative;


var ActionButton = React.createClass({
  render: function(){
    return (
      <View style={styles.action}>
        <TouchableHighlight
         underlayColor={constants.actionColor}
          onPress={this.props.onPress}>
          <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>

    );
  }
})

module.exports = ActionButton;