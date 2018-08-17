import React from 'react'
import { Button } from 'react-native-elements'
import {
    StyleSheet, Text, View, Image,
    AsyncStorage,TextInput, Keyboard, TouchableOpacity, Platform, Alert
} from 'react-native'

import eyeImg from './images/eye_black.png';

export default class SignIn extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Sign Up';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };
        constructor(props) {
            super(props);
            this.state = {
            showPass: true,
            press: false,
            nameField : '',
            mobileNumberField : '',
            emailField : '',
            passwordField : ''
            };
            this.showPass = this.showPass.bind(this);
        }

        showPass() {
            this.state.press === false
              ? this.setState({showPass: false, press: true})
              : this.setState({showPass: true, press: false});
        } 
    
    saveData = ()=> 
    {
       

        let nameValue = this.state.nameField;
        let mobile = this.state.mobileNumberField;
        let email = this.state.emailField;
        let passwordValue = this.state.passwordField;
        let mobileKey  = '2';
        let mobileType = '2';
        let newletter  = '1';
        
        if (nameValue.length == 0)
        {
            alert("Please Enter the username");
        }
        else if (mobile .length == 0)
        {
            alert("Please Enter the mobile");
        }
        else if (email.length == 0)
        {
            alert("Please Enter the email");
        }
        else if (passwordValue.length == 0)
        {
            alert("Please Enter the assword");
        }
        else
        {
        fetch("http://littleamore.in/demo/mobileapi/registration", {
        method: 'POST',
        headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
        //body:"name = 'nameValue' & phone = mobile & email= email & password= passwordValue & newsletter= newletter & mob_key= mobileKey & mobile_type= mobileType" // <-- Post parameters
        body: JSON.stringify({
            name: nameValue,
            phone: mobile,
            email: email,
            password: passwordValue,
            newsletter: newletter,
            mob_key: mobileKey,
            mobile_type: mobileType ,
          }),
        })
        .then((response) => response.text())
        .then((responseText) => {
        if(responseText.success==='success'){
            alert("User created successfully");
        }
        })
        .catch((error) => {
            console.error(error);
        });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.txtContainer}>
                    <TextInput
                        style={styles.nametextField}
                        placeholder="Name"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        placeholderTextColor="lightgrey"
                        underlineColorAndroid="transparent"
                        onChangeText={nameField => this.setState({nameField})}
                        value = {this.state.nameField}
                    />
                    <TextInput
                        style={styles.mobileNumbertextField}
                        placeholder="Mobile Number"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        placeholderTextColor="lightgrey"
                        underlineColorAndroid="transparent"
                        onChangeText={mobileNumberField => this.setState({mobileNumberField})}
                        value = {this.state.mobileNumberField}
                    />
                    <TextInput
                        style={styles.emailtextField}
                        placeholder="Email"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        placeholderTextColor="lightgrey"
                        underlineColorAndroid="transparent"
                        onChangeText={emailField => this.setState({emailField})}
                        value = {this.state.emailField}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.btnEye}
                        onPress={this.showPass}>
                        <Image 
                            source={eyeImg} style={styles.iconEye} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.passwordtextField}
                        secureTextEntry={this.state.showPass}
                        placeholder="Password"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        placeholderTextColor="lightgrey"
                        underlineColorAndroid="transparent"
                        onChangeText={passwordField => this.setState({passwordField})}
                        value = {this.state.passwordField}
                    />
                </View>
                <View style= {styles.container1}>
                    <Button 
                        buttonStyle={styles.buttonSignin}
                        title="Sign up"
                        onPress={this.saveData}/>
                    <Text style={styles.createacuntbtn}
                        onPress={() => 
                        this.props.navigation.navigate('SigninScreen')}>
                        {"Already have an account"}
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
        top: 20,
        flex: 1
    },
    txtContainer: {
        marginTop: 100,
        justifyContent: 'center',
        flex: 1
    },
    createacuntbtn: {
        color: '#81c341',
        marginTop: 15,
        fontSize: 12,
        textAlign: 'center',
        opacity: 0.9
    },
    nametextField: {
        alignSelf: 'center',
        bottom:10,
        width:220,
        height: 55,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
   },
    mobileNumbertextField: {
        alignSelf: 'center',
        bottom:10,
        width:220,
        height: 55,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
},
    emailtextField: {
        alignSelf: 'center',
        bottom:10,
        width:220,
        height: 55,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5
},
    passwordtextField: {
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
        alignSelf: 'center',
    }
})

