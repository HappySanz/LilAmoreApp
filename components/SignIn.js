import React from 'react'
import { Button } from 'react-native-elements'
import {
    StyleSheet, Text, View, Image,
    AsyncStorage,TextInput, Keyboard, TouchableOpacity, Platform
} from 'react-native'

import eyeImg from './images/eye_black.png';

export default class SignIn extends React.Component {

    // static navigationOptions = ({ navigation }) => {
    //     let headerTitle = 'Sign In';
    //     let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
    //     let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
    //     alignSelf: 'center' };
    //     let headerTintColor = 'white';
    //     return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    // () => this.props.navigation.navigate('LandingScreen')
    // };

    constructor(props) {
        super(props);
        this.state = {
          showPass: true,
          press: false,
          username    : '',
          password    : ''
        };
        this.showPass = this.showPass.bind(this);
    }
    
    showPass() {
        this.state.press === false
          ? this.setState({showPass: false, press: true})
          : this.setState({showPass: true, press: false});
    } 
    
    saveData = ()=> {

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
            alert(usernameValue);
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
            .then((response) => response.text())
            .then((responseText) => {
                alert(responseText)
            //  (this.props.navigation.navigate('LandingScreen'))
            })
            .catch((error) => {
                console.error(error);
            });
        }
        Keyboard.dismiss();      
    }

    // showData = async()=> {
    //     let userData = await AsyncStorage.getItem('userData');
    //     let d = JSON.parse(userData)
    //     alert(d.username +" "+ d.password)
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.txtContainer}>

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        placeholderTextColor="lightgrey"
                        underlineColorAndroid="transparent"
                        onChangeText={username => this.setState({username})}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.btnEye}
                        onPress={this.showPass}>
                        <Image 
                            source={eyeImg} style={styles.iconEye} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input1}
                        secureTextEntry={this.state.showPass}
                        placeholder="Password"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        placeholderTextColor="lightgrey"
                        underlineColorAndroid="transparent"
                        onChangeText={password => this.setState({password})}
                    />
                </View>
                <View style= {styles.container1}>
                    <Button 
                        buttonStyle={styles.buttonSignin}
                        title="SIGN IN"
                        onPress={this.saveData}/>
                    <Text 
                        style= {styles.title}
                        // onPress={this.showData}>
                         onPress={() => 
                         this.props.navigation.navigate('SignUpScreen')}>
                        {"Create account"}
                    </Text>
                    
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
    btnEye: {
        alignSelf: 'flex-end',
        top: 15,
        right:90,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
    container1: {
        top: 0,
        flex: 1
    },
    txtContainer: {
        marginTop: 80,
        justifyContent: 'center',
        flex: 1
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
        width:220,
        height: 55,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5
   },
   input1: {
        alignSelf: 'center',
        top: -25,
        width:220,
        height: 55,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5
},
   buttonSignin: {
        backgroundColor: "#81c341",
        width: 150,
        height: 45,
        borderColor: "#81c341",
        borderWidth: 0,
        borderRadius: 30,
        alignSelf: 'center'
    }
})
