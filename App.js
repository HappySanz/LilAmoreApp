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
import UserProfile from './components/UserProfile';
import CartItemList from './components/CartItemList';
import Checkout from './components/Checkout';
import AccountDetail from './components/AccountDetail';
import ChangeAddress from './components/ChangeAddress';
import ProductDetail from './components/ProductDetail';
import SelectAddress from './components/SelectAddress';


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
    CartScreen: CartItemList,
    CheckoutScreen : Checkout,
    ChangeAddressScreen : ChangeAddress,
    AccountDetailScreen : AccountDetail,
    ProductDetailScreen : ProductDetail,
    SelectAddressScreen : SelectAddress,
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
    CartScreen: CartItemList,
    CheckoutScreen : Checkout,
    ChangeAddressScreen : ChangeAddress,
    AccountDetailScreen : AccountDetail,
    ProductDetailScreen : ProductDetail,
    SelectAddressScreen : SelectAddress,

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


// import React, { Component } from 'react';
 
// import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox } from 'react-native';

// import { DrawerNavigator } from 'react-navigation';

// import { StackNavigator } from 'react-navigation'

// class HamburgerIcon extends Component {

//   toggleDrawer=()=>{

//     console.log(this.props.navigationProps);
    
//     this.props.navigationProps.toggleDrawer();

//   }
 
//   render() {
 
//     return (
 
//       <View style={{flexDirection: 'row'}}>
 
//         <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >

//           <Image
//             source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png'}}
//             style={{ width: 25, height: 25, marginLeft: 5}}
//           />

//         </TouchableOpacity>
 
//       </View>
    
//     );
  
  
//   }
// }
 
// class MainActivity extends Component {

//   constructor(props) {
 
//     super(props);
  
//     YellowBox.ignoreWarnings([
//      'Warning: componentWillMount is deprecated',
//      'Warning: componentWillReceiveProps is deprecated',
//    ]);
  
//   }
 
//    render()
//    {
//       return(
 
//          <View style = { styles.MainContainer }>
 
//             <Text style={{fontSize: 23}}> This is Activity - 1 </Text>
          
//          </View>
//       );
//    }
// }
// class fifthactivity extends Component {

//   constructor(props) {
 
//     super(props);
  
//     YellowBox.ignoreWarnings([
//      'Warning: componentWillMount is deprecated',
//      'Warning: componentWillReceiveProps is deprecated',
//    ]);
  
//   }
 
//    render()
//    {
//       return(
 
//          <View style = { styles.MainContainer }>
 
//             <Text style={{fontSize: 23}}> oombu </Text>
          
//          </View>
//       );
//    }
// }

// class SecondActivity extends Component {

//   constructor(props) {
 
//     super(props);
  
//     YellowBox.ignoreWarnings([
//      'Warning: componentWillMount is deprecated',
//      'Warning: componentWillReceiveProps is deprecated',
//    ]);
  
//   }
   
//      render()
//      {
//         return(
   
//            <View style = { styles.MainContainer }>
   
//               <Text style={{fontSize: 23}}> This is Activity - 2 </Text>
            
//            </View>
//         );
//      }
//   }

//   class ThirdActivity extends Component {

//     constructor(props) {
 
//       super(props);
    
//       YellowBox.ignoreWarnings([
//        'Warning: componentWillMount is deprecated',
//        'Warning: componentWillReceiveProps is deprecated',
//      ]);
    
//     }
 
//        render()
//        {
//           return(
     
//              <View style = { styles.MainContainer }>
     
//                 <Text style={{fontSize: 23}}> This is Activity - 3 </Text>
              
//              </View>
//           );
//        }
//     }
 
//     const FirstActivity_StackNavigator = StackNavigator({
//       First: { 
//         screen: MainActivity, 
//         navigationOptions: ({ navigation }) => ({
//           title: 'MainActivity',
//           headerLeft : <HamburgerIcon navigationProps={ navigation }/>,

//           headerStyle: {
//             backgroundColor: '#FF9800'
//           },
//           headerTintColor: '#fff',
//         })
//       },
//     });

//     const fifth = StackNavigator({
//       First: { 
//         screen: fifthactivity, 
//         navigationOptions: ({ navigation }) => ({
//           title: 'nala nala ooombea',
//           headerLeft : <HamburgerIcon navigationProps={ navigation }/>,

//           headerStyle: {
//             backgroundColor: '#FF9800'
//           },
//           headerTintColor: '#fff',
//         })
//       },
//     });

//     const SecondActivity_StackNavigator = StackNavigator({
//       Second: { 
//         screen: SecondActivity, 
//         navigationOptions: ({ navigation }) => ({
//           title: 'SecondActivity',
//           headerLeft : <HamburgerIcon navigationProps={ navigation }/>,

//           headerStyle: {
//             backgroundColor: '#FF9800'
//           },
//           headerTintColor: '#fff',
//         })
//       },
//     });


//     const ThirdActivity_StackNavigator = StackNavigator({
//       Third: { 
//         screen: ThirdActivity, 
//         navigationOptions: ({ navigation }) => ({
//           title: 'ThirdActivity',
//           headerLeft : <HamburgerIcon navigationProps={ navigation }/>,

//           headerStyle: {
//             backgroundColor: '#FF9800'
//           },
//           headerTintColor: '#fff',
//         })
//       },
//     });
    
// export default MyDrawerNavigator = DrawerNavigator({
//   MainStack: { 
//     screen: fifth
//   },

//   SecondStack: { 
//     screen: SecondActivity_StackNavigator
//   },

//   ThirdStack: { 
//     screen: ThirdActivity_StackNavigator
//   }
// });

    
// const styles = StyleSheet.create({
    
//  MainContainer :{
 
//   flex:1,
//   paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
//   alignItems: 'center',
//   justifyContent: 'center',
    
//   }

// });