import React ,{ Component } from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableHighlight, Alert, AsyncStorage, Button, Icon } from 'react-native'



export default class ForgotPassword extends React.Component {

    // static navigationOptions = ({ navigation }) => {
    //     let headerTitle = 'ForgotPassword';
    //     let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
    //     let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
    //     alignSelf: 'center' };
    //     let headerTintColor = 'white';
    //     let headerBackTitle = ' ',
    //      headerLeft = ;
    //     return { headerTitle, headerStyle, headerTitleStyle, headerTintColor, headerBackTitle, headerLeft};
    // };

    static navigationOptions = {
        headerTitle: 'Forgot Password',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: 'rgb(129, 195, 65)'},
      };

    constructor(props) {
        super(props);
        this.state = {
            mobile_num : '',
            status : '',
            msg : '',
        }
      };

    _submit () 
    {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if (this.state.mobile_num.length = 0)
        {
            alert("not empty")
        }
        else if (isNaN(this.state.mobile_num))
        {
            if(isNaN(this.state.mobile_num))
            {
                if(reg.test(this.state.mobile_num) === false)
                {
                    alert('ent valid email')
                }
                else
                {
                    this._fetchapicall ()
                }
            }
            else
            {
                this._fetchapicall ()
            }
        }
    }

    _fetchapicall () 
    { 
            AsyncStorage.setItem("email_phone",this.state.mobile_num);
            let apicall = global.baseurl + "forgot_password"
            fetch(apicall, {
            method: 'POST',
            headers: new Headers ({
            'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: JSON.stringify ({
                email_phone: this.state.mobile_num,
            }),
            })
            .then(res => res.json())
            .then((responseText) => {
                    return responseText;
                })
            .then(res => {
                console.log(res)
                this.setState({
                    status: res.status ,
                    msg: res.msg ,
                  });
                  if(this.state.status === 'success')
                  {
                    Alert.alert(
                        'LilAmore',
                        this.state.msg,
                        [
                          {text: 'Cancel', style: 'Cancel'},
                          {text: 'OK', onPress: () => this.props.navigation.navigate('OtpScreen')},
                        ],
                        { cancelable: false }
                      )
                  }
                  else
                  {
                      alert (this.state.msg)
                  }
                })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.logoContainer}>
                    <Image style={{width: 100, height: 100}}
                    source={require('./images/forgot_password.png')} />
                    <Text style = {{margin: 15,fontWeight:'bold',fontSize:18}}>
                        Forgot Password
                    </Text>
                    <Text style = {{margin: 10,fontSize:14,color:'grey',}}>
                        Enter Your Mobile Number below {"\n"}      
                    </Text>
                    <Text style = {{marginTop:-20,fontSize:14,color:'grey',}}>
                        to receive your OTP
                    </Text>
                    <View style={styles.txtContainer}>
                        <TextInput
                            style={styles.inputOne}
                            placeholder="Mobile No/Email"
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            placeholderTextColor="lightgrey"
                            underlineColorAndroid="transparent"
                            onChangeText={mobile_num => this.setState({mobile_num})}
                        />
                    </View>
                    <View style = {styles.sendButtonContainer}>
                        <TouchableHighlight onPress={() => this._submit()}>
                            <Image style={{width: 20, height: 20,}}
                            source={require('./images/next_arrow.png')}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
         justifyContent: 'center',
        backgroundColor: 'white',
    },
    centerbox: {
        flex:1,
        justifyContent: 'center',
    },
    logoContainer: {
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtContainer:
    {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputOne:
    {
        alignSelf: 'center',
        width:280,
        height: 45,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        textAlign: 'center',  
        borderBottomWidth: 0.5,
    },
    sendButtonContainer: 
    {
       top: 20,
       justifyContent: 'center',
       backgroundColor: '#81c341',
       alignItems: 'center',
       borderRadius: 50,
       width: 50,
       height: 50,
    }
})
