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

export default class SubCategoryList extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Product List';
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
        const { navigation } = this.props;
        const category =navigation.getParam('category_id' , '');
        const subCategory =navigation.getParam('sub_category' , '');
        const url = `http://littleamore.in/demo/mobileapi/sub_cat_list`;
        this.setState({ loading: true });
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                    cat_id : category,
                    sub_cat_id : subCategory,
                    // user_id : this.state.user_id
                }),

            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.status==='success'){
                    this.setState({
                        data: res.sub_category_list,
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
                                style={styles.imgContainer} 
                                onPress={()=> {
                                    this.props.navigation.navigate('ProductListScreen',{
                                        category_id :item.parent_id,
                                        sub_category :item.id
                                    });
                                }}>
                                <Image source={{uri: item.category_image}}
                                    style={styles.img  }>
                                </Image>
                                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',backgroundColor: 'rgba(0,0,0,0.5)'}}>
                                    
                                    <Text  style={{color:'white',fontSize:20,fontWeight:'bold'}}> 
                                        {item.category_name} 
                                    </Text>
                                    
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
        width:'100%',
        margin: 10,
        top:0,
        alignSelf:'flex-start',
   }
})