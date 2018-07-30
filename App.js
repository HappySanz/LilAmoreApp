import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {DrawerNavigator} from 'react-navigation';

// import FBSDK,{ LoginManager }from 'react-native-FBSDK'

import Splash from './components/Splash';
import welcomepages from './components/welcomepages';
import Login from './components/Login';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Landing from './components/Landing';

const AppNavigator = createStackNavigator(
  {
    SplashScreen: Splash,
    WelcomeScreen: welcomepages,
    LoginScreen: Login,
    SigninScreen: SignIn,
    SignUpScreen: SignUp,
    ForgotPasswordScreen: ForgotPassword,
    LandingScreen: Landing,
  },
  {
    initialRouteName: 'SplashScreen',
  }
);


export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}


