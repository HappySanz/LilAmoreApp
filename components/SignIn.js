import React from 'react'
import { Button } from 'react-native-elements'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'


import PropTypes from 'prop-types';
import Form from './Form';

export default class SignIn extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
          }
        };

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
          uName:'',pass:''
        };
        this.showPass = this.showPass.bind(this);
    }
    
    showPass() {
        this.state.press === false
          ? this.setState({showPass: false, press: true})
          : this.setState({showPass: true, press: false});
    } 
    
    saveData=()=>{

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                {/* <KeyboardAvoidingView behavior="padding" style={styles.txtContainer}>
                    <TextInput
                        placeholder="Username"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                    />
                    <TextInput
                        secureTextEntry={this.state.showPass}
                        placeholder="Password"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.btnEye}
                        onPress={this.showPass}>
                        <Image 
                            source={eyeImg} style={styles.iconEye} />
                    </TouchableOpacity>
                </KeyboardAvoidingView> */}
                <View style= {styles.container1}>
                    <Button 
                        buttonStyle={styles.buttonSignin}
                        title="SIGN IN"
                        onPress={this.saveData}/>
                    <Text 
                        style= {styles.title}
                        onPress={() => this.props.navigation.navigate('SignUpScreen')}>
                        {"Create account"}
                    </Text>
                    
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    txtContainer: {
        flex: 1,
    },
    container1: {
        top: 0,
        flex: 1
    },
    container2: {
        marginTop: 100,
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width: 128,
        height: 56,
    },
    title: {
        color: '#81c341',
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        opacity: 0.9
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 400,
        padding: 20,
      },
    input: {
      margin: 15,
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
        justifyContent: 'center',
        alignSelf: 'center'
    }
})
