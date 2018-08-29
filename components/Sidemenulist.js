import React, { Component } from 'react';
import { StyleSheet, Platform, View, ActivityIndicator, FlatList, Text, Image, Alert, YellowBox } from 'react-native';
// import { StyleSheet, Text, View, Button, TouchableOpacity, YellowBox, Platform, TouchableHighlight, Image, FlatList, ScrollView, AsyncStorage} from 'react-native'
import { withNavigation } from 'react-navigation';
 
class Sidemenulist extends Component {
 
 constructor(props) {
   super(props);
   this.state = {
    componentlist_data: [],
   }
   YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
  ]);
 }
 
GetItem (category, subCategory) {
    
    this.props.navigation.navigate('SubCategoryListScreen', {
        category_id : category,
        sub_category : subCategory
      });
    // alert(""+category+""+subCategory)
 
 }
 
 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: 30,
         width: 20,
       }}
     />
   );
 }
 componentDidMount(){
    this.fetchComponentList();
   }
fetchComponentList () 
{
    let apicall = global.baseurl + "category_list"
    fetch(apicall, {
    method: 'POST',
    headers: new Headers ({
    'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: JSON.stringify ({
        username: '0',
    }),
    })
    .then(res => res.json())
    .then((responseText) => {
    console.log(responseText)
    return responseText;
    })
    .then(res => {
        this.setState({
        componentlist_data: res.category_list,
        });
        console.log(this.state.componentlist_data);
        })
    .catch((error) => {
        console.error(error);
    });
}

render() {
    return (
        <View style={styles.MainContainer}>
        <FlatList
            data={ this.state.componentlist_data }
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            renderItem={({item}) => 
            <View style={{flex:1, flexDirection: 'row'}}>
            <Text onPress={()=>{this.GetItem(item.id,item.parent_id)}} style={styles.textView} >{item.category_name}</Text>
            </View>
            }
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
    }
}
    
const styles = StyleSheet.create({

MainContainer :{
    justifyContent: 'center',
    flex:1,
    marginTop: 20,
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
},
textView: {
    width:'50%', 
    textAlignVertical:'center',
    padding: 1,
    color: '#000'
}
});

export default withNavigation(Sidemenulist);