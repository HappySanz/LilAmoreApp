import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import SignIn from './SignIn';
import Landing from './Landing';

export default class Main extends Component {
  render() {
	  return (
	    <Router>
	      <Scene key="root">
	        <Scene key="signIn"
	          component={SignIn}
	        	animation='fade'
	          hideNavBar={true}
	          initial={true}
	        />
	        <Scene key="landing"
	          component={Landing}
	          animation='fade'
	          hideNavBar={true}
	        />
	      </Scene>
	    </Router>
	  );
	}
}