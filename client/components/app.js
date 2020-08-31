import React, { Component } from 'react';
import axios from 'axios';
import Preferences from './preferences.js';

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
        data: 'HELLO WORLD',
      })
      .then((res) => console.log('POSTED:', res))
      .catch((err) => console.error(err));
  }

  render() {
    return (
    <div>
      <div> Hello World from Deployment </div>
      <Preferences />
    </div>
    )
  }
}

export default App;
