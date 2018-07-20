import React from 'react'
import { StyleSheet, Text, View, BackHandler } from 'react-native'
import { Button } from 'react-native-elements'
export default class Login extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
        header: () => null
      }
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>{'Lil` Amore'}</Text>

                <View style={styles.centerbox}>
                    <Text style={styles.title}>{'Blah blah blah'}</Text>
                    <Button
                        buttonStyle={styles.buttonSignin}
                        title="SIGN IN"
                        onPress={() => this.props.navigation.navigate('SigninScreen')}/>
                    
                    <Text 
                        style={styles.buttonSkip}
                        onPress={() => this.props.navigation.navigate('LandingScreen')}>
                        {'Skip'}
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
    buttonSkip: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#81c341',
        top: 60,
        justifyContent: 'center',
        alignSelf: 'center'
    }
})
