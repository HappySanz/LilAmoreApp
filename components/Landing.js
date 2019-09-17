import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, 
  Platform, TouchableHighlight, Image, 
  FlatList, ScrollView, AsyncStorage, TextInput} from 'react-native'
import { ImageBackground } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import Slideshow from 'react-native-slideshow';

const leftImg = require('./images/side_menu.png');
const rightImg_One = require('./images/top_wishlist.png');
const rightImg_Two = require('./images/top_cart.png');
const rightImg_three = require('./images/search.png');

console.disableYellowBox = true;

 export default class Landing extends React.Component {

    static navigationOptions = () => {

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
        clicked: false,
        searchField:'',
        showCancel: false,
        imglist : [],
        position: 0,
        interval: null,
        banner_image_product_id: [],
        _product_id: '',
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

    componentWillMount() {
      this.setState({
        interval: setInterval(() => {
          this.setState({
            position: this.state.position === this.state.imglist.length -1 ? 0 : this.state.position + 1
          });
        }, 4000)
      });
    }
   
    componentWillUnmount() {
      clearInterval(this.state.interval);
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
          console.log(res.banner_list.data)
          this.setState({
            banner_data: res.banner_list.data ,
            newProduct_data: res.new_product.data ,
            popular_data: res.popular_product_list.data,
            ads_data: res.ads_list.data[0],
            error: res.error || null,
            loading: false,
            refreshing: false
          });
          this._banner_image();
          console.log(this.state.ads_data)
          })
        .catch((error) => {
            console.error(error);
        });
    }
    _banner_image () 
    {
        let tempVal = [];
        for(let i=0;i<this.state.banner_data.length;i++){
          let title = (this.state.banner_data[i].banner_title);
          let caption = (this.state.banner_data[i].banner_desc)
          let url = (this.state.banner_data[i].banner_image);
          let product_id = (this.state.banner_data[i].product_id)
          tempVal.push({ title,caption,url,product_id});
          console.log(tempVal)

      }
      this.setState({imglist: tempVal });
      console.log(this.state.imglist)

    }
    _banner_product_id (_id) 
    {
      let ss = []
      let dd = []
      ss = this.state.banner_data[_id]
      dd = ss.product_id
      this.props.navigation.navigate('ProductDetailScreen', {
        'product_id': dd,
      }); 
      console.log (dd)
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

      toggleCancel(){
        this.setState({
            showCancel: !this.state.showCancel
        });
    }
    
      handleSearch(rex){
        this.toggleCancel();
        this.props.navigation.navigate('SearchResultScreen', {
            'searchKey': rex,
        })
        console.log(rex)
        
     }
      searchClick(){
        if (this.state.showCancel) {
          return (
            <View style = {{height: 50, backgroundColor: '#81c341'}}>
              <TextInput
                style={{marginTop:15,
                    color:"white"}}
                    placeholder="Search"
                    autoCapitalize={'none'}
                    returnKeyType={'search'}
                    autoCorrect={false}
                    placeholderTextColor="lightgrey"
                    underlineColorAndroid="white"
                    onChangeText={(searchField) => this.setState({searchField})}
                    onSubmitEditing={this.handleSearch.bind(this,this.state.searchField)}
                value = {this.state.searchField}
              />
            </View>
            )
        } else {
          return null;
      }
      }
    render() 
    {
      const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;
      return (
          <SideMenu menu={menu} isOpen={this.state.isOpen}
           onChange={isOpen => this.updateMenuState(isOpen)}>
           <View style={styles.container}>
            <TouchableOpacity
              onPress={this.toggle}
              style={styles.button}>
              <Image
                source={leftImg}
                style={{ width: 25, height: 25 }}/>
            </TouchableOpacity> 
            <Text style={styles.headerTitle}>
              LilA'more
            </Text>
            <View style={styles.buttonFour}>
            <TouchableOpacity
              onPress={()=> {this.toggleCancel()}}>
              <Image
                source={rightImg_three}
                style={{ width: 25, height: 25 }}/>
            </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={()=> {this.props.navigation.navigate('CartScreen')}}
              style={styles.buttonTwo}>
              <Image
                source={rightImg_Two}
                style={{ width: 25, height: 25 }}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=> {this.props.navigation.navigate('WishListScreen')}}
              style={styles.buttonThree}>
              <Image
                source={rightImg_One}
                style={{ width: 25, height: 25 }}/>
            </TouchableOpacity> 
            </View>
            {this.searchClick()}
            <ScrollView style={{flex:1,flexDirection:'column', backgroundColor:'lightgrey'}}>
              <View style={{flex:1,flexDirection:'column'}}>
                <View style={styles.swipercontainer}>
                 <Slideshow 
                  dataSource = {this.state.imglist}
                  onPress = {this._banner_product_id.bind(this,this.state.position)}
                  position={this.state.position}
                  onPositionChanged={position => this.setState({ position })} />
                </View>
                <View style={styles.section1Container}>
                 <Text>New Products</Text>
                </View>
                <View style={styles.FlatListContainer}>
                  <FlatList
                    horizontal = {true}
                    ItemSeparatorComponent={this.space}
                    showsHorizontalScrollIndicator={false}
                    data={ this.state.newProduct_data }
                    renderItem={({item}) => 
                      <TouchableHighlight 
                      onPress={this.bestProuduct.bind(this, item.id)}
                      underlayColor="rgba(0,0,0,0)">
                <View style={{flex:1, flexDirection: 'column', width: 150, alignItems: 'center',}}>
                  <Image source = {{ uri: item.product_cover_img }} style={styles.imageView} />
                    <Text numberOfLines={1} style={styles.textView} >,{item.product_name}      
                      </Text>
                        <Text>{'Rs.'+ item.prod_actual_price}</Text>
                </View>
                      </TouchableHighlight>
                    }
                keyExtractor={(item, index) => index.toString()}/>
                </View>
                <View style={styles.adsConatiner}>
                  <TouchableHighlight onPress={() => alert('Done')} >
                    <ImageBackground source={{uri:this.state.ads_data.ad_img}} style={{width: '100%', height: '100%'}}>
                    </ImageBackground>
                  </TouchableHighlight>
                </View>
                <View style={styles.sectionContainer}>

                  <View style={styles.section2Container}>
                  
                    <Text>Popular Products</Text>
                  
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
                    keyExtractor={(item, index) => index.toString()}/>

                  </View>

                </View>
                
              </View>

          </ScrollView>
           
        </SideMenu>     
      );
    }
  }

  const styles = StyleSheet.create({
    button: {
      padding: 10,      
      justifyContent:'center',
      marginTop: 20
    },
    buttonTwo: {
      padding: 10,
      flexDirection:'row',
      position: 'absolute', right: 0, top : 20,
      justifyContent:'flex-end',
    },
    buttonThree:{
      padding: 10,      
      justifyContent:'flex-end',
      position: 'absolute', right: 40,top : 20,
      flexDirection:'row',
    },
    buttonFour:{
      padding: 10,      
      justifyContent:'flex-end',
      position: 'absolute', right: 80,top : 20,
      flexDirection:'row',
    },
    headerTitle:
    {
      left: Platform.OS === 'ios' ? 103 :33,
      justifyContent:'center',
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20
    },
    swipercontainer: 
    {
      position: 'relative',
      height: 150,
      
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
      marginTop:2,
      marginBottom:2,
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
      backgroundColor: '#81c341',
      height:65,
      alignItems:'center',
      flexDirection:'row'
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
    customSlide: {
    height : 200,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customImage: {
    width: 375,
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  });

// import React,{Component} from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import Slideshow from 'react-native-slideshow';
// import PropTypes from 'prop-types';

// export default class SlideshowTest extends Component {
//   constructor(props) {
//     super(props);
 
//     this.state = {
//       position: 1,
//       interval: null,
//       dataSource: [
//         {
//           title: 'Title 1',
//           caption: 'Caption 1',
//           url: 'http://placeimg.com/640/480/any',
//         }, {
//           title: 'Title 2',
//           caption: 'Caption 2',
//           url: 'http://placeimg.com/640/480/any',
//         }, {
//           title: 'Title 3',
//           caption: 'Caption 3',
//           url: 'http://placeimg.com/640/480/any',
//         },
//       ],
//     };
//   }
 
//   componentWillMount() {
//     this.setState({
//       interval: setInterval(() => {
//         this.setState({
//           position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
//         });
//       }, 2000)
//     });
//   }
 
//   componentWillUnmount() {
//     clearInterval(this.state.interval);
//   }
 
//   render() {
//     return (
//     <Slideshow 
//         dataSource={this.state.dataSource}
//         position={this.state.position}
//         onPositionChanged={position => this.setState({ position })} />
//     );
//   }
// }