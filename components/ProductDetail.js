import React from 'react'
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

const wishlistImg = require('./images/add_wishlist.png');
const shareImg = require('./images/share.png');


export default class ProductDetail extends React.Component {

    static navigationOptions = () => {
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
            bg_color:'white',
            text_color:'black',
            select_id:'',
            qty_value: '1', 
            color_data: [],
            user_id: '',
            mrp_price:'',
            actual_price:'',
        };
    }
    
    componentDidMount() 
    {
        AsyncStorage.getItem("user_id").then((value) => {
            this.setState({
              user_id : value
            });
        this.makeRemoteRequest();

          })
        

    }   
    makeRemoteRequest = () => {
        const { navigation } = this.props;
        
        const prod_id = navigation.getParam('product_id' , 'NO-ID')
        this.setState({ loading: true });
        let apicall = global.baseurl + "product_details"
        fetch(apicall, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                product_id: prod_id,
                user_id: this.state.user_id,
                }),
            })
            .then(res => res.json())
            .then(res => {
                // console.log(res)
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
                    if(res.comb_product.status === 'success' ){
                        this.getActualPrice(0);
                        this.getMrpPrice(0);
            
                    } else if(res.comb_product.status === 'error'){
                        this.setState({ 
                            mrp_price : res.product_details.product_details.prod_mrp_price,
                            actual_price : res.product_details.product_details.prod_actual_price
                        });
                        console.log("this.state.mrp_price")
                    console.log("this.state.actual_price")  
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
        this.setState({ loading: true });
        let apicall = global.baseurl + "product_cart"
        fetch(apicall, {
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
                this.props.navigation.navigate('CartScreen');         
            }
            throw new Error('Network response error.')
            })
            .catch(error => {
            this.setState({ error, loading: false });
            });
    };

    moveToWishList = (prd_id) => {
       
        this.setState({ loading: true });
        let apicall = global.baseurl + "wishlist"
        fetch(apicall, {
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
       
        this.setState({ loading: true });
        let apicall = global.baseurl + "get_product_color"
        fetch(apicall, {
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
            // console.log(res)
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
                            {"Rs."+this.state.mrp_price}
                        </Text>

                        <Text 
                            style={{color:'black',fontSize:15,marginLeft:10}}>
                            {"Rs."+this.state.actual_price}
                        </Text>
                    </View>

                    <View style={{
                            flexDirection:"row",flex:1}}>

                        <TouchableOpacity 
                            style={{
                                flexDirection:"row",
                                borderRadius:0,
                                borderWidth:1,
                                margin:10,
                                borderColor:'black',
                                alignSelf: 'flex-start'
                            }} 
                            onPress={()=> { 
                                // console.log(this.state.user_id)
                                if(this.state.user_id!=0){
                                    this.moveToWishList(this.state.prod_data.id)
                                } else {
                                    alert("Login to create your own wishlist")
                                }
                            }}>

                            <Image
                                source={wishlistImg}
                                style={{ width: 15, height: 15, alignSelf:'center',marginLeft:5 }}
                            />
                        
                            <Text 
                            style={{color:'black',
                            margin:5}} >{'Wishlist'}</Text>
                            
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection:"row",
                            borderRadius:1,
                            borderWidth:1,
                            margin:10,
                            borderColor:'black',
                            alignSelf: 'flex-start'}} 
                            
                            onPress={()=> {
                                alert("Share")
                            }}>

                            <Image
                                source={shareImg}
                                style={{ width: 15, height: 15, alignSelf:'center',marginLeft:5 }}
                            />
                            
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
                
                <View style={styles.cartContainer} >
                    <Text 
                        style = {styles.cartText}  
                        onPress = {
                            ()=> {
                                if(this.state.user_id!=0){
                                    // console.log(this.state.sizes_available)
                                    if(this.state.sizes_available){
                                        if(this.state.select_color){
                                            this.addToCart(this.state.prod_data.id, this.state.select_id, this.state.qty_value);
                                        } else {
                                            alert("Select Size and color")
                                        }
                                        
                                    }   else {
                                            this.addToCart(this.state.prod_data.id, '', this.state.qty_value);
                                        }
                                } else {
                                   alert('Login to purchase product')
                                } 
                            }
                        }> 
                        {"Add to cart"} 
                    </Text>

                </View>
            </View>
        </ScrollView>
            
        );
    }
    checkForPressBg() {
        if(this.state.size_selected){
            this.setState({
                bg_color: 'white',
                text_color : 'black'
            })
        } else {
            this.setState({
                bg_color: 'black',
                white : 'white'
            })
        }
    }

    getMrpPrice(index){

        if(this.state.prod_data.combined_status){
            if(this.state.colors_available&&this.state.select_color){
                this.setState({ 
                    mrp_price : this.state.color_data[index].prod_mrp_price
                });
            } else {
                this.setState({ 
                    mrp_price : this.state.size_data[index].prod_mrp_price
                });
            }

            
            console.log(this.state.mrp_price)

        } else {
            this.setState({ 
                mrp_price : this.state.prod_data.prod_mrp_price
            });
            console.log(this.state.mrp_price)

        }
    }
    getActualPrice(index){
        

        if(this.state.prod_data.combined_status){
            if(this.state.colors_available&&this.state.select_color){
                this.setState({ 
                    actual_price : this.state.color_data[index].prod_actual_price
                });
            }else {
                this.setState({ 
                    actual_price : this.state.size_data[index].prod_actual_price
                });
            }

        } else {
            this.setState({ 
                actual_price : this.state.prod_data.prod_actual_price
            });
            console.log(this.state.actual_price)

        }
    }
    

    showSizeAvail() {
        // console.log(this.state.prod_data.combined_status)
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
                                        this.checkForPressBg();
                                        this.getMrpPrice(this.state.size_data.indexOf(item));
                                        this.getActualPrice(this.state.size_data.indexOf(item));
                                        this.forceUpdate();
                                    }}>
                                    
                                    <Text style={{
                                        borderWidth:1, 
                                        borderColor:'black',
                                        backgroundColor:this.state.bg_color,
                                        color:this.state.text_color,
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
            // console.log("No special size available")
        }
    }


    showColorsAvail() {
        if((this.state.prod_data.combined_status)&&(this.state.size_selected)&&(this.state.colors_available)){
            console.log(this.state.color_data)
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
                                        this.setState({
                                            select_color:true,
                                            select_id : item.id
                                        })
                                        this.getMrpPrice(this.state.color_data.indexOf(item));
                                        this.getActualPrice(this.state.color_data.indexOf(item));
                                        this.forceUpdate();
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
    cartContainer : {
        backgroundColor:'rgb(129, 195, 65)',
        height:40,
        flexDirection:'column',
        justifyContent:'space-between',
        position:'absolute',
        left:0,
        right:0,
        bottom:0
    },
    cartText : {
        color:'white',
        textAlign:'center',
        textAlignVertical:'center',
        height:40,
        margin:1
    }
   
})