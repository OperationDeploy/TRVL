import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
    };
  }

  render() {
    console.log('Hello world!');

    for (let i = 0; i < 12; i++) {
      console.log(i);
    }
    return <div>Welcome to React!</div>;
  }
}

export default App;
