import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Favicon from 'react-favicon';
import Splash from './Splash';
import ResponsiveDrawer from './ResponsiveDrawer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      loginComplete: false,
      clickPlan: false,
      clickTrips: false,
    };
    this.onClickPlanTrip = this.onClickPlanTrip.bind(this);
    this.login = this.login.bind(this);
    this.onClickGetTrips = this.onClickGetTrips.bind(this);
  }
  onClickPlanTrip() {
    this.setState({ clickPlan: !this.state.clickPlan });
  }

  onClickGetTrips() {
    this.setState({ clickTrips: !this.state.clickTrips });
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
    const { loginComplete, clickPlan, clickTrips} = this.state;
    if (loginComplete) {
      return (
        <div>
          <Splash login={this.login} />
        </div>
      );
    }
    return (
      <div>
        <Favicon url="https://i.ibb.co/wyss9DS/TRVLfavicon-2.png" />

        <ResponsiveDrawer
          clickPlan={clickPlan}
          onClickPlanTrip={this.onClickPlanTrip}
          clickTrips={clickTrips}
          onClickGetTrips={this.onClickGetTrips}
        />

        {/* <Router>
          <Switch>
            <Route exact path="/" render={() => (<ResponsiveDrawer />)} />
            <Route exact path="/preferences" render={() => (<Preferences />)} />
          </Switch>
        </Router> */}
      </div>
    );
  }
}

export default App;
