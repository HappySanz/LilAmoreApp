import React from 'react'
import { StyleSheet, Text, View,Image, TextInput, TouchableHighlight, AsyncStorage } from 'react-native'

export default class Otp extends React.Component {

    static navigationOptions = () => {
        let headerTitle = '';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor,};
    };

    constructor(props) {
        super(props);
        this.state = {
            Otp : '',
            status : '',
            msg : '',
            email_phone : '',
        }
      };

    componentDidMount() 
    {
        AsyncStorage.getItem("email_phone").then((value) => {
          this.setState({
            email_phone : value
          });
          alert (this.state.email_phone)
        })
        
      }

    _submit () 
    {
        if (this.state.Otp.length != 0) 
        {
            this._fetchapicall ()
        }
    }

    _fetchapicall () 
    {
        let apicall = global.baseurl + "verify_otp_password"
            fetch(apicall, {
            method: 'POST',
            headers: new Headers ({
            'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: JSON.stringify ({
                email_phone: this.state.email_phone,
                otp: this.state.Otp
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
                    this.props.navigation.navigate('ChangepaswordScreen')
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

    resendOtp () 
    {
            let apicall = global.baseurl + "forgot_password"
            fetch(apicall, {
            method: 'POST',
            headers: new Headers ({
            'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: JSON.stringify ({
                email_phone: this.state.email_phone,
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
                 source={require('./images/otp.png')} />
               <Text style = {{margin: 15,fontWeight:'bold',fontSize:18}}>
                 Enter OTP
               </Text>
               <Text style = {{margin: 10,fontSize:14,color:'grey',}}>
                We have sent you access code {"\n"}      
               </Text>
               <Text style = {{marginTop:-20,fontSize:14,color:'grey',}}>
               Via SMS for mobile number verification
               </Text>
               <View style={styles.txtContainer}>
                    <TextInput
                        style={styles.inputOne}
                        placeholder="Enter OTP"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        placeholderTextColor="lightgrey"
                        underlineColorAndroid="transparent"
                        onChangeText={Otp => this.setState({Otp})}
                    />
                </View>
                 <View style = {styles.sendButtonContainer}>
                  <TouchableHighlight onPress={() => this._submit()}>
                    <Image style={{width: 35, height: 35,}}
                    source={require('./images/next_arrow.png')}/>
                   </TouchableHighlight>
                   </View>
                   <View style = {styles.resendButtonContainer}>
                <Text style = {{fontSize:14,color:'grey',}}>
                 Didn't Recieve the OTP? {"\n"}      
                 </Text>
                 <Text style={{color: '#81c341'}}
                 onPress={() => {
                 this.resendOtp()}}>{'Resend Code'}
                </Text>  
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
        marginBottom: 150,
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
        borderBottomWidth: 0.5,
        textAlign: 'center',  
    },
    sendButtonContainer: 
    {
       top: 30,
       justifyContent: 'center',
       backgroundColor: '#81c341',
       alignItems: 'center',
       borderRadius: 50,
       width: 50,
       height: 50,
    },
    resendButtonContainer: 
    {
        top: 90,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
