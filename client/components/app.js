import React, { Component } from 'react';
import axios from 'axios';
import Favicon from 'react-favicon';
import GoogleLogin from 'react-google-login';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// import { flexbox } from '@material-ui/system';
import ResponsiveDrawer from './ResponsiveDrawer';
import logo from '../src/logo.png';
// import { Typography } from '@material-ui/core';

// import { OAUTH_CLIENT_ID } from '../../config.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginComplete: false,
      clickPlan: false,
      clickTrips: false,
      currentUser: '',
      currentTrip: { id: 2 },
    };

    this.onClickPlanTrip = this.onClickPlanTrip.bind(this);
    this.onClickGetTrips = this.onClickGetTrips.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  onClickPlanTrip() {
    this.setState((prevState) => ({ clickPlan: !prevState.clickPlan }));
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
    const { loginComplete, clickPlan, currentUser, currentTrip, clickTrips } = this.state;
    if (!loginComplete) {
      return (
        <Grid container justify="center" alignItems="center" className="splash-page" style={{ minHeight: '100vh'}}>
          <Favicon url="https://i.ibb.co/wyss9DS/TRVLfavicon-2.png" />
          <Grid item xs={6}>
            <Card className="splash-card" alignItems="center">
                <CardMedia
                  className="splashlogo"
                  image="https://i.ibb.co/bJkYJX1/TRVLsqlogo-2.png"
                  style={{ height: 500 }}
                />
              <CardActions alignItems="stretch">
                <Button fullWidth variant="outlined" color="default">
                  <GoogleLogin
                    clientId="882538519679-1djm34mua0vj39jocql6ncg86mric4vb.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy="single_host_origin"
                  />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      );
    }
    return (
      <Container className="">
        <Favicon url="https://i.ibb.co/wyss9DS/TRVLfavicon-2.png" />
        <ResponsiveDrawer
          clickPlan={clickPlan}
          onClickPlanTrip={this.onClickPlanTrip}
          clickTrips={clickTrips}
          onClickGetTrips={this.onClickGetTrips}
          currentUser={currentUser}
          currentTrip={currentTrip}
        />
      </Container>
    );
  }
}

export default App;
