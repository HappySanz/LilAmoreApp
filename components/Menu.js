import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AsyncStorage,
} from 'react-native';

import Sidemenulist from './Sidemenulist';

const window = Dimensions.get('window');
const uri = this._retrieveData;

export default class Menu extends React.Component {

  static navigationOptions = ({ navigation }) => {

      return {
          header: () => null
        }
  };

  constructor(props) {
    super(props);
    this.state = 
    {

    }
  };

  componentDidMount() 
  {
    // AsyncStorage.getItem('component_list')
    //   .then(req => JSON.parse(req))
    //   alert(this.state.req)
    //   .then(json => console.log(json))
    //   .catch(error => console.log('error!'));
      //alert('yes');
  }   
  render() 
  {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
      <Text style={{color: 'black'}}>Categoery</Text>
      </View>
      <View style={styles.sidemenuContainer}>
      < Sidemenulist /> 
      </View>
      <View style = {styles.statiConatiner}>
      <Text style = {styles.AcountSetting}>
        Account Setting
      </Text>
      <Text style = {styles.AcountSetting}>
        About Us
      </Text>
      <Text style = {styles.AcountSetting}>
        Customer Service
      </Text>
      <Text style = {styles.AcountSetting}>
        Privacy Policy
      </Text>
      <Text style = {styles.AcountSetting}>
        Contact Us
      </Text>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#f3f3f3',
    padding: 10,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  sidemenuContainer: 
  {
    flex: 2,
    
  },
  statiConatiner: 
  {
    flex: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    color: 'black',
  },
});