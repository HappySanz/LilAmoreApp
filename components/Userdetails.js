import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native'

export default class AccountDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };  
      }

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'User Details';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };

    componentDidMount ()
    {
       
    }

    render() {
        
        return (
            <View style={styles.container}>
             <View style= {styles.txtInputContainerOne}>
            <Text style> First Name </Text>
              <TextInput
                style={styles.inputOne}
                placeholder="First Name"
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={username => this.setState({username})}
            />
            </View>
            <View style= {styles.txtInputContainerTwo}>
            <Text style> 2 Name </Text>
              <TextInput
                style={styles.inputTwo}
                placeholder="First Name"
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={username => this.setState({username})}
            />
            </View>
            <View style= {styles.txtInputContainerThree}>
            <Text style> 3 Name </Text>
              <TextInput
                style={styles.inputThree}
                placeholder="First Name"
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={username => this.setState({username})}
            />
            </View>
            <View style= {styles.txtInputContainerFour}>
            <Text style> 4 Name </Text>
              <TextInput
                style={styles.inputFour}
                placeholder="First Name"
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={username => this.setState({username})}
            />
            </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f3f3f3'
    },
    txtInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:20.6,
    },
    input:{
        alignSelf: 'center',
        bottom: 10,
        width: 240,
        height: 45,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 0,
        margin: 10,
        top: 2,
    },
    txtInputContainerTwo: {
        flexDirection: 'row',
        alignItems: 'center',
       // padding:30.6,
    },
    inputTwo:{
        alignSelf: 'center',
        bottom: 10,
        width: 240,
        height: 45,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 0,
        margin: 10,
        top: 4,
    },
    txtInputContainerThree: {
        flexDirection: 'row',
        alignItems: 'center',
       // padding:40.6,
    },
    inputThree:{
        alignSelf: 'center',
        bottom: 10,
        width: 240,
        height: 45,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 0,
        margin: 10,
        top: 2,
    },
    txtInputContainerFour: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:50.6,
    },
    inputour:{
        alignSelf: 'center',
        bottom: 10,
        width: 240,
        height: 45,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 0,
        margin: 10,
        top: 2,
    },
})
