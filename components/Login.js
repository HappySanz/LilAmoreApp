import React from 'react'
import { StyleSheet, Text, View, BackHandler, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { FBSDK, LoginManager }from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';



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
        header: () => null
      }
    };

    getCurrentUser = async () => {
        try {
          const user = await GoogleSignin.currentUserAsync();
          this.setState({ user });
        } catch (error) {
          console.error(error);
        }
      };

    signIn = async () => {
        try {
            const user = await GoogleSignin.signIn();
            this.setState({ user });
        } catch (error) {
            if (error.code === 'CANCELED') {
            // user cancelled the login flow
            } else {
            // some other error happened
            }
        }
    };

    componentDidMount() 
    {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        GoogleSignin.configure({
            iosClientId: '329415591175-d09idaj0vte9iedtp43tadk04dhh85u0.apps.googleusercontent.com'
          }).then(() => 
          {
            this.getCurrentUser;
        });
    }

    componentWillUnmount() 
    {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() 
    {
        return true;
    }

    FBLogin () {
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function(result) {
              if (result.isCancelled) {
                alert('Login was cancelled');
              } else {
                alert('Login was successful with permissions: '
                  + result.grantedPermissions.toString());
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
                <Text style={styles.title}>{'Blah blah blah'}</Text>
              </View>
            <View style = {styles.signinView}>
              <Button buttonStyle={styles.buttonSignin}title="SIGN IN"onPress={() => this.props.navigation.navigate('SigninScreen')}/>
            </View>
              <View style = {styles.socialMediaView}>
                <Button buttonStyle={styles.buttonFbLogin}title="Facebook Login"onPress={ this.FBLogin}/>
                <Button buttonStyle={styles.googleLogin}title="google plus Login"onPress={ this.signIn}/>
              </View>
            <View style = {styles.skipView}>
              <Text style={styles.buttonSkip}
                onPress={() => this.props.navigation.navigate('LandingScreen')}>{'Skip'}
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
