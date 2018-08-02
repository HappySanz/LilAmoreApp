import { DrawerNavigator } from 'react-navigation';

import { StackNavigator } from 'react-navigation'
import Landing from './HamburgerIcon';


const Landingpage = StackNavigator({
    First: { 
      screen: Landing, 
      navigationOptions: ({ navigation }) => ({
        title: 'MainActivity',
        headerLeft : <HamburgerIcon navigationProps={ navigation }/>,
  
        headerStyle: {
          backgroundColor: '#FF9800'
        },
        headerTintColor: '#fff',
      })
    },
  });
