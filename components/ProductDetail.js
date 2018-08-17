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

export default class ProductDetail extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Product Detail';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white' };
        let headerTintColor = 'white';
        
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };

    

    constructor(props) {
        super(props);
    
        this.state = {
            prod_data: [],
            spec_data: [],
            size_data: [],
            wishlist: false,
            error: null,
            message: null,
            sizes_available:false,
            colors_available:false,
            size_selected:false,
            select_color:false,
            qty_value: '', 
            color_data: [],
            user_id: '',
        };
    }
    
    componentDidMount() 
    {
        AsyncStorage.getItem("user_id").then((value) => {
            this.setState({
              user_id : value
            });
          })
        this.makeRemoteRequest();
    }   
    makeRemoteRequest = () => {
        const { navigation } = this.props;
        
        const prod_id = navigation.getParam('product_id' , 'NO-ID')
        const url = `http://littleamore.in/demo/mobileapi/product_details`;
        this.setState({ loading: true });
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                product_id: prod_id,
                user_id:'2'
                }),

            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.status==='success'){
                    if(res.product_details.status === 'success'){
                        this.setState({
                            prod_data: res.product_details.product_details,
                        });
                        // console.log(this.state.prod_data)
                    }
                    if(res.product_specification.status === 'success'){
                        this.setState({
                            spec_data: res.product_specification.spec_prod,
                        });
                        // console.log(this.state.spec_data)
                    }
                    if(res.comb_product.status === 'success'){
                        this.setState({
                            sizes_available: true,
                            size_data: res.comb_product.comb_product_list
                        });
                        // console.log(this.state.size_data)
                    }                    
                } else {
                    this.setState({
                        error: res.status,
                        loading: false,
                        refreshing: false
                    });
                    alert("Product detail not found")
                    throw new Error('Network response error.')
                }
            })
            .catch(error => {
            this.setState({ error, loading: false });
        });
    };
      
    addToCart = (prd_id,prd_comb_id,qty) => {
        const url = `http://littleamore.in/demo/mobileapi/product_cart`;
        this.setState({ loading: true });
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                user_id: this.state.user_id,
                product_id: prd_id,
                product_comb_id: prd_comb_id,
                quantity : qty
                }),
            })
            .then(res => res.json())
            .then(res => {
            // console.log(res)
            if(res.status==='success'){
                
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
            // console.log(res)
            if(res.status==='success'){
                alert("Product moved to wishlist successfully");
            }
            throw new Error('Network response error.')
            })
            .catch(error => {
            this.setState({ error, loading: false });
            });
    };

    getColors = (size_id,prd_id) => {
       
        const url = `http://littleamore.in/demo/mobileapi/get_product_color`;
        this.setState({ loading: true });
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                product_id: prd_id,
                size_id: size_id
                }),

            })
            .then(res => res.json())
            .then(res => {
            console.log(res)
            if(res.status === 'success'){
                this.setState({
                    color_data: res.product_color,
                    colors_available: true,
                });
                // console.log(this.state.color_data)
            } else {
                this.setState({
                    colors_available: false,
                });
            }
            throw new Error('Network response error.')
            })
            .catch(error => {
            this.setState({ error, loading: false });
            });
    };
    
    render() {
        return (
            
            <ScrollView >
            <View>
                
                <View style={{backgroundColor:'white'}}>
                    <Image style={{width:"100%",height:250}}
                        source={{uri:this.state.prod_data.product_cover_img}}>
                    </Image>
                    <Text 
                        style={{color:'black',fontSize:15,margin:10}}>
                        {this.state.prod_data.product_name}
                    </Text>

                    <View style={{flexDirection: 'row',flex:1,margin:10}}>
                        <Text 
                            style={{textDecorationLine: 'line-through',
                            textDecorationStyle: 'solid',
                            color:'black',fontSize:15,}}>
                            {"Rs."+this.state.prod_data.prod_mrp_price}
                        </Text>

                        <Text 
                            style={{color:'black',fontSize:15,marginLeft:10}}>
                            {"Rs."+this.state.prod_data.prod_actual_price}
                        </Text>
                    </View>

                    <View style={{
                            flexDirection:"row",flex:1}}>

                        <TouchableOpacity style={{
                            flexDirection:"row",
                            borderRadius:0,
                            borderWidth:1,
                            margin:10,
                            borderColor:'black',
                            alignSelf: 'flex-start'}} 
                            
                            onPress={()=> { alert("WISHLIST")}}>
                        
                            <Text 
                            style={{color:'black',
                            margin:5}} >{'Wishlist'}</Text>
                            
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection:"row",
                            borderRadius:0,
                            borderWidth:1,
                            margin:10,
                            borderColor:'black',
                            alignSelf: 'flex-start'}} 
                            
                            onPress={()=> {
                                alert("Share")
                            }}>
                            
                            <Text
                            style={{color:'black',
                            margin:5}} >{'Share'}</Text>
                                
                        </TouchableOpacity>

                    </View >
                            
                    <View style={{flexDirection:"row",flex:1}}>
                        <Text
                            style={{color:'black',fontSize:15,
                            alignSelf:"center",margin:10}}>{"Quantity"}
                        </Text>
                        <View style={{borderWidth:1,borderColor:'black',margin:10,alignSelf:'flex-start',alignItems:'center'}}>
                            <Picker
                                style={{width:40,height:30,backgroundColor:'white',alignItems:'center'}}
                                selectedValue={this.state.qty_value}
                                onValueChange={itemValue => this.setState({ qty_value: itemValue })}>
                                {qtty.map((i, index) => (
                                <Picker.Item key={index} label={i.label} value={i.value} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>
                
                {this.showSizeAvail()}

                {this.showColorsAvail()}
                
                <View style={{marginTop:5,backgroundColor:'white',flexDirection:'column',}}>
                    <View style={{backgroundColor:'white',flexDirection:'column',marginLeft:10}}>
                        <Text style={{color:'black',fontSize:18,fontWeight:'bold'}}>{"Product Description :"}</Text>
                        <Text style={{color:'black',fontSize:15,margin:5}}>{this.state.prod_data.product_description}</Text>
                        
                    </View>
                </View>

                <View style={{marginTop:5,backgroundColor:'white',flexDirection:'column',}}>
                    <View style={{backgroundColor:'white',flexDirection:'column',marginLeft:10}}>
                        <Text style={{color:'black',fontSize:18,fontWeight:'bold'}}>{"Product Specification : \n"}</Text>
                        <FlatList
                        
                            data={this.state.spec_data}
                            renderItem={({ item }) => (

                                <View >
                                    <Text style={{color:'black',fontSize:15}}>
                                            {"\u2022    "+item.spec_name+" : "+item.spec_value}</Text>
                                </View>
                                    
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                
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
                                    if(this.state.select_color&&this.state.size_selected)
                                    this.addToCart();
                                } else {
                                    alert('Login to create your own cart')
                                }

                              }}> 
                        {"ADD TO CART"} 
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
                                    // if(this.state.sizes_available){
                                    //     if(this.state.sizes_available&&this.state.colors_available){
                                    //         this.props.navigation.navigate('SelectAddressScreen'
                                    //         , {
                                    //             user_id: this.state.user_id,
                                    //             product_id: this.state.prod_data.id,
                                    //             product_com_id: this.state.color_data.id,
                                    //             quantity:this.state.qty_value,
                                    //         }
                                    //         );
                                    //     } else {
                                    //         this.props.navigation.navigate('SelectAddressScreen'
                                    //         , {
                                    //             user_id: this.state.user_id,
                                    //             product_id: this.state.prod_data.id,
                                    //             product_com_id: this.state.color_data.id,
                                    //             quantity:this.state.qty_value,
                                    //         }
                                    //         );
                                    //     }
                                    // }
                                    
                                    
                                } else {
                                   alert('Login to purchase product')
                                }
                                
                              }}> 
                        {"BUY NOW"} 
                    </Text>

                </View>
            </View>
        </ScrollView>
            
        );
    }
    // checkForPressBg() {
    //     if(this.state.select_color){
    //         return ('black');
    //     } else {
    //         return ('white');
    //     }
    // }
    // checkForPressText() {
    //     if(this.state.select_color){
    //         return ('white');
    //     } else {
    //         return ('black');
    //     }
    // }

    showSizeAvail() {
        console.log(this.state.prod_data.combined_status)
        if(this.state.sizes_available){
            return (
                <View style={{marginTop:2,backgroundColor:'white',flexDirection:'row'}}>
                    <View style={{backgroundColor:'white',flexDirection:'row',marginLeft:10}}>
                        <Text 
                        style={{color:'black',
                        textAlignVertical:'center',
                        textAlign: 'center',
                        fontWeight:'bold',
                        fontSize:18}}>
                        {"Select size : "}
                        </Text>
                        <FlatList
                        
                            data={this.state.size_data}
                            horizontal={true}
                            renderItem={({ item }) => (

                                <View >
                                <TouchableOpacity 
                                    
                                    onPress={()=> {
                                        this.getColors(item.mas_size_id,item.product_id)
                                        this.setState({size_selected:true})
                                        this.forceUpdate();
                                    }}>
                                    
                                    <Text style={{
                                        borderWidth:1, 
                                        borderColor:'black',
                                        borderRadius:35,
                                        width:35,
                                        textAlignVertical:'center',textAlign: 'center',
                                        margin:10,
                                        height:35}}>
                                        {item.size}</Text>
                                        
                                </TouchableOpacity>
                                </View>
                                    
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            )
        } else {
            console.log("No special size available")
        }
    }


    showColorsAvail() {
        if((this.state.prod_data.combined_status)&&(this.state.size_selected)(this.state.colors_available)){
            // console.log(this.state.color_data)
            return(

                <View style={{marginTop:2,backgroundColor:'white'}}>
                    <View style={{backgroundColor:'white',flexDirection:'row',marginLeft:10}}>
                        <Text 
                            style={{color:'black',
                            textAlignVertical:'center',
                            textAlign: 'center',
                            fontWeight:'bold',
                            fontSize:18}}>
                            {"Select colour : "}
                        </Text>
                        <FlatList
                        
                            data={this.state.color_data}
                            horizontal={true}
                            renderItem={({ item }) => (

                            <View >
                                <TouchableOpacity 
                                    
                                    onPress={()=> {
                                        // console.log('does not work');
                                    }}>
                                    
                                    <Text style={{
                                        borderWidth:1, 
                                        borderColor:'white',
                                        borderRadius:20,
                                        width:20,
                                        margin:10,
                                        textAlign:'center',
                                        backgroundColor: item.color_code,
                                        height:20}}>
                                        {""}</Text>
                                
                                </TouchableOpacity>
                            </View>
                                    
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create ({
   
})