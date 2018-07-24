const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;
    
// ...

// Attempt a login using the Facebook login dialog,
// asking for default permissions.
LoginManager.logInWithReadPermissions(['public_profile']).then(
  function(result) {
    if (result.isCancelled) {
      alert('Login was cancelled');
    } else {
      alert('Login was successful with permissions: '
        + result.grantedPermissions.toString());
    }
  },
  function(error) {
    alert('Login failed with error: ' + error);
  }
);