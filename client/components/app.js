import React, { Component } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Favicon from 'react-favicon';
import GoogleLogin from 'react-google-login';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ResponsiveDrawer from './ResponsiveDrawer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginComplete: false,
      currentUser: '',
      otherUsers: [],
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
    const { loginComplete, currentUser, currentTrip, otherUsers } = this.state;
    if (!loginComplete) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          className="splash-page"
          style={{ minHeight: '100vh' }}
        >
          <Favicon url="https://i.ibb.co/wyss9DS/TRVLfavicon-2.png" />
          <Grid item xs={7}>
            <Card className="splash-card" alignItems="center">
              <CardMedia
                className="splash-logo"
                image="https://i.ibb.co/dj9N37R/trvl.png"
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
      <Container
        justify="center"
        alignItems="center"
        className="content-container"
        alignText="center"
      >
        <Favicon url="https://i.ibb.co/wyss9DS/TRVLfavicon-2.png" />
        <ResponsiveDrawer
          currentUser={currentUser}
          currentTrip={currentTrip}
          otherUsers={otherUsers}
        />
      </Container>
    );
  }
}

export default App;
