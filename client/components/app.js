import React, { Component } from 'react';
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

  render() {
    return (
      <div>
        <Favicon url="https://i.ibb.co/CmQ8DGP/apple-icon-removebg-preview.png" />
        {/* <Splash /> */}
        {/* <Preferences /> */}
        <Itinerary />
        {/* <ResponsiveDrawer /> */}
      </div>
    );
  }
}

export default App;
