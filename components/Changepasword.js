import React from 'react'
import { StyleSheet, Text, View,Image, TextInput, AsyncStorage, Button } from 'react-native'

export default class Changepasword extends React.Component {

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
            newPassword : '',
            confirmPassword : '',
            status : '',
            msg : '',
            user_id : '',
            password : '',
        }
      };

    componentDidMount() 
    {
        AsyncStorage.getItem("user_id").then((user_id) => {
          this.setState({
            user_id : user_id
          });
        })
        
      }

    _submit () 
    {

        if (this.state.newPassword.length == 0) 
        {
            alert ('Newpassword field cannot be empty')
        }
        else if (this.state.confirmPassword.length == 0)
        {
            alert ('ConfirmPassword field cannot be empty')
        }
        else if (this.state.newPassword !== this.state.confirmPassword)
        {
            alert ('Password incorrect')
        }
        else 
        {
            this._fetchapicall ()
        }
    }

    _fetchapicall () 
    {
        let apicall = global.baseurl + "password_update"
            fetch(apicall, {
            method: 'POST',
            headers: new Headers ({
            'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: JSON.stringify ({
                user_id: this.state.user_id,
                password: this.state.Otp
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
                    alert ('Password changed succesfully')
                    this.props.navigation.navigate('SigninScreen')
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
                 source={require('./images/reset_password.png')} />
               <Text style = {{margin: 15,fontWeight:'bold',fontSize:18}}>
                Reset Your Password
               </Text>
               <Text style = {{margin: 10,fontSize:14,color:'grey',}}>
                Enter your New Password    
               </Text>
               <View style={styles.txtContainer}>
                    <TextInput
                        style={styles.inputOne}
                        placeholder="New Password"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        placeholderTextColor="lightgrey"
                        underlineColorAndroid="transparent"
                        onChangeText={newPassword => this.setState({newPassword})}
                    />
                    <TextInput
                        style={styles.inputTwo}
                        placeholder="Confirm Password"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        placeholderTextColor="lightgrey"
                        underlineColorAndroid="transparent"
                        onChangeText={confirmPassword => this.setState({confirmPassword})}
                    />
                </View>
                 <View style = {styles.sendButtonContainer}>
                 <Button 
                    buttonStyle={styles.buttonDone}
                    title="Done"
                    color= 'white'
                    onPress={() => this._submit()}/>
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
    inputTwo:
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
       borderRadius: 30,
       width: 70,
       height: 40,
    },
    resendButtonContainer: 
    {
        top: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },

})
