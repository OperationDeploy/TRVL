import React, { Component } from 'react';
import axios from 'axios';
import Favicon from 'react-favicon';
import GoogleLogin from 'react-google-login';
import Splash from './Splash';
import ResponsiveDrawer from './ResponsiveDrawer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginComplete: false,
      clickPlan: false,
      clickTrips: false,
      currentUser: '',
      otherUsers: [],
      currentTrip: { id: 2 },
    };

    this.onClickPlanTrip = this.onClickPlanTrip.bind(this);
    this.onClickGetTrips = this.onClickGetTrips.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  onClickPlanTrip() {
    const { currentUser, clickPlan, otherUsers } = this.state;
    this.setState({ clickPlan: !clickPlan });
    // axios to get the current users who aren't users
    axios
      .get('/inviteUsers', {
        params: {
          currentUser: currentUser.googleId,
        },
      })
      .then((response) => {
        this.setState({
          otherUsers: response.data,
        });
        console.info(otherUsers);
      })
      .catch((err) => console.warn('ERRR', err));
  }

  onClickGetTrips() {
    this.setState((prevState) => ({ clickTrips: !prevState.clickTrips }));
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
        this.setState({
          loginComplete: !this.loginComplete,
          currentUser: res.data,
        });
      })
      .catch((err) => console.warn(err));
  }

  render() {
    const {
      loginComplete,
      clickPlan,
      currentUser,
      currentTrip,
      clickTrips,
      otherUsers,
    } = this.state;
    if (!loginComplete) {
      return (
        <div>
          <Splash />
          <Favicon url="https://i.ibb.co/wyss9DS/TRVLfavicon-2.png" />
          <GoogleLogin
            clientId="882538519679-1djm34mua0vj39jocql6ncg86mric4vb.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
      );
    }
    return (
      <div>
        <Favicon url="https://i.ibb.co/wyss9DS/TRVLfavicon-2.png" />
        <ResponsiveDrawer
          clickPlan={clickPlan}
          onClickPlanTrip={this.onClickPlanTrip}
          clickTrips={clickTrips}
          onClickGetTrips={this.onClickGetTrips}
          currentUser={currentUser}
          currentTrip={currentTrip}
          otherUsers={otherUsers}
        />
      </div>
    );
  }
}

export default App;
