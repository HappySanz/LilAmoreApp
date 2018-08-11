import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'

export default class AccountDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        value : null};    }

    static navigationOptions = ({ navigation }) => {
        let headerTitle = 'Account Settings';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };

    render() {
        
        return (
            <View style={styles.container}>
                <View>
                <TouchableOpacity
                    style={{
                        borderWidth:1,
                        borderColor:'white',
                        width:100,
                        top:20,
                        height:100,
                        borderRadius:100,
                        }}
                    >
                    <Image 
                        source={{uri: 'http://littleamore.in/demo/assets/products/PC_1533287342.jpg'}}
                        style={{height:100,
                            width:100,
                            borderRadius:100,borderWidth:1,
                            borderColor:'white',}}>
                    </Image>
                </TouchableOpacity>
                </View>
                <View>
                    <Text
                    style={{
                        marginTop:25,
                        alignSelf:'center',
                        color:'black'
                        }}>{'Guest User'}</Text>
                    <Text style={{
                        alignSelf:'center',
                        color:'black'
                        }}>{'guest@guest.com'}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        alignItems: 'center'
    },
})
