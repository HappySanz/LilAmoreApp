import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
    {label: 'No.5 Perks campus,\nUppilipalayam, \nCoimbatore 641015', value: 0 },
    {label: 'No.5 Perks campus,\nUppilipalayam, \nCoimbatore 641015', value: 1 },
    {label: 'No.5 Perks campus,\nUppilipalayam, \nCoimbatore 641015', value: 2 },
];



export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        value : null};    }

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Change Address';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        let headerLeft = null;
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor, headerLeft};
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={false}
                    
                    onPress={(value) => {
                        this.setState({value:value})
                        alert(value)
                    }}
                />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        justifyContent: 'center'
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
