import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import jwtService from '../services/jwtService';

import { getInfoUser, logoutUser } from '../store/app/userSlice';
import SplashScreen from './SplashPage/SplashScreen';

class Auth extends Component {
  state = {
    waitAuthCheck: true,
  };

  componentDidMount() {
    return Promise.all([
      // Comment the lines which you do not use
      this.jwtCheck(),
    ]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }

  jwtCheck = () =>
    new Promise((resolve) => {
      jwtService.on('onAutoLogin', () => {
        // this.props.showMessage({ message: 'Logging in with JWT' });

        /**
         * Sign in and retrieve user data from Api
         */
        jwtService
          .signInWithToken()
          .then((user) => {
            this.props.getInfoUser();
            resolve();

            // this.props.showMessage({ message: 'Logged in with JWT' });
          })
          .catch((error) => {
            // this.props.showMessage({ message: error.message });
            console.log('error jwtCheck', error);
            resolve();
          });
      });

      jwtService.on('onAutoLogout', (message) => {
        if (message) {
          // this.props.showMessage({ message });
          console.log('jwtSerive.on onAutoLogout');
        }

        // this.props.logout();

        resolve();
      });

      jwtService.on('onNoAccessToken', () => {
        resolve();
      });

      jwtService.init();

      return Promise.resolve();
    });

  render() {
    return this.state.waitAuthCheck ? <SplashScreen /> : <>{this.props.children}</>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: logoutUser,
      // setUserData,
      getInfoUser,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Auth);
