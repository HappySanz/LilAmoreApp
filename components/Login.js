import React from 'react'
import { StyleSheet, Text, View, BackHandler, Alert, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements'
import { FBSDK, LoginManager, GraphRequest, GraphRequestManager, AccessToken }from 'react-native-fbsdk'
// import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { Scene, Router, Actions } from 'react-native-router-flux';

// GoogleSignin.getAccessToken()
// .then(token => {
// console.log(token);
// })
// .catch(err => {
// console.log(err);
// });

export default class Login extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
        header: () => null,
        gesturesEnabled: false,
      }
    };

    getCurrentUser = async () => {
        try {
        //   const user = await GoogleSignin.currentUserAsync();
          this.setState({ user });
        } catch (error) {
          console.error(error);
        }
    };

    saveItem = async (item, selectedValue) => {
        try {
            await AsyncStorage.setItem(item, selectedValue);
            this.props.navigation.navigate('LandingScreen');       
          } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
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
    componentDidMount() 
    {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // GoogleSignin.configure({
        // iosClientId: '329415591175-d09idaj0vte9iedtp43tadk04dhh85u0.apps.googleusercontent.com'
        // }).then(() => 
        // {
        // this.getCurrentUser;
        // });
    }
    componentWillUnmount() 
    {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton() 
    {
        return true;
    }
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
    render() {
        return (
            <View style={styles.container}>
              <View style={styles.centerbox}>
                <Text style={styles.logo}>{'Lil` Amore'}</Text>
                <Text style={{color:'black'}}>{'Start \nyou \npurchase'}</Text>
              </View>
            <View style = {styles.signinView}>
              <Button buttonStyle={styles.buttonSignin}title="SIGN IN"onPress={() => this.props.navigation.navigate('SigninScreen')}/>
              {/* <Button buttonStyle={styles.buttonSignin}title="SIGN IN"onPress={() => Actions.signin()}/> */}
            </View>
              <View style = {styles.socialMediaView}>
                <Button buttonStyle={styles.buttonFbLogin}title="Facebook Login"onPress={ this.FBLogin.bind(this)}/>
                {/* <Button buttonStyle={styles.googleLogin}title="google plus Login"onPress={ this.signIn}/> */}
              </View>
              {/* <View style = {styles.socialMediaView}>
                <Button buttonStyle={styles.googleLogin}title="google plus logout"onPress={ this.signOut}/>
              </View> */}
            <View style = {styles.skipView}>
              <Text style={styles.buttonSkip}
                onPress={() => {
                this.saveItem('id_token','1')
                this.props.navigation.navigate('LandingScreen')}}>{'Skip'}
              </Text>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    centerbox: {
        flex:1,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    logo: {
        
        fontWeight: 'bold',
        fontSize: 42,
        color: '#81c341',
        top:10,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        
        fontWeight: 'bold',
        fontSize: 42,
        color: '#81c341',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonSignin: {
        backgroundColor: "#81c341",
        width: 150,
        height: 45,
        borderColor: "#81c341",
        borderWidth: 0,
        borderRadius: 30,
        top: 50,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonFbLogin:
    {
        backgroundColor: "#81c341",
        width: 150,
        height: 45,
        borderColor: "#81c341",
        borderWidth: 0,
        borderRadius: 30,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    googleLogin:
    {
        backgroundColor: "#81c341",
        width: 150,
        height: 45,
        borderColor: "#81c341",
        borderWidth: 0,
        borderRadius: 30,
        top: 30,
    },
    buttonSkip: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#81c341',
        top: 10,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    signinView:
    {
        flex:1,
        justifyContent:'center',
        alignSelf: 'center',
        top: 30,
    },
    socialMediaView:
    {
        flex:1,
        justifyContent:'center',
        alignSelf: 'center',
        top: 10,
    },
    skipView:
    {
        flex:1,
        justifyContent:'center',
    }
})

module.exports = Login;
