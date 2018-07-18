import React from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'

export default class SignIn extends React.Component {

  static navigationOptions = ({ navigation }) => {
          let headerTitle = 'Sign In';
          let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
          let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
      alignSelf: 'center' };
          let headerTintColor = 'white';
          return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
      };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container}
                            onPress={Keyboard.dismiss}>
                        <View style={styles.logoContainer}>
                            <View style={styles.infoContainer}>

                                    <TextInput style={styles.input}
                                    placeholder="Enter username/email"
                                    placeholderTextColor='black'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    underlineColorAndroid = "transparent"
                                    onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                    />

                                    <TextInput style={styles.input}
                                        placeholder="Enter password"
                                        placeholderTextColor='black'
                                        returnKeyType='go'
                                        secureTextEntry
                                        autoCorrect={false}
                                        underlineColorAndroid = "transparent"
                                        ref={"txtPassword"}
                                    />

                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>SIGN IN</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width: 128,
        height: 56,
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
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
    buttonContainer: {
        backgroundColor: '#81c341',
        paddingVertical: 15,
        width: 120,
        borderRadius: 30,
        alignSelf: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color :'white',
        fontWeight: 'bold',
        fontSize: 18
    }
})
