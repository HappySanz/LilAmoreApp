import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Splash from './components/Splash';
import Login from './components/Login';
import SignIn from './components/SignIn';

const AppNavigator = createStackNavigator(
  {
    SplashScreen: Splash,
    LoginScreen: Login,
    SigninScreen: SignIn,
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
