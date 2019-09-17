import React from 'react'
import { Button } from 'react-native-elements'
import {
    StyleSheet, View, Image,
    AsyncStorage,TextInput, Switch, ScrollView
} from 'react-native'

import eyeImgHide from './images/hide_password.png';
import eyeImgShow from './images/show_password.png';

export default class AddAddress extends React.Component {

    static navigationOptions = () => {
        let headerTitle = 'New Address';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };
    constructor(props) {
        super(props);
        this.state = {
        user_id : '',
        country_id: '1',
        state: '',
        city: '',
        pincode: '',
        house_no: '',
        street: '',
        landmark: '',
        full_name: '',
        mobile_number: '',
        email_address: '',
        alternative_mobile_number: '',
        address_type_id: '1',
        address_mode: '0',
        SwitchOnValueHolder :  false
        };
        this.showPass = this.showPass.bind(this);
    }

    showPass() {
        this.state.press === false
            ? this.setState({showPass: false, press: true})
            : this.setState({showPass: true, press: false});
    } 

    componentDidMount() {
        AsyncStorage.getItem("user_id").then((value) => {
            this.setState({
              user_id : value
            });
          })
    }   

    renderImage() {
        var imgSource = this.state.press? eyeImgShow : eyeImgHide;
        return (
            <Image
            style={ styles.iconEye }
            source={ imgSource }
            />
        );
    }
    
    saveData = ()=> 
    {
       
        let state = this.state.state;
        
        if (state.length === 0)
        {
            alert("Please Enter the state");
        }
        // else if (city.length === 0)
        // {
        //     alert("Please Enter the city");
        // }
        // else if (pincode.length === 0)
        // {
        //     alert("Please Enter the pincode");
        // }
        // else if (house_no.length === 0)
        // {
        //     alert("Please Enter the house number");
        // }
        // else if (street.length === 0)
        // {
        //     alert("Please Enter the street");
        // }
        // else if (landmark.length === 0)
        // {
        //     alert("Please Enter the landmark");
        // }
        // else if (full_name.length === 0)
        // {
        //     alert("Please Enter the Name");
        // }
        // else if (mobile_number.length === 0)
        // {
        //     alert("Please Enter the phone number");
        // }
        // else if (email_address.length === 0)
        // {
        //     alert("Please Enter the email");
        // }
        
        else
        {
        let apicall = global.baseurl + "address_create"
        fetch(apicall, {
        method: 'POST',
        headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
        //body:"name = 'nameValue' & phone = mobile & email= email & password= passwordValue & newsletter= newletter & mob_key= mobileKey & mobile_type= mobileType" // <-- Post parameters
        body: JSON.stringify({
            user_id : this.state.user_id,
            country_id : '1',
            state : this.state.state,
            city : this.state.city,
            pincode : this.state.pincode,
            house_no : this.state.house_no,
            street : this.state.street,
            landmark : this.state.landmark,
            full_name : this.state.full_name,
            mobile_number : this.state.mobile_number,
            email_address : this.state.email_address,
            alternative_mobile_number : this.state.alternative_mobile_number,
            address_type_id : '1',
            address_mode : this.state.address_mode,
          }),
        })
        .then((response) => response.json())
        .then((responseText) => {
            console.log(responseText)
            if(responseText.status==='success'){
                alert("Address added successfully");
                this.props.navigation.goBack(null)  
            }
        })
        .catch((error) => {
            console.error(error);
        });
        }
    }

