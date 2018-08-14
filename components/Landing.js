import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, YellowBox, Platform, TouchableHighlight, Image, FlatList, ScrollView, AsyncStorage, Alert} from 'react-native'
import { StackNavigator } from  'react-navigation';
import { DrawerNavigator } from 'react-navigation';
import SideMenu from 'react-native-side-menu';
import { ImageBackground } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper'
import Menu from './Menu';
import { Card } from "react-native-elements";

const leftImg = require('./images/side_menu.png');
const rightImg_One = require('./images/top_wishlist.png');
const rightImg_Two = require('./images/top_cart.png');

console.disableYellowBox = true;

 export default class Landing extends React.Component {

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
        banner_image_val: [],
        newProduct_data:[],
        newProduct_list_title: [],
        newProduct_list_coverimg: [],
        popular_data: [],
        ads_data: [],
        componentlist_data : [],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false,
        isOpen: false,
        selectedItem: 'About',
        len_dat_image:'',
        ads_image: '',
        statarr: [], 
        user_id: '',
      }
    };

    componentDidMount() 
    {
      AsyncStorage.getItem("user_id").then((value) => {
        this.setState({
          user_id : value
        });
      })
      this.fetchhomepageData ()
    }   

    fetchhomepageData () 
    {
      let apicall = global.baseurl + "home_page"
      fetch(apicall, {
        method: 'POST',
        headers: new Headers ({
        'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: JSON.stringify ({
          username: this.state.user_id,
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
            popular_data: res.popular_product_list.data,
            ads_data: res.ads_list.data[0],
            error: res.error || null,
            loading: false,
            refreshing: false
          });
          console.log(this.state.ads_data)
          })
        .catch((error) => {
            console.error(error);
        });
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

      FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 25,
              width: "100%",
              backgroundColor: "white",
            }}
          />
        );
      }

      bestProuduct (product_id) 
      {
        this.props.navigation.navigate('ProductDetailScreen', {
          'product_id': product_id,
        }); 
      }
      popularProduct (product_id) 
      {
        this.props.navigation.navigate('ProductDetailScreen', {
          'product_id': product_id,
        }); 
      }
      space(){
        return (
        <View style = {{height: 200, width: 2, backgroundColor: 'grey'}}
        />)
      }

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
            <Swiper style={styles.wrapper} autoplay = {true} autoplayTimeout = {2.5}>
            <View style={styles.slide1}>
            <TouchableHighlight onPress={() => alert('done')}  underlayColor="#ffff">
            <ImageBackground source={{uri:this.state.ads_data.ad_img}} style={{width: '100%', height: '100%'}}>
            </ImageBackground>
            </TouchableHighlight>
            </View>
            </Swiper> 
            </View>
            <View style={styles.section1Container}>
            <Text>Best Seller</Text>
            </View>
            <View style={styles.FlatListContainer}>
            <FlatList
            horizontal = {true}
            ItemSeparatorComponent={this.space}
            showsHorizontalScrollIndicator={false}
            data={ this.state.newProduct_data }
            renderItem={({item}) => 
            <TouchableHighlight onPress={this.bestProuduct.bind(this, item.id
            )} underlayColor="rgba(0,0,0,0)">
                <View style={{flex:1, flexDirection: 'column', width: 150, alignItems: 'center',}}>
                  <Image source = {{ uri: item.product_cover_img }} style={styles.imageView} />
                  <Text numberOfLines={1} style={styles.textView} >,{item.product_name}
                  </Text>
                  <Text>{'Rs.'+ item.prod_actual_price}</Text>
                </View>
            </TouchableHighlight >
              }
            keyExtractor={(item, index) => index.toString()}/>
            </View>
          </View>
          <View style={styles.adsConatiner}>
            <TouchableHighlight onPress={() => alert('Done')} >
            <ImageBackground source={{uri:this.state.ads_data.ad_img}} style={{width: '100%', height: '100%'}}>
            </ImageBackground>
            </TouchableHighlight >
            </View>
          <View style={styles.sectionContainer}>
          <View style={styles.section2Container}>
            <Text>New Products</Text>
          </View>
          <View style={styles.FlatListContainer}>
            <FlatList
            horizontal = {true}
            ItemSeparatorComponent={this.space}
            showsHorizontalScrollIndicator={false}
            data={ this.state.popular_data }
            renderItem={({item}) => 
            <TouchableHighlight onPress={this.popularProduct.bind(this, item.id )} underlayColor="rgba(0,0,0,0)">
                <View style={{flex:1, flexDirection: 'column', width: 150, alignItems: 'center',}}>
                  <Image source = {{ uri: item.product_cover_img }} style={styles.imageView} />
                  <Text numberOfLines={1} style={styles.textView} >,{item.product_name}
                  </Text>
                  <Text>{'Rs.'+ item.prod_actual_price}</Text>
                </View>
                </TouchableHighlight>
              }
            keyExtractor={(item, index) => index.toString()}  
            />
            </View>
            </View>
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.button}>
            <Image
              source={leftImg}
              style={{ width: 30, height: 30 }}/>
          </TouchableOpacity> 
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.buttonTwo}>
            <Image
              source={rightImg_Two}
              style={{ width: 32, height: 32 }}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.buttonThree}>
            <Image
              source={rightImg_One}
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
      fontWeight: '900',
    },
    swipercontainer: 
    {
      position: 'relative',
      height: 150,
      top: 75,
    },
    FlatListContainer:
    {
      justifyContent: 'center',
       //flex:1,
      // margin: 5,
      // marginTop: (Platform.OS === 'ios') ? 20 : 0,
      backgroundColor: 'white',
      height: 150,
      marginTop: 0,
    },
    section1Container:
    {
      justifyContent: 'center',
      backgroundColor:'#f3f3f3',
      height:36,
      marginTop: 75,
      padding: 10,
    },
    section2Container:
    {
      justifyContent: 'center',
      backgroundColor:'#f3f3f3',
      height:36,
      padding: 10,
    },
    adsConatiner:
    {
      backgroundColor: '#f3f3f3',
      justifyContent: 'center',
      height: 70,
    },
    imageView: {
      width: 80,
      height: 80,
      margin: 7,
      borderRadius : 7,
  },
  textView: {
      width:'50%', 
      padding:10,
      color: 'grey',
      alignItems: 'baseline',
  },
    wrapper: 
    {
      
    },
    caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#81c341',
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
    },
  });
