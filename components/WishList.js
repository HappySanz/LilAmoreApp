import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity,ScrollView } from "react-native";
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
        };
    }
    
    componentDidMount() {
        this.makeRemoteRequest();
    }   


    
    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `http://littleamore.in/demo/mobileapi/view_wishlist`;
        this.setState({ loading: true });
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                user_id: '2',
                }),

            })
            .then(res => res.json())
            .then(res => {
                if(res.status==='success'){
                    console.log(res)
                    this.setState({
                        data: page === 1 ? res.view_wishlist : [...this.state.data, ...res.view_wishlist],
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
                user_id: '2',
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
                user_id: '2',
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