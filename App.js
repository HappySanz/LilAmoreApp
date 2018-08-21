import { BackHandler, AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { StackNavigator } from 'react-navigation'


import Splash1 from './components/Splash1';
import Splash from './components/Splash';
import welcomepages from './components/welcomepages';
import Login from './components/Login';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Landing from './components/Landing';
import Sidemenulist from './components/Sidemenulist';
import UserProfile from './components/UserProfile';
import CartItemList from './components/CartItemList';
import Checkout from './components/Checkout';
import AccountDetail from './components/AccountDetail';
import ChangeAddress from './components/ChangeAddress';
import ProductDetail from './components/ProductDetail';
import SelectAddress from './components/SelectAddress';
import ProductList from './components/ProductList';
import Userdetails from './components/Userdetails';
import Otp from './components/Otp';
import Changepasword from './components/Changepasword';

const AppNavigator = createStackNavigator(
  {
    
    SplashScreen: Splash,
    WelcomeScreen: welcomepages,
    LoginScreen: Login,
    SigninScreen: SignIn,
    SignUpScreen: SignUp,
    ForgotPasswordScreen: ForgotPassword,
    LandingScreen: Landing,
    UserProfileScreen: UserProfile,
    SidemenuScreen: Sidemenulist,
    CartScreen: CartItemList,
    CheckoutScreen : Checkout,
    ChangeAddressScreen : ChangeAddress,
    AccountDetailScreen : AccountDetail,
    ProductDetailScreen : ProductDetail,
    SelectAddressScreen : SelectAddress,
    ProductListScreen : ProductList,
    UserdetailScreen : Userdetails,
    OtpScreen : Otp,
    ChangepaswordScreen : Changepasword,

  },
  {
    initialRouteName: 'SplashScreen',
  },

);

const AppNavigator1 = createStackNavigator(
  {
    SplashScreen: Splash,
    SplashScreen1: Splash1,
    WelcomeScreen: welcomepages,
    LoginScreen: Login,
    SigninScreen: SignIn,
    SignUpScreen: SignUp,
    ForgotPasswordScreen: ForgotPassword,
    LandingScreen: Landing,
    UserProfileScreen: UserProfile,
    SidemenuScreen: Sidemenulist,
    CartScreen: CartItemList,
    CheckoutScreen : Checkout,
    ChangeAddressScreen : ChangeAddress,
    AccountDetailScreen : AccountDetail,
    ProductDetailScreen : ProductDetail,
    SelectAddressScreen : SelectAddress,
    ProductListScreen : ProductList,
    UserdetailScreen : Userdetails,
    OtpScreen : Otp,
    ChangepaswordScreen : Changepasword,

  },
  {
    initialRouteName: 'SplashScreen1',
  },
);

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
    global.baseurl = 'http://littleamore.in/demo/mobileapi/';

  }
  
  componentDidMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    });
  }

  render() {

    if (this.state.hasToken) {
      return (
        <AppNavigator1 />              
      );
    } else {
      return(
        <AppNavigator />
      );
    }
  }
}