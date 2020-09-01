import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Favicon from 'react-favicon';
import Preferences from './preferences';
import Splash from './Splash';
import ResponsiveDrawer from './ResponsiveDrawer';
import Itinerary from './Itinerary';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      loginComplete: false,
    };

    this.login = this.login.bind(this);
  }

  componentDidMount() {
    // established axios connection to backend
    // GET
    axios
      .get('/get')
      .then((res) => console.log('Response data:', res))
      .catch((err) => console.error(err));

    // POST
    axios
      .post('/post', {
        first_name: 'Josh',
        last_name: 'Nunez',
        email: 'joshjnunez09@gmail.com',
        profile_pic:
          'https://ca.slack-edge.com/T02P3HQD6-URPNXJK3R-3bab56848cef-512',
        host: false,
      })
      .then((res) => console.log('POSTED:', res))
      .catch((err) => console.error(err));
  }

  login() {
    this.setState({
      loginComplete: true,
    });
  }

  render() {
    const { loginComplete } = this.state;
    if (!loginComplete) {
      return (
        <div>
          <Splash login={this.login} />
        </div>
      );
    }
    return (
      <div>
        <Favicon url="https://i.ibb.co/CmQ8DGP/apple-icon-removebg-preview.png" />
        {/* <Splash /> */}
        <Router>
          <Switch>
            <Route exact path="/" render={() => (<ResponsiveDrawer />)} />
            <Route exact path="/preferences" render={() => (<Preferences />)} />
            <Route exact path="/Itinerary" render={() => (<Itinerary />)} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
