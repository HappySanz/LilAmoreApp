import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AsyncStorage,
  FlatList
} from 'react-native';

import Sidemenulist from './Sidemenulist';
import { withNavigation } from 'react-navigation';

const window = Dimensions.get('window');
const uri = this._retrieveData;

 class Menu extends Component {

  static navigationOptions = ({ navigation }) => {

      return {
          header: () => null
        }
  };

  constructor(props) {
    super(props);
    this.state = { FlatListItems: [
        {key: 'Account Setting'},
        {key: 'About us'},
        {key: 'Customer Service'},
        {key: 'Privacy policy'},
        {key: 'Contact us'},
      ]}
    }

  componentDidMount() 
  {
    // AsyncStorage.getItem('component_list')
    //   .then(req => JSON.parse(req))
    //   alert(this.state.req)
    //   .then(json => console.log(json))
    //   .catch(error => console.log('error!'));
      //alert('yes');
  }   

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 30,
          width: 20,
        }}
      />
    );
  }

  GetItem (item) {
   
    if(item === 'Account Setting')
    {
      this.props.navigation.navigate('AccountDetailScreen')
    }
    else
    {
      alert('error')
    }
  }

  render() 
  {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
      <Text style={{color: 'black', fontWeight: 'bold',fontSize: 16,}}>Categoery</Text>
      </View>
      <View style={styles.sidemenuContainer}>
      < Sidemenulist /> 
      </View>
      <View style = {styles.staticConatiner}>
      <FlatList
        data={ this.state.FlatListItems }
        ItemSeparatorComponent = {this.FlatListItemSeparator}
        renderItem={({item}) => <Text style={styles.item} onPress={this.GetItem.bind(this, item.key)} > {item.key} </Text>}
        />
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
    //marginBottom: 20,
    marginTop: 30,
  },
  sidemenuContainer: 
  {
    justifyContent: 'center',
    flex:1,
    marginBottom: 30,
  },
  textView: {
    width:'50%', 
    textAlignVertical:'center',
    padding: 1,
    color: 'black'
},
});

 export default withNavigation(Menu);