    render() {
        return (
            <ScrollView>

                <View style={styles.container}>
                    <View style={styles.txtContainer}>
                        <View >
                            <TextInput
                            style={{marginTop:15,marginLeft:60,marginRight:60,borderColor:'lightgrey',
                            borderWidth:1,}}
                                placeholder="State"
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                placeholderTextColor="lightgrey"
                                underlineColorAndroid="transparent"
                                onChangeText={state => this.setState({state})}
                                value = {this.state.state}
                            />
                        </View>
                        <View >
                            <TextInput
                            style={{marginTop:15,marginLeft:60,marginRight:60,borderColor:'lightgrey',
                            borderWidth:1,}}
                                placeholder="City"
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                placeholderTextColor="lightgrey"
                                underlineColorAndroid="transparent"
                                onChangeText={city => this.setState({city})}
                            value = {this.state.city}
                            />
                            
                        </View>
                        <View >
                            <TextInput
                            style={{marginTop:15,marginLeft:60,marginRight:60,borderColor:'lightgrey',
                            borderWidth:1,}}
                                placeholder="Pincode"
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                placeholderTextColor="lightgrey"
                                underlineColorAndroid="transparent"
                                onChangeText={pincode => this.setState({pincode})}
                            value = {this.state.pincode}
                            />
                            
                        </View>
                        <View >
                            <TextInput
                            style={{marginTop:15,marginLeft:60,marginRight:60,borderColor:'lightgrey',
                            borderWidth:1,}}
                                placeholder="House Number"
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                placeholderTextColor="lightgrey"
                                underlineColorAndroid="transparent"
                                onChangeText={house_no => this.setState({house_no})}
                            value = {this.state.house_no}
                            />
                        </View>
                        <View >
                            <TextInput
                            style={{marginTop:15,marginLeft:60,marginRight:60,borderColor:'lightgrey',
                            borderWidth:1,}}
                                placeholder="Street"
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                placeholderTextColor="lightgrey"
                                underlineColorAndroid="transparent"
                                onChangeText={street => this.setState({street})}
                            value = {this.state.street}
                            />
                            
                        </View>
                        <View >
                            <TextInput
                            style={{marginTop:15,marginLeft:60,marginRight:60,borderColor:'lightgrey',
                            borderWidth:1,}}
                                placeholder="Landmark"
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                placeholderTextColor="lightgrey"
                                underlineColorAndroid="transparent"
                                onChangeText={landmark => this.setState({landmark})}
                            value = {this.state.landmark}
                            />
                            
                        </View>
                        <View >
                            <TextInput
                            style={{marginTop:15,marginLeft:60,marginRight:60,borderColor:'lightgrey',
                            borderWidth:1,}}
                                placeholder="Name"
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                placeholderTextColor="lightgrey"
                                underlineColorAndroid="transparent"
                                onChangeText={full_name => this.setState({full_name})}
                            value = {this.state.full_name}
                            />
                        </View>
                        <View >
                            <TextInput
                            style={{marginTop:15,marginLeft:60,marginRight:60,borderColor:'lightgrey',
                            borderWidth:1,}}
                                placeholder="Mobile Number"
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                placeholderTextColor="lightgrey"
                                underlineColorAndroid="transparent"
                                onChangeText={mobileNumberField => this.setState({mobileNumberField})}
                            value = {this.state.mobileNumberField}
                            />
                            
                        </View>
                        <View >
                            <TextInput
                            style={{marginTop:15,marginLeft:60,marginRight:60,borderColor:'lightgrey',
                            borderWidth:1,}}
                                placeholder="Email"
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                placeholderTextColor="lightgrey"
                                underlineColorAndroid="transparent"
                                onChangeText={email_address => this.setState({email_address})}
                            value = {this.state.email_address}
                            />
                            
                        </View>
                        <View >
                            <TextInput
                            style={{marginTop:15,marginLeft:60,marginRight:60,borderColor:'lightgrey',
                            borderWidth:1,}}
                                placeholder="Mobile Number"
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                placeholderTextColor="lightgrey"
                                underlineColorAndroid="transparent"
                                onChangeText={mobile_number => this.setState({mobile_number})}
                                value = {this.state.mobile_number}
                            />
                        </View>
                        
                        
                        <Switch
                        onValueChange={(value) => this.ShowAlert(value)}
                        style={{alignSelf: 'center',
                        marginTop:20,marginBottom: 10}}
                        value={this.state.SwitchOnValueHolder} />
                        
                    </View>
                    <View style= {styles.container1}>
                        <Button 
                            buttonStyle={styles.buttonSignin}
                            title="ADD"
                            onPress={()=>{this.saveData()}}/>
                                    
                    </View>
                </View>

            </ScrollView>
            
        )
    }
    ShowAlert = (value) =>{

        this.setState({
      
          SwitchOnValueHolder: value
        })
      
        if(value == true)
        {
            this.setState({
                address_mode : '1'
            })
        }
        else{
            this.setState({
                address_mode : '0'
            })
        }
      
    }
}


  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    btnEye: {
        alignSelf: 'flex-end',
        top: 15,
        right:90,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
    container1: {
        flex: 1
    },
    txtContainer: {
        justifyContent: 'center',
        flex: 1
    },
    createacuntbtn: {
        color: '#81c341',
        marginTop: 15,
        fontSize: 12,
        textAlign: 'center',
        opacity: 0.9
    },
    nametextField: {
        alignSelf: 'center',
        bottom:10,
        width:220,
        height: 55,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
   },
    mobileNumbertextField: {
        alignSelf: 'center',
        bottom:10,
        width:220,
        height: 55,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10
},
    emailtextField: {
        alignSelf: 'center',
        bottom:10,
        width:220,
        height: 55,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5
},
    passwordtextField: {
        alignSelf: 'center',
        width:220,
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
        alignSelf: 'center',
        marginTop:20,
        marginBottom:20
    }
})

