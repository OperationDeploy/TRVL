import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Flights = ({ currentUser, currentTrip }) => {
  const [flightData, setFlightData] = useState({});
  const [trip, setTrip] = useState({});

  const handleChange = (response) => {
    console.info('line 12', response);
    setTrip(response);
    console.info('here is trip', trip);
    console.info(trip.airport_code, trip.start_date);
  };

  useEffect(() => {
    axios
      .post(
        '/getTripForFlight',
        { id: currentTrip.id, googleId: currentUser.googleId },
        () => {
          console.info(
            `Grabbing ${currentUser.first_name}'s trip info for ${currentTrip.city}`,
          );
        },
      )
      .then((response) => {
        console.info(response);
        handleChange(response.data);
      });
  }, []);

  const onClickShowMeFlight = () => {
    axios
      .get(
        'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/MSY-sky/BNA-sky/2020-09-10',
        {
          headers: {
            'x-rapidapi-key': '0bab63c571mshc3c168e88ae6b44p14c63fjsn0a3bbb552a96',
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            useQueryString: true,
            'content-type': 'application/octet-stream',
          },
        },
      )
      .then((res) => {
        console.info('API RESPONSE', res);
        let carrier;
        for (let i = 0; i < res.data.Carriers.length; i += 1) {
          if (
            res.data.Carriers[i].CarrierId ===
            res.data.Quotes[0].OutboundLeg.CarrierIds[0]
          ) {
            carrier = res.data.Carriers[i].Name;
          }
        }
        console.info(carrier);
        setFlightData({ airline: carrier, price: res.data.Quotes[0].MinPrice });
      });
  };

  return (
    <div>
      <h2>FLIGHTS</h2>
      <p>{`Hey, ${currentUser.first_name}!`}</p>
      <p>{`Check out the cheapest flight to ${currentTrip.city}:`}</p>

      <div>
        <button type="submit" onClick={() => onClickShowMeFlight()}>
          SHOW ME THE BEST FLIGHT
        </button>
        <p>{`It costs only $${flightData.price} to travel with ${flightData.airline} to get to ${currentTrip.city}!`}</p>
        <p>You should book before flights go up!</p>
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
