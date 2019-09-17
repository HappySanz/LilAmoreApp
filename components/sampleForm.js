import React from 'react'
import { Text, View, TextInput } from 'react-native'
import { Field }  from 'redux-form'
import { Button } from 'react-native-elements';


const myFields = ({label, meta:{error}, input:{onChange}}) =>{
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