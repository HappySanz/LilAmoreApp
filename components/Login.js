import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation'
import { createStackNavigator } from 'react-navigation';
export default class Login extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
        header: () => null
      }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>{'Lil` Amore'}</Text>
                <Text style={styles.title}>{'Blah blah blah'}</Text>
                <Button
                    buttonStyle={{
                        backgroundColor: "#81c341",
                        width: 300,
                        height: 45,
                        borderColor: "#81c341",
                        borderWidth: 0,
                        borderRadius: 30
                    }}
                    title="SIGN IN"
                    onPress={() => this.props.navigation.navigate('SigninScreen')}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  logo: {
      fontWeight: 'bold',
      fontSize: 42,
      color: '#81c341',
      top:0,
      justifyContent: 'center',
      alignSelf: 'center'
  },
    container: {
        backgroundColor: 'white',
        flex: 1,
        top:10,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 42,
        color: '#81c341'
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
