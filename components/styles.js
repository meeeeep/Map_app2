import {Dimensions, StyleSheet} from'react-native';
const constants = {
  actionColor: '#24CE84'
};
var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
  width: width,
  height: height
},
  input: {
    height: 100,
    paddingTop: 70,
    paddingHorizontal: 8,
    fontSize: 15,
    borderColor: 'black',
    borderWidth: 3
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  }
});

module.exports= styles;
module.exports.constants = constants;