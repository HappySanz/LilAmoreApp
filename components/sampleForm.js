import React from 'react'
import { Text, View, TextInput } from 'react-native'
import { reduxForm, Field }  from 'redux-form'
import { prependOnceListener } from 'cluster';
import { Button } from 'react-native-elements';

const validate = values =>{
    const errors = {};
    if(!values.username) {
        errors.username = "Invaild credential"
    } else if (values.password.length<8) {
        errors.username = "Enter at least 8 characters"
    }
    
    return errors;
}

const myFields = ({label, meta:{error, toched}, input:{onChange}}) =>{
    return(
        <View>
            <Text>{label}</Text>
            <TextInput
                style ={{borderWidth:1,width:100,marginBottom:10}}
                onChangeText={onChange}/>
            {touched && (error && (<Text style = {{color = 'red'}}>{error}</Text>))} 
        </View>
    )
}

const myBtn = values =>{
    alert(values);
}

const sampleForm = ({
    form : 'ggunique'
})(myForm);

const myForm = props => {
    const {handleSubmit} = props;
    return
    <View>
        <Field
            name="username"
            component={myFields}
            label="Username"
        />

        <Field
            name="password"
            component={myFields}
            label="Password"
        />

        <Button 
            title="Submit"
            onPress={handleSubmit(myBtn)}/>
    </View>
}
export default sampleForm;