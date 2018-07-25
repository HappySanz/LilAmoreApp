import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon } from 'react-native-elements';

export default class SignUp extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Sign Up';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };

    render() {
        return (
            <View style={styles.container}>
                
                    
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
