import React, { Component } from 'react';
import axios from 'axios';
import Preferences from './preferences';
import Splash from './Splash';
import ResponsiveDrawer from './ResponsiveDrawer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
    };
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
        firstName: 'Josh',
        lastName: 'Nunez',
        email: 'joshjnunez09@gmail.com',
        profilePic:
          'https://ca.slack-edge.com/T02P3HQD6-URPNXJK3R-3bab56848cef-512',
        host: false,
      })
      .then((res) => console.log('POSTED:', res))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        {/* <Splash /> */}
        {/* <Preferences /> */}
        <ResponsiveDrawer />
      </div>
    );
  }
}

export default App;
