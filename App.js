import { BackHandler, AsyncStorage } from 'react-native';
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Splash1 from './components/Splash1';
import Splash from './components/Splash';
import welcomepages from './components/welcomepages';
import Login from './components/Login';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Landing from './components/Landing';
import UserProfile from './components/UserProfile';
import Cart from './components/Cart'

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
    CartScreen: Cart,
  },
  {
    initialRouteName: 'SplashScreen',
  }
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
    CartScreen: Cart,

  },
  {
    initialRouteName: 'SplashScreen1',
  }
);

export default class App extends React.Component {

  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
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


// import React, { Component } from 'react';
// import { BackHandler, AsyncStorage } from 'react-native';
// import { Scene, Router, Actions } from 'react-native-router-flux';


// // Our custom files and classes import
// import Splash from './components/Splash';
// import Splash1 from './components/Splash1';
// import welcomepages from './components/welcomepages';
// import Login from './components/Login';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import ForgotPassword from './components/ForgotPassword';
// import Landing from './components/Landing';
// import UserProfile from './components/UserProfile';
// export default class App extends Component {

//   constructor() {
//     super();
//     this.state = { hasToken: false, isLoaded: false };
//   }

//   componentDidMount() {
//     AsyncStorage.getItem('id_token').then((token) => {
//       this.setState({ hasToken: token !== null, isLoaded: true })
//     });
//   }

//   componentWillMount = () => {
//     BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
//   };

//   render() {
//     if (this.state.hasToken) {
//       return (
//         <Router>
//           <Scene key="root">
//             <Scene initial key="splash" component={Splash1}  />
//             <Scene key="login" component={Login}   />
//             <Scene key="signup" component={SignUp}   />
//             <Scene key="signin" component={SignIn}   />
//             <Scene key="forgot" component={ForgotPassword}   />
//             <Scene key="land" component={Landing}  />
//             <Scene key="profile" component={UserProfile}  />
//           </Scene>
//         </Router>
//       )
//     } else {
//     return(
//         <Router>
//           <Scene key="root">
//             <Scene initial key="splash" component={Splash}  />
//             <Scene key="welcome" component={welcomepages}   />
//             <Scene key="login" component={Login}   />
//             <Scene key="signup" component={SignUp}   />
//             <Scene key="signin" component={SignIn}   />
//             <Scene key="forgot" component={ForgotPassword}   />
//             <Scene key="land" component={Landing}  />
//             <Scene key="profile" component={UserProfile}  />
//           </Scene>
//         </Router>
//     );
//   }
//   }
// }