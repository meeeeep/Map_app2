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
  },
listview: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },

  tabContent: {
    flex: 1,
    alignItems: 'center',
    margin: 50,
    fontSize:45
  }

});

module.exports= styles;
module.exports.constants = constants;