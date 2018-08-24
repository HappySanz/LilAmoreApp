import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, Picker, AsyncStorage } from "react-native";

const qtty = [
    
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '9',
      value: '9',
    },
    {
      label: '10',
      value: '10',
    }
  ];

export default class OrderListDetail extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Order Detail';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white' };
        let headerTintColor = 'white';
        
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };

    

    constructor(props) {
        super(props);
    
        this.state = {
            data: [],
            spec_data: [],
            size_data: [],
            wishlisted: '',
            error: null,
            message: null,
            select_size:'',
            select_color:false,
            qty_value: '', 
            color_data: [],
            user_id:''
        };
    }
    
    componentDidMount() {
        AsyncStorage.getItem("user_id").then((value) => {
            this.setState({
              user_id : value
            });
          })
        this.makeRemoteRequest();
    }   


    
    makeRemoteRequest = () => {
        const { navigation } = this.props;
        const orderId =navigation.getParam('order_id' , '');
        const url = `http://littleamore.in/demo/mobileapi/check_my_order`;
        this.setState({ loading: true });
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                    order_id : orderId,
                }),

            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.status==='success'){
                    this.setState({
                        data: res.my_order_details,
                    });           
                } else {
                    this.setState({
                        error: res.status,
                        loading: false,
                        refreshing: false
                    });
                    alert("Product list not found")
                    throw new Error('Network response error.')
                }
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
                                style={styles.imgContainer}>
                                <Image source={{uri: item.product_cover_img}}
                                    style={styles.img  }>
                                </Image>
                                <View>
                                    <Text style={styles.prodName} > 
                                        {item.product_name} 
                                    </Text>
                                    
                                    <View style={{flexDirection: 'row'}}>
                                        <Text 
                                            style={{textDecorationStyle: 'solid',
                                            color:'black',fontSize:15,}}>
                                            {"Quantity : "+item.quantity}
                                        </Text>

                                        <Text 
                                            style={{color:'black',fontSize:15,marginLeft:10}}>
                                            {"Size : "+item.size}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            

                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
            
        );
    }
    addProduct(item) {
        var data = [...this.state.data]
        let index = data.indexOf(item);
        if(this.state.wishlist){
            this.addToCart(data[index].id)
        } else {
            this.addToWishList(data[index].id)
        }
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
    cartText: {
        borderWidth:1,
        borderRadius:5,
        padding:2,
        borderColor:'black',
        color:'black',
        fontSize:12,
        alignSelf:'flex-start'
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
        color: 'gray',
        fontSize: 15,
        color:'black',
        marginRight:0,
        marginBottom:0,
    },
    catName: {
        
        color: 'lightgrey',
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