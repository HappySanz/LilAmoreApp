import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Button, AsyncStorage} from 'react-native'
import RadioForm, {} from 'react-native-simple-radio-button';

var radio_props_gender = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 },
];

var radio_props_newsletter = [
    {label: 'Yes', value: 0 },
    {label: 'No', value: 1 },
];

export default class AccountDetail extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            value_gender : 0,
            value_newsletter : 0,
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            birthday: '',
            newsletter_status: '',
            gender: '',
            user_id: '',
        };  
    }

    static navigationOptions = () => 
    {
        let headerTitle = 'User Details';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',alignSelf: 'center' };
        let headerTintColor = 'white';
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };

    componentDidMount ()
    {
        AsyncStorage.getItem("user_id").then((value) => 
        {
            this.setState({
              user_id : value
            });
            this.fetchapicall ();
        })
    }

    fetchapicall ()
    {
        let apicall = global.baseurl + "get_profile_details"
        fetch(apicall, {
        method: 'POST',
        headers: new Headers ({
        'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: JSON.stringify ({
            user_id: this.state.user_id
        }),
        })
        .then(res => res.json())
        .then((responseText) => {
        console.log(responseText)
        return responseText;
        })
        .then(res => {
            status = res.status
            console.log (status)
            if(status === 'success')
            {
            this.setState({
                profiledata : res.get_profile_details,
                id : res.get_profile_details.id,
                username : res.get_profile_details.first_name,
                last_name : res.get_profile_details.last_name,
                email : res.get_profile_details.email,
                phone_number : res.get_profile_details.phone_number,
                birth_date : res.get_profile_details.birth_date,
                newsletter_status : res.get_profile_details.newsletter_status,
                gender : res.get_profile_details.gender,
            });
                if(this.state.gender === 'Male') 
                {
                    this.setState({
                        value_gender : 0
                    });
                }
                else
                {
                    this.setState({
                        value_gender : 1
                    });
                }
                if(this.state.newsletter_status === '0') 
                {
                    this.setState({
                        value_newsletter : 0
                    });
                }
                else
                {
                    this.setState({
                        value_newsletter : 1
                    });
                }
              }
            })
        .catch((error) => {
            console.error(error);
        });
    }
    submit () 
    {
        // alert (this.state.user_id)
        // alert (this.state.email)
        // alert (this.state.phone_number)
        // alert (this.state.birth_date)
        // alert (this.state.value_newsletter)
        // alert (this.state.username)
        // alert (this.state.last_name)
        // alert (this.state.value_gender)

       // console.log (this.state.user_id,this.state.email,this.state.phone_number,this.state.birth_date,this.state.value_newsletter,this.state.username,this.state.last_name,this.state.value_gender)

        let apicall = global.baseurl + "update_profile_detail"
        fetch(apicall, {
        method: 'POST',
        headers: new Headers ({
        'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: JSON.stringify ({
            user_id: this.state.user_id,
            email: this.state.email,
            phone_number: this.state.phone_number,
            dob: this.state.birth_date,
            newsletter_status: this.state.value_newsletter,
            first_name: this.state.username,
            last_name: this.state.last_name,
            gender: this.state.value_gender,
        }),
        })
        .then(res => res.json())
        .then((responseText) => {
        console.log(responseText)
        return responseText;
        })
        .then(res => {
            status = res.status
            console.log (status)
            })
        .catch((error) => {
            console.error(error);
        });
    }
    
    render() 
    {
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
                value = {this.state.username}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={username => this.setState({username})}/>
               <Text style = {{margin:10,padding:10}}> Last Name </Text>
                <TextInput
                style={styles.inputTwo}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                value = {this.state.last_name}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={last_name => this.setState({last_name})}/>
                <Text style = {{margin:10,padding:10}}> Email Address </Text>
                <TextInput
                style={styles.inputThree}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                value = {this.state.email}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={email => this.setState({email})}/>
                <Text style = {{margin:10,padding:10}}> Mobile Number </Text>
                <TextInput
                style={styles.inputFour}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                value = {this.state.phone_number}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={phone_number => this.setState({phone_number})}/>
                <Text style = {{margin:10,padding:10}}> Gender </Text>
                <View style= {styles.radioContainer}>
                <RadioForm
                   radio_props={radio_props_gender}
                   radioStyle={{paddingRight: 20}}
                   initial= {this.state.value_gender}
                   formHorizontal={true}
                   labelHorizontal={true}
                   buttonColor={'#000000'}
                   backgroundColor = {'#000000'}
                   buttonSize={10}
                   animation={true}
                   onPress={(value) => {
                   this.setState({value_gender:value})
                   }}/>
                </View> 
                <Text style = {{margin:10,padding:10}}> Birthday Date </Text>
                <TextInput
                style={styles.inputFive}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                value = {this.state.birth_date}
                placeholderTextColor="lightgrey"
                underlineColorAndroid="transparent"
                onChangeText={birth_date => this.setState({birth_date})}/>
                <Text style = {{margin:10,padding:10}}> Profile Picture </Text>
                <TouchableOpacity
                style={styles.customBtnBG}
                onPress={() => {}} >
               <Text style={styles.customBtnText}> choose file ... </Text>
               </TouchableOpacity>
               <Text style = {{margin:10,padding:10}}> News Letter </Text>
                <View style= {styles.newsletterConatiner}>
                <RadioForm
                   radio_props={radio_props_newsletter}
                   radioStyle={{paddingRight: 20}}
                   initial= {this.state.value_newsletter}
                   formHorizontal={true}
                   labelHorizontal={true}
                   buttonColor={'#000000'}
                   backgroundColor = {'#000000'}
                   buttonSize={10}
                   animation={true}
                   onPress={(value) => {
                   this.setState({value_newsletter:value})
                    }}/>
                </View> 
                <Text style = {{margin:10,padding:10}}> Subscribe to our news letter and stay up-to-date
                 with new collections,the latest new lookbooks and   exclusive offers </Text>
                </View>
                <View style={{ justifyContent: 'center',
                    alignItems:'center',backgroundColor: '#81c341',}}>
                    <Button 
                    buttonStyle={styles.submitLogout}
                    title="Submit"
                    color= 'white'
                    onPress={() => this.submit()}/>
                    </View>
             </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f3f3f3',
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
    radioContainer:
    {
        left: 22,
    },
    inputFive: 
    {
        width: 300,
        height: 15,
        borderColor: 'black',
        borderBottomWidth: 0.5,
        left: 27,
    },
    customBtnText: 
    {
        fontSize: 16,
    },
    customBtnBG:
    {
        left: 22,
        width: 110,
        borderColor: 'black',
        borderWidth: 1
    },
    newsletterConatiner:
    {
        left: 22,
    },
    submitcontainer:
    {   
        // left: 1,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems:'center',
       
        backgroundColor: '#81c341',
        borderRadius: 20,
    },
    submitLogout : 
    {
        width: 90,
        height: 35,
        borderRadius: 20,

    }
})
