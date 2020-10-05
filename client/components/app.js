import React, { Component } from 'react';
import axios from 'axios';
import Favicon from 'react-favicon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Login from './Login';
import ResponsiveDrawer from './ResponsiveDrawer';
import './app.css';

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
  }

  componentDidMount() {
    axios
      .get('/session')
      .then((res) => {
        if (res.data.googleId) {
          res.data.id = res.data.googleId;
          this.setState({
            loginComplete: !this.loginComplete,
            currentUser: res.data,
            phone: res.data.phoneNumber,
          });
          this.findPhone();
        }
      })
      .catch((err) => console.warn(err));
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

  render() {
    const { registered, phone } = this.state;
    const { loginComplete, currentUser, currentTrip, otherUsers } = this.state;
    if (!loginComplete) {
      return (
        <div>
          <Favicon url="https://i.ibb.co/wyss9DS/TRVLfavicon-2.png" />
          <Login />
        </div>
      );
    }
    if (loginComplete && !registered) {
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
      <div className="app-container">
        <Favicon url="https://i.ibb.co/wyss9DS/TRVLfavicon-2.png" />
        <ResponsiveDrawer
          currentUser={currentUser}
          currentTrip={currentTrip}
          otherUsers={otherUsers}
          window={window}
        />
      </div>
    );
  }
}

export default App;
