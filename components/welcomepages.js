import React from 'react'
import {
  Text,
  View,
  Image,
  Button,
  Alert
} from 'react-native'
import { ImageBackground, BackHandler } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper'

var styles = {
  wrapper: {

  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#92BBD9'
  },
  text: {
    color: '#f3f3f3',
    fontSize: 30,
    fontWeight: 'bold'
  },
  fntcont: 
  {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonContainernext:
  {
   position:'absolute',
   alignSelf:'flex-end',
   bottom:0,
  },
}
export default class welcomepages extends React.Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // GoogleSignin.configure({
    // iosClientId: '329415591175-d09idaj0vte9iedtp43tadk04dhh85u0.apps.googleusercontent.com'
    // }).then(() => 
    // {
    // this.getCurrentUser;
    // });
  }
  componentWillUnmount() 
  {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() 
  {
    return true;
  }

  static navigationOptions = ({ navigation }) => {
    return {
        header: () => null
      }
    };
    _onPressSkipButton = () => 
    {
      this.props.navigation.navigate('LoginScreen')
      // Actions.login()
    }
    _onPressNextButton = () => 
    {
      // Actions.login()
      this.props.navigation.navigate('LoginScreen')
    }
    render() {
      return (
        <Swiper style={styles.wrapper}>
          <View style={styles.slide1}>
            <ImageBackground source={require('./images/splashscreen02.jpg')} style={{width: '100%', height: '100%'}}>
              <View style = {styles.fntcont}>
              <Text style= {{ fontSize: 25, color: "#000" }}>  </Text>
              </View>
              <View style={styles.buttonContainernext}>
                <Button style={styles.buttonContainerpre} onPress={this._onPressSkipButton} title="Skip"/>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.slide2}>
            <ImageBackground source={require('./images/splashscreen03.jpg')} style={{width: '100%', height: '100%'}}>
            <View style = {styles.fntcont}>
              <Text style= {{ fontSize: 25, color: "#000" }}> </Text>
            </View>
            <View style={styles.buttonContainernext}>
              <Button style={styles.buttonContainerpre} onPress={this._onPressSkipButton} title="Skip"/>
            </View>
            </ImageBackground>
          </View>
          <View style={styles.slide3}>
            <ImageBackground source={require('./images/splashscreen04.jpg')} style={{width: '100%', height: '100%'}}>
            <View style = {styles.fntcont}>
              <Text style= {{ fontSize: 25, color: "#000" }}>  </Text>
              </View>
          <View style={styles.buttonContainernext}>
            <Button style={styles.buttonContainerpre} onPress={this._onPressNextButton} title="Next"/>
          </View>
            </ImageBackground>
          </View>
      </Swiper>
      )
  }
}