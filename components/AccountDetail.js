import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity,TouchableHighlight, AsyncStorage, Button, ScrollView } from 'react-native'
export default class AccountDetail extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
        value: null,
        profiledata: [],
        email: '',
        username: '',
        userImage: '',
        user_id: '',
        status: '',
        msg: '',
        };  
      }
    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Account Settings';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };
    
    componentDidMount ()
    {
        AsyncStorage.getItem("user_id").then((value) => {
            this.setState({
              user_id : value
            });
            this.fetchapicall ();
          })
    }
    fetchapicall ()
    {
        let apicall = global.baseurl + "get_profile_details"
        fetch(apicall, {
        method: 'POST',
        headers: new Headers ({
        'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: JSON.stringify ({
            user_id: this.state.user_id
        }),
        })
        .then(res => res.json())
        .then((responseText) => {
        console.log(responseText)
        return responseText;
        })
        .then(res => {
            status = res.status
            if(status === 'success')
            {
            this.setState({
                profiledata : res.get_profile_details,
                username : res.get_profile_details.first_name,
                email : res.get_profile_details.email,
                userImage : res.get_profile_details.profile_picture
            });
            }
            console.log(res);
            })
        .catch((error) => {
            console.error(error);
        });
    }
    logout() 
    {
        AsyncStorage.setItem("user_id",null);
        AsyncStorage.setItem("userid_token_id",null);
        this.props.navigation.navigate('SplashScreen',{
            old_user :'1'
        })
    }
    render()
    {  
        return (
            <View style={styles.container}>
            <ScrollView style={{flex:1,flexDirection:'column', backgroundColor:'#f3f3f3'}}>
                <View style = {styles.imageConatiner}>
                  <TouchableHighlight onPress={() =>alert ('done')} underlayColor="#ffff">
                    <Image 
                        source={{uri: this.state.userImage}}
                        style={{height:100,
                        width:100,
                        borderRadius:50,
                        borderWidth:1,
                        borderColor:'white',
                        resizeMode: 'stretch'}}>
                    </Image>
                 </TouchableHighlight>
                </View>
                <View style={styles.txtcontainer}>
                  <Text style={{alignSelf:'center',color:'black',fontSize: 20}}>
                   {this.state.username}</Text>
                 <Text style={{alignSelf:'center',color:'black',}}>
                  {this.state.email}</Text>
                </View>
                <View style={styles.Maincontainer}>
                 <TouchableHighlight onPress={() => {this.props.navigation.navigate('WishListScreen')}} underlayColor="#ffff">
                  <View style={styles.Whishlistcontainer}>
                     <Text style = {styles.Whishlist}>Whishlist</Text>
                      <Image 
                        source={require('./images/next.png')}
                        style={{right: 10,top: 20, height:20,
                        width:20,}}>
                      </Image>
                  </View>
                </TouchableHighlight>
                  <TouchableHighlight onPress={() => {this.props.navigation.navigate('ChangepaswordScreen')}} underlayColor="#ffff">
                  <View style={styles.ChangePasswordcontainer}>
                      <Text style = {styles.ChangePassword}>ChangePassword</Text>
                       <Image 
                        source={require('./images/next.png')}
                        style={{right: 10,top: 20, height:20,
                        width:20,}}>
                       </Image>
                  </View>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={() => this.props.navigation.navigate('OrderListScreen')}>
                  <View style={styles.ordercontainer}>
                       <Text style = {styles.order}>Order</Text>
                       <Image 
                        source={require('./images/next.png')}
                        style={{right: 10,top: 20, height:20,
                        width:20,}}>
                      </Image>
                  </View>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={() => {this.props.navigation.navigate('UserdetailScreen')}} underlayColor="#ffff">
                  <View style={styles.userDetailscontainer}>
                      <Text style = {styles.userDetails}>Update My Details</Text>
                      <Image 
                        source={require('./images/next.png')}
                        style={{right: 10,top: 20, height:20,
                        width:20,}}>
                      </Image>
                  </View>
                  </TouchableHighlight>
                  <View style={styles.logoutcontainer}>
                    <Button 
                    buttonStyle={styles.buttonLogout}
                    title="Logout"
                    color= 'white'
                    onPress={() => this.logout()}/>
                    </View>
                </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        alignItems: 'center',
        backgroundColor: '#f3f3f3'
    },
    imageConatiner: 
    {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Maincontainer:{
        margin: 25,
        width: 320,
        height: 340,
        backgroundColor: 'white',
    },
    txtcontainer: 
    {
        margin: 8
    },
    Whishlistcontainer: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        borderBottomWidth: 0.5,
    },
    ChangePasswordcontainer: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        borderBottomWidth: 0.5,
    },
    ordercontainer: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        borderBottomWidth: 0.5,
    },
    userDetailscontainer: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 62,
        borderBottomWidth: 0.5,
    },
    Whishlist: 
    {
        top: 10,
        padding: 10,
        // fontWeight: 'bold',
    },
    ChangePassword: 
    {
        top: 10,
        padding: 10,
        // fontWeight: 'bold'
    },
    order: 
    {
        top: 10,
        padding: 10,
        // fontWeight: 'bold'
    },
    userDetails: 
    {
        top: 10,
        padding: 10,
        // fontWeight: 'bold'
    },
    logoutcontainer:
    {   
        left: 118,
        marginTop : 50,
        justifyContent: 'center',
        alignItems:'center',
        width: 90,
        height: 35,
        backgroundColor: '#81c341',
        borderRadius: 20,
    },
})