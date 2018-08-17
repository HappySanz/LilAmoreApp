import React from 'react'
import { Button } from 'react-native-elements'
import {
    StyleSheet, Text, View, Image,
    AsyncStorage,TextInput, Keyboard, TouchableOpacity, Platform, TouchableHighlight, ImageBackground
} from 'react-native'
import { FBSDK, LoginManager, GraphRequest, GraphRequestManager, AccessToken }from 'react-native-fbsdk'
//import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import eyeImgHide from './images/hide_password.png';
import eyeImgShow from './images/show_password.png';
import { Item } from 'native-base';

export default class SignIn extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Sign In';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        let headerBackTitle = ' '
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor,headerBackTitle};
    };

    constructor(props) {
        super(props);
        this.state = {
          showPass: true,
          press: false,
          username : '',
          password : '',
          statusVar: '',
          user_id  : '',
            };
        this.showPass = this.showPass.bind(this);
    }

    showPass() {
        this.state.press === false? 
            this.setState({showPass: false, press: true}) : this.setState({showPass: true, press: false});
    } 
    
    
    saveData = ()=> 
    {
        let usernameValue = this.state.username;
        let passwordValue = this.state.password;
        let mob_keyValue = '2';
        let mobile_typeValue = '2';
        if (usernameValue.length = 0)
        {
            alert("Enter valid username")
        } 
        else if (passwordValue.length = 0) 
        {
            alert("Enter valid password")
        } 
        else
        {
            fetch("http://littleamore.in/demo/mobileapi/login", {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
             body: JSON.stringify({
                username: usernameValue,
                password: passwordValue,
                mob_key: mob_keyValue,
                mobile_type: mobile_typeValue,
                }),

            })
            .then((response) => response.json())
            .then((responseText) => {
                console.log(responseText);
                return responseText;                
            })
            .then(res => {
                this.setState({
                statusVar:res.status,
                user_id:res.userData.customer_id
                });
                if(this.state.statusVar === 'success')
                {   
                 AsyncStorage.setItem("user_id",this.state.user_id);
                 AsyncStorage.setItem('id_token','1');
                 this.props.navigation.navigate('LandingScreen');       
                }
                else
                {
                    alert('error');
                }
            })
        }
        Keyboard.dismiss();      
    }

    signOut = async () => {
        try {
        //   await GoogleSignin.revokeAccess();
        //   await GoogleSignin.signOut();
          this.setState({ user: null });
          alert("Logout successful!");
        } catch (error) {
          this.setState({
            error,
          });
        }
      };

    signIn = async () => {
        try {
            // const user = await GoogleSignin.signIn();
            // this.setState({ user });
            // // alert("Name : "+user.name+"\n givenName : "+user.givenName+"\n familyName : "+user.familyName+"\n email : "+user.email+"\n photo : "+user.photo+"\n id : "+user.id)
            // alert(user.photo);
            // this.saveItem('img_url', user.photo);
            // this.props.navigation.navigate('LandingScreen');
        } catch (error) {
            if (error.code === 'CANCELED') {
            // user cancelled the login flow
            }
            else{
            // some other error happened
            }
        }
    };

    FBLogin () 
    {
        LoginManager.logInWithReadPermissions(['public_profile','email']).then(
            function(result) {
              if (result.isCancelled) {
                alert('Login was cancelled');
              } else  
              {              
                AccessToken.getCurrentAccessToken().then(
                    (data) => 
                    {
                      let accessToken = data.accessToken;
                       //alert(accessToken.toString());
                      const infoRequest = new GraphRequest('/me',
                        {
                          accessToken: accessToken,parameters: {
                            fields: {
                              string: 'email,name,first_name,middle_name,last_name,picture'
                            }
                          }
                        },
                        (error, result) => 
                        {
                        let fbEmail = result.email;
                        let fbUsername = result.name;
                        let fbprofPic = result.picture.data.url;  
                        AsyncStorage.setItem('img_url',fbprofPic);
                        });
                         new GraphRequestManager().addRequest(infoRequest).start();
                    })       
              }
            },
            
            function(error) {
              alert('Login failed with error: ' + error);
            }
          );
    }
    navFpScreen () {
       
        this.props.navigation.navigate('ForgotPasswordScreen')
    }

    renderImage() {
        var imgSource = this.state.press? eyeImgShow : eyeImgHide;
        return (
          <Image
            style={ styles.iconEye }
            source={ imgSource }
          />
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'column'}}>

                    <Text style={styles.titleone}>{'Hello'}</Text>

                    <Text style={styles.titleTwo}>{'Welcome Back'}</Text>

                </View>
                <View style={styles.txtContainer}>
                    <View >
                        <TextInput
                        style={{marginLeft:60,marginRight:60,borderColor:'lightgrey',
                        borderWidth:1,}}
                            placeholder="Username"
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            placeholderTextColor="lightgrey"
                            underlineColorAndroid="transparent"
                            onChangeText={username => this.setState({username})}
                        />
                    </View>

                    <View >
                        
                        <TextInput
                        style={{marginTop:20,marginLeft:60,marginRight:60,borderColor:'lightgrey',
                        borderWidth:1,}}
                            secureTextEntry={this.state.showPass}
                            placeholder="Password"
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            placeholderTextColor="lightgrey"
                            underlineColorAndroid="transparent"
                            onChangeText={password => this.setState({password})}
                        />
                        <TouchableOpacity
                            style = {{padding: 10,marginTop:20,
                                flexDirection:'row',
                                position: 'absolute', right: 60,
                                justifyContent:'flex-end',}}
                            activeOpacity={0.7}
                            onPress={() =>{this.showPass()}}>
                            {
                            this.renderImage()}
                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
                <View style= {styles.fpConatiner}>
                    <Text style={{padding: 10,
                                flexDirection:'row',
                                position: 'absolute', right: 60,
                                justifyContent:'flex-end',color:'black'}} onPress={() =>{this.props.navigation.navigate('ForgotPasswordScreen')}}>
                        Forgot Password
                    </Text>
                </View>
                <View style= {styles.container1}>
                    <Button 
                        buttonStyle={styles.buttonSignin}
                        title="SIGN IN"
                        onPress={this.saveData}/>
                    <Text style = {{left: 165,margin: 10,}}> Or </Text>
                    <View style = {styles.socailmediaConatainer}>
                        <View style = {styles.facebbokView}>
                            <Text style = {styles.fbtxt} onPress ={() =>{this.FBLogin()}}>Facebook</Text>
                        </View>
                        <View style = {styles.gmailView}>
                            <Text style = {styles.gmailtxt} onPress ={() =>{this.signIn()}}> Google +</Text>
                        </View> 
                    </View>            
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    titleone: 
    {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        top: 45,
        left: 45,
    },
    titleTwo: 
    {    
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        top: 45,
        left: 45,
    },
    btnEye: 
    {
        alignItems:'flex-end',
        justifyContent:'center',
        right: 50,
    },
    iconEye: {
        width: 25,
        tintColor: 'rgba(0,0,0,0.2)',
        height: 25,
    },
    container1: {
        marginTop:50
    },
    fpConatiner: 
    {
      
    },
    fpText:
    {
        // flex: 1,
        // top: -50,
        // left: 218,
        color: 'grey'
    },
    txtContainer: {
        marginTop: 120,
        justifyContent: 'center',
        flexDirection:'column'
        // flex: 1,
    },
    txtInputBorder:{
        flexDirection:'row', 
        borderColor:'lightgrey',
        borderWidth:1,
        marginLeft:20,
        marginRight:20,
        marginTop:10
    },
    txtInputBorderPassword:{
        flexDirection:'row', 
        borderColor:'lightgrey',
        borderWidth:1,
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        
    },
    title: {
        color: '#81c341',
        marginTop: 15,
        fontSize: 18,
        textAlign: 'center',
        opacity: 0.9
    },
    input: {
        alignSelf: 'center',
        bottom:10,
        width:280,
        height: 45,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 0,
   },
   input1: {
        alignSelf: 'center',
        top: -15,
        width:280,
        height: 45,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 0
},
   buttonSignin: {
        backgroundColor: "#81c341",
        width: 250,
        height: 45,
        borderColor: "#81c341",
        borderWidth: 0,
        borderRadius: 30,
        alignSelf: 'center',
    },
    socailmediaConatainer:
    {
       //flex: 1,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent:'space-evenly',
       
    },
    facebbokView: 
    {
        backgroundColor: '#3B5998',
        width: 120,
        height: 40,
        borderRadius: 30,
    },
    fbtxt: 
    {
        //flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        top: 12,
        alignSelf: 'center',
    },
    gmailView: 
    {
        backgroundColor: '#d34836',
        width: 120,
        height: 40,
        borderRadius: 30,
    },
    gmailtxt: 
    {
       // flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        top: 12,
        alignSelf: 'center',
    }
})
