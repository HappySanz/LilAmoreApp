import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, AsyncStorage } from "react-native";
import { List, ListItem } from "react-native-elements"

export default class CartItemList extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'My Cart';
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
            console.log(this.state.user_id)
        })
        if(this.state.user_id!=0){
            this.makeRemoteRequest();
        } else {
            alert("Login to continue");
            this.props.navigation.goBack(null) 
        }
    }   


    
    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `http://littleamore.in/demo/mobileapi/view_cart_items`;
        this.setState({ loading: true });
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                user_id: this.state.user_id,
                }),

            })
            .then(res => res.json())
            .then(res => {
                if(res.status==='success'){
                    console.log(this.state.user_id)
                    console.log(res)
                    this.setState({
                        data: res.view_cart_items,
                        cartTotal: res.cart_payment.cart_payment,
                        
                    });
                    console.log(this.state.cartTotal)
                    
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
        const url = `http://littleamore.in/demo/mobileapi/product_cart_remove`;
        this.setState({ loading: true });
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                user_id: this.state.user_id,
                cart_id: prd_id,
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

    moveToWishList = (prd_id) => {
       
        const url = `http://littleamore.in/demo/mobileapi/wishlist`;
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
                alert("Product moved to wishlist successfully");
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
                <View style={styles.infoContainer} >

                    <Text 
                        style={{
                            fontWeight: "bold",
                            color:'black', 
                            alignSelf:'center',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}  > 
                        {"ITEMS ("+this.state.data.length+")"} 
                    </Text>
                    <Text 
                        style={{
                            fontWeight: "bold", 
                            color:'black', 
                            alignSelf:'center',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}   > 
                        {"TOTAL : Rs."+this.state.cartTotal} 
                    </Text>

                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (

                        <View style={styles.container} >
                        <TouchableOpacity 
                            style={styles.imgContainer} 
                            onPress={()=> {
                                console.log('does not work');
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
                                    
                                    <View style={styles.sizeContainer} >
                                        
                                        <Text style={styles.catName} > 
                                            {"Quantity: "+item.quantity} 
                                        </Text>
                                        <Text style={styles.catName} > 
                                            {"Size: "+item.size} 
                                        </Text>
                                    </View>
                                    <Text style={styles.catName} > 
                                            {"\nRs. "+item.price} 
                                    </Text>

                                </View>
                        </TouchableOpacity>
                            
                            <View style={styles.actionContainer} >

                                <Text 
                                    style = {styles.actionTxt}  
                                    onPress = {
                                        ()=> {
                                            this.setState({wishlist: false})
                                            this.deleteProduct(item)
                                            }}
                                > 
                                    {"REMOVE"} 
                                </Text>
                                <Text 
                                    style={styles.actionTxt} 
                                    onPress = {
                                        ()=> {
                                            this.setState({wishlist: true})
                                            this.deleteProduct(item)}}> 
                                    {"MOVE TO WISHLIST"} 
                                </Text>

                            </View>

                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
                <View style={{backgroundColor:'rgb(129, 195, 65)',height:40,flexDirection:'row',justifyContent:'space-evenly'}} >

                    <Text 
                        style = {{
                        color:'white',
                        textAlign:'center',
                        textAlignVertical:'center',
                        height:40,
                        margin:1}}  
                        onPress = {
                            ()=> {
                                if(this.state.user_id){
                                    this.props.navigation.navigate('LandingScreen')
                                } else {
                                    alert('Login to create your own cart')
                                }

                            }}> 
                        {"Continue Shopping"} 
                    </Text>
                    <Text style = {{
                        height:40,
                        width:1,
                        backgroundColor:'white'}} >{""}</Text>
                    <Text 
                        style = {{
                        color:'white',
                        textAlign:'center',
                        textAlignVertical:'center',
                        height:40,
                        margin:1}}  
                        onPress = {
                            ()=> {
                                if(this.state.user_id){
                                    this.props.navigation.navigate('SelectAddressScreen'
                                    , {
                                        // product_id: this.state.prod_data.id,
                                        // product_com_id: this.state.color_data.id,
                                        // quantity:this.state.qty_value,
                                    }
                                );
                                } else {
                                   alert('Login to purchase product')
                                }
                                
                            }}> 
                        {"Checkout"} 
                    </Text>

                </View>
            </ScrollView>
            
        );
    }
    deleteProduct(item) {
    var data = [...this.state.data]
    let index = data.indexOf(item);
    if(this.state.wishlist){
        this.moveToWishList(data[index].product_id)
        this.removeItem(data[index].id)
    } else {
        this.removeItem(data[index].id)
    }
    
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
        color:'black'
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