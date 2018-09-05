import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, AsyncStorage } from "react-native";
import { List, ListItem } from "react-native-elements"

export default class Wishlist extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Wishlist';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };

    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          data: [],
          cartTotal: '',
          wishlist: false,
          page: 1,
          seed: 1,
          error: null,
          refreshing: false,
          user_id: '',
        };
    }
    
    componentDidMount() {
        AsyncStorage.getItem("user_id").then((value) => {
            this.setState({
              user_id : value
            });
            
        })
        if(this.state.user_id!=0){
            this.makeRemoteRequest();
        } else {
            alert("Login to continue");
            this.props.navigation.goBack(null) 
        }
    }   


    
    makeRemoteRequest = () => {
        console.log(this.state.user_id)
        const { page, seed } = this.state;
        const url = `http://littleamore.in/demo/mobileapi/view_wishlist`;
        this.setState({ loading: true });
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                user_id: this.state.user_id
                }),

            })
            .then(res => res.json())
            .then(res => {
                    console.log(res)
                    if(res.status==='success'){
                    this.setState({
                        data: res.product_list,
                        error: res.error || null,
                        loading: false,
                        refreshing: false
                    });
                    
                    
                } else {
                    this.setState({
                        error: res.status,
                        loading: false,
                        refreshing: false
                    });
                    alert("Your cart is empty...")
                    throw new Error('Network response error.')
                }
            })
            .catch(error => {
            this.setState({ error, loading: false });
        });
    };
      
    removeItem = (prd_id) => {
        const url = `http://littleamore.in/demo/mobileapi/remove_wishlist`;
        this.setState({ loading: true });
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                user_id: this.state.user_id,
                product_id: prd_id,
                }),

            })
            .then(res => res.json())
            .then(res => {
            console.log(res)
            if(res.status==='success'){
                return this.makeRemoteRequest()
            }
            throw new Error('Network response error.')
            })
            .catch(error => {
            this.setState({ error, loading: false });
            });
    };

    
    render() {
        return (
            <ScrollView>

                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (

                        <View style={styles.container} >
                        <TouchableOpacity 
                            style={styles.imgContainer} 
                            onPress={()=> {
                                this.props.navigation.navigate('ProductDetailScreen',{
                                    product_id:item.id
                                });
                            }}>
                            <Image source={{uri: item.product_cover_img}}
                                    style={styles.img  }>
                                </Image>

                                <View>
                                    <Text style={styles.prodName} > 
                                        {item.product_name} 
                                    </Text>
                                    <Text style={styles.catName} > 
                                        {item.category_name} 
                                    </Text>
                                    
                                    {/* <View style={styles.sizeContainer} >
                                        
                                        <Text style={styles.catName} > 
                                            {"Quantity: "+item.quantity} 
                                        </Text>
                                        <Text style={styles.catName} > 
                                            {"Size: "+item.size} 
                                        </Text>
                                    </View> */}
                                    <View style={{flexDirection: 'row',flex:1,margin:10}}>
                                        <Text 
                                            style={{textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid',
                                            color:'black',fontSize:15,}}>
                                            {"Rs."+item.prod_mrp_price}
                                        </Text>

                                        <Text style={styles.catName} 
                                            style={{color:'black',fontSize:15,marginLeft:10}}>
                                            {"Rs."+item.prod_actual_price}
                                        </Text>
                                    </View>
                                    

                                </View>
                        </TouchableOpacity>
                            
                            <View style={styles.actionContainer} >

                                <Text 
                                    style = {styles.actionTxt}  
                                    onPress = {
                                        ()=> {
                                            this.deleteProduct(item)
                                            }}
                                > 
                                    {"REMOVE"} 
                                </Text>
                                

                            </View>

                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
            
        );
    }
    deleteProduct(item) {
    var data = [...this.state.data]
    let index = data.indexOf(item);
    this.removeItem(data[index].id)
    
    data.splice(index, 1);
    this.setState({ data });
    }
}

const styles = StyleSheet.create ({
   
    container: {
        flex: 1,
        marginTop:2,
        backgroundColor: 'white',
    },
    infoContainer: {
        height:40,
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    imgContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    actionContainer: {
        flex:1,
        flexDirection:'row',
        margin:20,
        justifyContent: 'space-evenly',
    },
    actionTxt: {
        alignSelf:'center',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    txtContainer: {
        flex:1,
        flexDirection:'column',
    },
    sizeContainer: {
        flex:1,
        flexDirection:'row',
        marginTop:10
    },
    prodName: {
        width:220,
        color: 'black',
        fontSize: 15,
        marginRight:0,
        marginBottom:0,
    },
    catName: {
        
        color: 'black',
        fontSize: 12,
        marginRight:20,
        marginBottom:0,
   },
   img:{
        height:120,
        width:120,
        margin: 10,
        top:0,
        alignSelf:'flex-start'
   }
})