import React from 'react'
import { Button } from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native'

export default class Checkout extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Checkout';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };

    render() {
        return (
            <View style={styles.containerMain}>
                <Text>{"Delivery address"}</Text>
                <View style={styles.containerAddress}>
                <Text style={styles.textName}>{"Karthi T"}</Text>                
                <Text style={styles.textChangeAddress}
                onPress={() => {
                    this.props.navigation.navigate('ChangeAddressScreen')}}>{"Change Address"}</Text> 
                <Text style={styles.textAddress}>{"No.5 Perks campus,\nUppilipalayam, \nCoimbatore 641015"}</Text>                
                </View>
                <Text>{"Review order"}</Text>
                <View style={styles.containerOrder}>
                </View>
                <Text>{"Choose payment method"}</Text>
                <View style={styles.containerPayment}>
                </View>
                {/* <View style={styles.containerPrice}>
                <Button buttonStyle={styles.googleLogin}title="Pay"onPress={ alert("Clicked pay")}/>
                </View> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    containerMain: {
        flex:1,
        backgroundColor: 'lightgrey',
    },
    containerAddress: {
        height:100,
        backgroundColor: 'white',
    },
    containerOrder: {
        height:200,
        backgroundColor: 'white',
    },
    containerPayment: {
        height:75,
        backgroundColor: 'white',
    },
    containerPrice: {
        alignItems: 'center',
        backgroundColor: '#81c341',
    },
    textName: {
        
        color:'black'
    },
    textAddress: {
        left:20,
        top:-10,
        color:'black',
    },
    textChangeAddress: {
        alignSelf: 'flex-end',
        color:'green'
    },
    textPrice: {
        alignSelf: 'center',
        color:'white'
    },
    payBtn:
    {
        bottom:0,
        width: '100%',
        height: 50,
        backgroundColor: "#81c341",
        borderColor: "#81c341",
    },
})
