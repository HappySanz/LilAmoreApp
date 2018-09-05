import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity,TouchableHighlight, AsyncStorage, Button, ScrollView,BackHandler } from 'react-native'

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
        id: '',
        last_name: '',
        birth_date: '',
        gender: '',
        phone_number: '',
        newsletter_status: '',
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
        let headerBackTitle = ' '
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor,headerBackTitle};
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
                id : res.get_profile_details.id,
                username : res.get_profile_details.first_name,
                last_name : res.get_profile_details.last_name,
                email : res.get_profile_details.email,
                phone_number : res.get_profile_details.phone_number,
                birth_date : res.get_profile_details.birth_date,
                newsletter_status : res.get_profile_details.newsletter_status,
                gender : res.get_profile_details.gender,
                userImage : res.get_profile_details.profile_picture
            });
            }
            })
        .catch((error) => {
            console.error(error);
        });
    }
    _userdetailPage () 
    {
        if (this.state.user_id === null || this.state.user_id === '0') 
        {
            alert ('Login to continue')
        }
        else 
        {
            this.props.navigation.navigate('UserdetailScreen', {
                'id': this.state.id,
                'first_name': this.state.first_name, 'last_name': this.state.last_name, 'email': this.state.email, 'birth_date':this.state.birth_date, 'gender':this.state.gender,
                'phone_number': this.state.phone_number, 'newsletter_status': this.state.newsletter_status,
              }); 
        }
        
    }
    logout() 
    {
        AsyncStorage.setItem("user_id",'');
        AsyncStorage.setItem("userid_token_id",'');
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
                  <TouchableHighlight onPress={() => {this._userdetailPage()}} underlayColor="#ffff">
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