import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView} from 'react-native'

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
             <ScrollView style={{flex:1,flexDirection:'column', backgroundColor:'#f3f3f3'}}>
             <View style= {styles.txtInputContainerOne}>
               <Text style = {{margin:10,padding:10}}> First Name </Text>
                <TextInput
                style={styles.inputOne}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={username => this.setState({username})}/>
               <Text style = {{margin:10,padding:10}}> Last Name </Text>
                <TextInput
                style={styles.inputTwo}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={username => this.setState({username})}/>
                <Text style = {{margin:10,padding:10}}> Email Address </Text>
                <TextInput
                style={styles.inputThree}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={username => this.setState({username})}/>
                <Text style = {{margin:10,padding:10}}> Mobile Number </Text>
                <TextInput
                style={styles.inputFour}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={username => this.setState({username})}/>
             </View>
             </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f3f3f3'
    },
    txtInputContainer: 
    {
       justifyContent: 'center',
       alignItems: 'center'
    },
    inputOne:{
        width: 300,
        height: 15,
        borderColor: 'black',
        borderBottomWidth: 0.5,
        left: 27,
    },
    inputTwo: 
    {
        width: 300,
        height: 15,
        borderColor: 'black',
        borderBottomWidth: 0.5,
        left: 27,
    },
    inputThree: 
    {
        width: 300,
        height: 15,
        borderColor: 'black',
        borderBottomWidth: 0.5,
        left: 27,
    },
    inputFour: 
    {
        width: 300,
        height: 15,
        borderColor: 'black',
        borderBottomWidth: 0.5,
        left: 27,
    },
})
