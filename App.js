import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Splash from './components/Splash';
import Login from './components/Login';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Landing from './components/Landing';

const AppNavigator = createStackNavigator(
  {
    SplashScreen: Splash,
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


