import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, YellowBox, Platform, TouchableHighlight, Image} from 'react-native'
import { StackNavigator } from  'react-navigation';
import { DrawerNavigator } from 'react-navigation';
import SideMenu from 'react-native-side-menu';
import { ImageBackground } from 'react-native';
import Slideshow from 'react-native-slideshow';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Menu from './Menu';
import List from './List';
// import { url } from 'inspector';

const image = require('./images/Sidemeu.png');
 
 export default class Login extends React.Component {

    static navigationOptions = ({ navigation }) => {

        return {
            header: () => null
          }
    };

    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        loading: false,
        banner_data: [],
        newProduct_data: [],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false,
        isOpen: false,
        selectedItem: 'About',
        len_dat_image:'',
        position: 1,
        interval: null,
        dataSource: [],
      };
    }

    componentDidMount() 
    {
      let apicall = global.baseurl + "home_page"
        fetch(apicall, {
          method: 'POST',
          headers: new Headers ({
          'Content-Type': 'application/x-www-form-urlencoded',
          }),
          body: JSON.stringify ({
            username: '0',
          }),
          })
          .then(res => res.json())
          .then((responseText) => {
                return responseText;
            })
          .then(res => {
            console.log(res)
            this.setState({
              banner_data: res.banner_list.data ,
              newProduct_data: res.new_product.data ,
              error: res.error || null,
              loading: false,
              refreshing: false
            });

            for (let index = 0; index < this.state.banner_data.length; index++) 
            {
             this.setState({
              dataSource : this.state.banner_data[index].banner_image 
             })            
             alert(this.state.dataSource);
             console.log(this.state.dataSource);
            }           
              })
          .catch((error) => {
              console.error(error);
          });
          
    }   
    componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }
    componentWillUnmount() {
      clearInterval(this.state.interval);
    }

    toggle() 
    {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  
    updateMenuState(isOpen) {
      this.setState({ isOpen });
    }
  
    onMenuItemSelected = item =>
      this.setState({
        isOpen: false,
        selectedItem: item,

      });
    render() 
    {
      const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;
      return (

          <SideMenu menu={menu} isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}>
          <View style={styles.container}>
          <Text style={styles.headerTitle}>
              LilA'more!
            </Text>
            <View style={styles.swipercontainer}>
            <Slideshow 
              dataSource={this.state.dataSource}
              position={this.state.position}
              onPositionChanged={position => this.setState({ position })} />
            );
            </View>
          </View>
          {/* <List /> */}
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.button}>
            <Image
              source={image}
              style={{ width: 32, height: 32 }}/>
          </TouchableOpacity> 
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.buttonTwo}>
            <Image
              source={image}
              style={{ width: 32, height: 32 }}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.buttonThree}>
            <Image
              source={image}
              style={{ width: 32, height: 32 }}/>
          </TouchableOpacity>  
          </SideMenu>     
      );
    }
  }

  const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      top: 20,
      padding: 10,
      alignSelf:'flex-start',
    },
    buttonTwo: {
      position: 'absolute',
      top: 20,
      padding: 10,
      alignSelf:'flex-end',
    },
    buttonThree:{
      position: 'absolute',
      top: -20,
      padding: 50,
      alignSelf:'flex-end',
    },
    headerTitle:
    {
      position: 'absolute',
      top: 35,
      left: Platform.OS === 'ios' ? 140 : 60 ,
      alignSelf:'center',
      color: 'white',
      fontSize: 20,
    },
    // swipercontainer: 
    // {
    //   position: 'relative',
    //   height: 200,
    //   top: 75,
    // },
    // wrapper: 
    // {
      
    // },
    caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    },
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#00F',
      height:200,
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
    list: 
    {
      flex: 1,
    }
  });
