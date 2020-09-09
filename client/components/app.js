import React, { Component } from 'react';
import axios from 'axios';
import Favicon from 'react-favicon';
import GoogleLogin from 'react-google-login';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawer from './ResponsiveDrawer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginComplete: false,
      currentUser: '',
      otherUsers: [],
      currentTrip: { id: 2 },
      phone: '',
      registered: false,
    };

    this.responseGoogle = this.responseGoogle.bind(this);
  }

  handleChangePhone(event) {
    this.setState({
      phone: event.target.value,
    });
  }

  handleSubmitPhone() {
    const { phone, currentUser } = this.state;
    axios
      .post('/addPhoneNumber', {
        phone,
        currentUser,
      })
      .then((response) => {
        if (response) {
          this.setState({
            registered: true,
          });
        }
      })
      .catch((err) => console.warn(err));
  }

  findPhone() {
    const { phone } = this.state;
    if (phone !== null && phone !== '') {
      this.setState({
        registered: true,
      });
    }
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
          phone: res.data.phoneNumber,
        });
        this.findPhone();
      })
      .catch((err) => console.warn(err));
  }

  render() {
    const { registered, phone } = this.state;
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
    if (registered === false) {
      return (
          <Typography>
            **Link you phone number to your account** Phone Number:
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="number"
              value={phone}
              onChange={(e) => this.handleChangePhone(e)}
            />
            <Button
              variant="contained"
              onClick={() => {
                this.handleSubmitPhone();
              }}
            >
              Submit Phone Number
            </Button>
          </Typography>
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
