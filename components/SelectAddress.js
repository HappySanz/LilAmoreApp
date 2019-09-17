import React from 'react'
import { StyleSheet, Text, View,AsyncStorage } from 'react-native'
import RadioForm, {} from 'react-native-simple-radio-button';



export default class UserProfile extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            value : '0',
            user_id : '',
            address_data : [],
            rad_data : []
        }    
    }

    static navigationOptions = () => {
        let headerTitle = 'Select Address';
        let headerStyle = { backgroundColor: 'rgb(129, 195, 65)' };
        let headerTitleStyle = { color: 'white', justifyContent: 'center', textAlign: 'center',
        alignSelf: 'center' };
        let headerTintColor = 'white';
        return { headerTitle, headerStyle, headerTitleStyle, headerTintColor};
    };


    componentDidMount() {
        AsyncStorage.getItem("user_id").then((value) => {
            this.setState({
              user_id : value
            });
        this.makeRemoteRequest();

        })
    }   

    makeRemoteRequest = () => {
        const { navigation } = this.props;

        
        this.setState({ loading: true });
        let apicall = global.baseurl + "address_list"
        fetch(apicall, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                user_id: this.state.user_id,
                }),

            })
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                if(res.status==='success'){
                    this.setState({
                        address_data : res.address_list
                    }); 
                    this.getvalaaa();
                    // console.log(this.state.address_data)
                } else {
                    this.setState({
                        error: res.status,
                        loading: false,
                        refreshing: false
                    });
                    alert("Address detail not found")
                    throw new Error('Network response error.')
                }
            })
            .catch(error => {
            this.setState({ error, loading: false });
        });
    };
    
    getvalaaa(){
        let tempVal =[];
        for(let i=0;i<this.state.address_data.length;i++){
            let lol = (""+this.state.address_data[i].full_name+"\n"+this.state.address_data[i].house_no+
                        ", "+this.state.address_data[i].street+"\n"+this.state.address_data[i].city+
                        ""+this.state.address_data[i].state+" - "+this.state.address_data[i].pincode);
            
            tempVal.push({ label: lol, value: i});
            
            
        }
        // console.log(tempVal)
        this.setState({ rad_data: tempVal });
        // alert(this.state.rad_data)
        // console.log(this.state.rad_data)
        // return(this.state.rad_data);
    }
    sendSelectedPin() {
        console.log(this.state.value)
        // console.log(this.state.address_data)
        const pin = this.state.address_data[this.state.value].pincode;
        this.setState({ loading: true });
        let apicall = global.baseurl + "check_pincode"
        fetch(apicall, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: JSON.stringify({
                pin_code: pin,
                }),
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.status==='success'){
                    // this.props.navigation.navigate('SelectAddressScreen'
                    //                 , {
                    //                     product_id: this.state.prod_data.id,
                    //                     product_com_id: this.state.color_data.id,
                    //                     quantity:this.state.qty_value,
                    //                 })
                    alert(res.status)
                } else {
                    this.setState({
                        error: res.status,
                        loading: false,
                        refreshing: false
                    });
                    alert("Delivery unavailable for selected location")
                    throw new Error('Network response error.')
                }
            })
            .catch(error => {
            this.setState({ error, loading: false });
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topTextContainer}>
                    <Text style={styles.textNoBorder}>{"Confirm shipping address"}</Text>
                    <Text 
                        style={styles.textBorder}
                        onPress = {()=>{this.props.navigation.navigate('AddAddressScreen')}}>
                        {"+ ADD NEW"}
                    </Text>
                </View>
                <View style={styles.centerbox}>

                    <RadioForm
                        radio_props={this.state.rad_data}
                        initial={0}
                        style={styles.radStyleContainer}
                        formHorizontal={false}
                        labelHorizontal={true}
                        buttonColor={'#81c341'}
                        buttonInnerColor={'#81c341'}
                        buttonOuterColor={'#81c341'}
                        buttonSize={10}
                        animation={true}
                        onPress={(value) => {this.setState({value:value})}}
                    />
                </View>
                <View 
                    style={styles.contText} >

                        <Text 
                            style = {{
                            color:'white',
                            textAlign:'center',
                            textAlignVertical:'center',
                            height:40,
                            margin:1}}  
                            onPress = {
                                ()=> {
                                    this.sendSelectedPin()
                                }}> 
                            {"CONTINUE"} 
                        </Text>
                    </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    centerbox: {
        backgroundColor:'white',
        justifyContent:'flex-start',
        alignItems:'flex-start',

    },
    topTextContainer: {
       flexDirection:'row',
       justifyContent:"space-between",
       alignItems:'center',
       marginTop:10,
       marginBottom:10,
       paddingHorizontal:5
    },
    textBorder:{
        borderWidth:1,
        borderColor:'black',
        padding:5,
        color:'black',
        fontSize:12
    },
    textNoBorder:{
        fontSize:15,
        color:'black'
    },
    contText:{
        backgroundColor:'rgb(129, 195, 65)',
        height:40,
        flexDirection:'column',
        justifyContent:'space-between',
        position:'absolute',
        left:0,
        right:0,
        bottom:0
    },
    radStyleContainer: {
        alignItems:'flex-start',
        justifyContent:'space-evenly',
        margin:10
    }
})
