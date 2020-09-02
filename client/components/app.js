import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Favicon from 'react-favicon';
import Preferences from './preferences';
import Splash from './Splash';
import ResponsiveDrawer from './ResponsiveDrawer';
import Itinerary from './Itinerary';
import GoogleLogin from 'react-google-login';
import { OAUTH_CLIENT_ID } from '../../config.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginComplete: false,
      clickPlan: false,
      currentUser: '',
      currentId: '',
    };
    this.onClickPlanTrip = this.onClickPlanTrip.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  onClickPlanTrip() {
    this.setState({ clickPlan: !this.state.clickPlan });
  }
  // componentDidMount() {
  //   // established axios connection to backend
  //   // GET
  //   axios
  //     .get('/get')
  //     .then((res) => console.log('Response data:', res))
  //     .catch((err) => console.error(err));

  //   // POST
  //   axios
  //     .post('/post', {
  //       first_name: 'Josh',
  //       last_name: 'Nunez',
  //       email: 'joshjnunez09@gmail.com',
  //       profile_pic:
  //         'https://ca.slack-edge.com/T02P3HQD6-URPNXJK3R-3bab56848cef-512',
  //       host: false,
  //     })
  //     .then((res) => console.log('POSTED:', res))
  //     .catch((err) => console.error(err));
  // }

  responseGoogle(response) {
    console.log('google response:', response);
    axios
      .post('/login', {
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
        email: response.profileObj.email,
        profile_pic: response.profileObj.imageUrl,
        host: false,
        googleId: response.profileObj.googleId,
      })
      .then((res) => console.log('POSTED:', res))
      .catch((err) => console.error(err));
    this.setState({
      loginComplete: !this.loginComplete,
      currentUser: response.profileObj.givenName,
      currentId: response.profileObj.googleId,
    });
  }

  render() {
    const { loginComplete, clickPlan, currentUser, currentId } = this.state;
    if (!loginComplete) {
      return (
        <div>
          <Splash />
          <GoogleLogin
            clientId="882538519679-1djm34mua0vj39jocql6ncg86mric4vb.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      );
    }
    return (
      <div>
        <Favicon url="https://i.ibb.co/CmQ8DGP/apple-icon-removebg-preview.png" />

        <ResponsiveDrawer
          clickPlan={clickPlan}
          onClickPlanTrip={this.onClickPlanTrip}
          currentUser={currentUser}
          currentId={currentId}
        />

        {/* <Router>
          <Switch>
            <Route exact path="/" render={() => (<ResponsiveDrawer />)} />
            <Route exact path="/preferences" render={() => (<Preferences />)} />
          </Switch>
        </Router> */}
      </div>
    );
  }
}

export default App;
