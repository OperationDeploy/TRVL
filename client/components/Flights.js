import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Flights = ({ currentUser, currentTrip }) => {
  const [flightData, setFlightData] = useState([]);

  const handleChangeFlight = (response) => {
    setFlightData(response);
  };

  useEffect(() => {
    axios
      .post('/getFlights', { currentTrip }, () => {})
      .then((res) => {
        handleChangeFlight(res.data);
      });
  }, []);

  if (flightData.length === 0) {
    return <h3>Finding the best flight prices for you...</h3>;
  }

  return (
    <div>
      <Typography>FLIGHTS</Typography>
      <p>{`Hey, ${currentUser.first_name}!`}</p>
      <p>{`Check out the cheapest flights to ${currentTrip.city}:`}</p>

      <div className="hotel-container">
        <p>You should book before flights go up!</p>
        <div>
          {flightData.map((flight) => (
            <List>
              <ListItem>{`It costs $${flight.price} to fly with ${flight.airline}`}</ListItem>
            </List>
          ))}
        </div>
      </div>
    </div>
  );
};

Flights.propTypes = {
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  currentTrip: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.string,
  }).isRequired,
};

export default Flights;
