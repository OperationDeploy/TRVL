import React, { Component } from 'react';
import axios from 'axios';
import Favicon from 'react-favicon';
import GoogleLogin from 'react-google-login';
import ResponsiveDrawer from './ResponsiveDrawer';
import logo from '../src/logo.png';

// import { OAUTH_CLIENT_ID } from '../../config.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginComplete: false,
      currentUser: '',
      currentTrip: { id: 2 },
    };

    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    const { givenName, familyName, email, imageUrl, googleId } = response.profileObj;

    axios
      .post('/login', {
        first_name: givenName,
        last_name: familyName,
        email,
        profile_pic: imageUrl,
        host: false,
        googleId,
      })
      .then((res) => {
        res.data.id = res.data.googleId;
        this.setState({
          loginComplete: !this.loginComplete,
          currentUser: res.data,
        });
      })
      .catch((err) => console.warn(err));
  }

  render() {
    const { loginComplete, currentUser, currentTrip } = this.state;
    if (!loginComplete) {
      return (
        <div>
          <Favicon url="https://i.ibb.co/wyss9DS/TRVLfavicon-2.png" />
          <div className="splash-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <img src={logo} alt="Logo" />
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <GoogleLogin
                className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                clientId="882538519679-1djm34mua0vj39jocql6ncg86mric4vb.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Favicon url="https://i.ibb.co/wyss9DS/TRVLfavicon-2.png" />
        <ResponsiveDrawer
          currentUser={currentUser}
          currentTrip={currentTrip}
        />
      </div>
    );
  }
}

export default App;
