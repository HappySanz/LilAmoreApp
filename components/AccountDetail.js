import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, AsyncStorage } from 'react-native'

export default class AccountDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        value: null,
        profiledata: [],
        email: '',
        username: '',
        userImage: '',
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
        this.fetchapicall ();
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
            username: '0',
        }),
        })
        .then(res => res.json())
        .then((responseText) => {
        console.log(responseText)
        return responseText;
        })
        .then(res => {
            this.setState({
                profiledata: res.get_profile_details,
                username: res.get_profile_details.first_name,
                email :  res.get_profile_details.email,
                userImage : res.get_profile_details.profile_picture
            });
            console.log(this.state.email);
            })
        .catch((error) => {
            console.error(error);
        });
    }

    logout() 
    {
        AsyncStorage.setItem("user_id",'0');
        AsyncStorage.setItem("userid_token_id",'1');
        this.props.navigation.navigate('LoginScreen')
    }

    render() {
        
        return (
            <View style={styles.container}>
                <View>
                <TouchableOpacity
                    style={{
                        borderWidth:1,
                        borderColor:'white',
                        width:100,
                        top:20,
                        height:100,
                        borderRadius:100,
                        }}
                    >
                    <Image 
                        source={{uri: this.state.userImage}}
                        style={{height:100,
                            width:100,
                            borderRadius:100,borderWidth:1,
                            borderColor:'white',}}>
                    </Image>
                </TouchableOpacity>
                </View>
                <View>
                    <Text
                    style={{
                        marginTop:25,
                        alignSelf:'center',
                        color:'black'
                        }}>{this.state.username}</Text>
                    <Text style={{
                        alignSelf:'center',
                        color:'black'
                        }}>{this.state.email}</Text>
                </View>
                <View style={styles.Maincontainer}>
                <Text style = {styles.userDetails} onPress ={() =>{this.props.navigation.navigate('UserdetailScreen')}}>User Details</Text>
                <Text style = {styles.logout} onPress ={() =>{this.logout()}}>LogOut</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#f3f3f3'
    },
    Maincontainer:{
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 15,
    },
    userDetails: 
    {
        top : 10,
        color: 'black', 
    },
    logout: 
    {
        top : 20,
        color: 'black', 
    }
})
