import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage } from "react-native";



export default class OrderList extends React.Component {

    static navigationOptions = () => {
        let headerTitle = 'Order List';
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
        this.makeRemoteRequest();

        })
    }   


    
    makeRemoteRequest = () => {
        this.setState({ loading: true });
        let apicall = global.baseurl + "view_orders"
        fetch(apicall, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                    user_id : this.state.user_id
                }),

            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.status==='success'){
                    this.setState({
                        data: res.order_details,
                    });           
                } else {
                    this.setState({
                        error: res.status,
                        loading: false,
                        refreshing: false
                    });
                    alert("Order list not found")
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
                                style={styles.imgContainer} 
                                onPress={()=> {
                                    this.props.navigation.navigate('OrderListDetailScreen',{
                                        order_id : item.order_id
                                    });
                                }}>
                                
                                <View>
                                    <View
                                        style={{flexDirection:'row'}}>
                                        <Text style={styles.prodName} > 
                                            {"Order Id : "} 
                                        </Text>
                                        <Text> 
                                            {item.order_id} 
                                        </Text>
                                        
                                    </View>
                                    <View
                                        style={{flexDirection:'row'}}>
                                        <Text style={styles.prodName} > 
                                            {"Order Placed : "} 
                                        </Text>
                                        <Text> 
                                            {item.purchase_date} 
                                        </Text>
                                        
                                    </View>
                                    <View
                                        style={{flexDirection:'row'}}>
                                        <Text style={styles.prodName} > 
                                            {"Total Amount : "} 
                                        </Text>
                                        <Text> 
                                            {"Rs."+item.total_amount} 
                                        </Text>
                                        
                                    </View>
                                    <View
                                        style={{flexDirection:'row'}}>
                                        <Text style={styles.prodName} > 
                                            {"Ship To : "} 
                                        </Text>
                                        <Text> 
                                            {item.full_name} 
                                        </Text>
                                        
                                    </View>
                                    <View
                                        style={{flexDirection:'row'}}>
                                        <Text style={styles.prodName} > 
                                            {"Delivery : "} 
                                        </Text>
                                        <Text> 
                                            {item.purchase_date} 
                                        </Text>
                                        
                                    </View>
                                    
                                </View>
                            </TouchableOpacity>
                            

                        </View>
                    )}
                    keyExtractor={item => item.order_id}
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
        marginTop:10,        
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
        marginTop:10,
        marginLeft:10,
        marginBottom:10,
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
        alignSelf:'flex-start',
        color: 'black',
        fontSize: 15,
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