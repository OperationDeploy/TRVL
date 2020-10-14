import React, { Component } from 'react';
import axios from 'axios';
import Favicon from 'react-favicon';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { indigo, orange } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Login from './Login';
import ResponsiveDrawer from './ResponsiveDrawer';
import './app.css';
import animatedlogo from '../src/animatedlogo.gif';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: orange[500],
    },
  },
  typography: {
    fontFamily: 'sans-serif',
    fontWeightBold: 500,
  },
});

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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="number-container">
            <img src={animatedlogo} alt="" className="logo" />
            <Typography component="h1" variant="h6">
              Add your mobile number for TRVL text updates.
            </Typography>
            <TextField
              value={phone}
              id="phone"
              label="Mobile Number"
              variant="outlined"
              onChange={(e) => this.handleChangePhone(e)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                this.handleSubmitPhone();
              }}
            >
              Submit
            </Button>
          </div>
        </ThemeProvider>
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
