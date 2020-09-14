import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import apiKey from './config';

const Flights = ({ currentUser, currentTrip }) => {
  const [flightData, setFlightData] = useState([]);
  // const [trip, setTrip] = useState({});

  // const handleChange = (response) => {
  //   setTrip(response);
  // };

  const handleChangeFlight = (response) => {
    setFlightData(response);
  };

  useEffect(() => {
    // axios
    //   .post(
    //     '/getFullTrip',
    //     { id: currentTrip.id, googleId: currentUser.googleId },
    //     () => {},
    //   )
    //   .then((res) => {
    //     // console.info(response);
    //     console.info(
    //       `Grabbing ${currentUser.first_name}'s trip info for ${currentTrip.city}`,
    //     );
    //     console.info('trip info', res);
    //     handleChange(res.data);
    //   });
    axios
      .post('/getFlights', { currentTrip }, () => {})
      .then((res) => {
        // console.info(response);
        console.info(res);
        handleChangeFlight(res.data);
        // handleChange(response.data);
      });
  }, []);

  // const onClickShowMeFlight = () => {
  //   // axios
  //   //   .get(
  //   //     'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/MSY-sky/BNA-sky/2020-09-10',
  //   //     {
  //   //       headers: {
  //   //         'x-rapidapi-key': apiKey,
  //   //         'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
  //   //         useQueryString: true,
  //   //         'content-type': 'application/octet-stream',
  //   //       },
  //   //     },
  //   //   )
  //   //   .then((res) => {
  //   //     console.info('API RESPONSE', res);
  //   //     let carrier;
  //   //     for (let i = 0; i < res.data.Carriers.length; i += 1) {
  //   //       if (
  //   //         res.data.Carriers[i].CarrierId ===
  //   //         res.data.Quotes[0].OutboundLeg.CarrierIds[0]
  //   //       ) {
  //   //         carrier = res.data.Carriers[i].Name;
  //   //       }
  //   //     }
  //   //     console.info(carrier);
  //   // setFlightData({ airline: 'United Airlines', price: 138 });
  //   // });
  // };
  if (flightData.length === 0) {
    return <h3>Finding the best flight prices for you...</h3>;
  }

  return (
    <div>
      <h2>FLIGHTS</h2>
      <p>{`Hey, ${currentUser.first_name}!`}</p>
      <p>{`Check out the cheapest flights to ${currentTrip.city}:`}</p>

      <div>
        {/* <button type="submit" onClick={() => onClickShowMeFlight()}>
          SHOW ME THE BEST FLIGHT
        </button> */}
        {/* <p>{`It costs only $${flightData.price} to travel with
         ${flightData.airline} to get to ${currentTrip.city}!`}</p> */}
        <p>You should book before flights go up!</p>
        <div>
          {flightData.map((flight) => (
            <div>
              <div>{`It costs $${flight.price} to fly with ${flight.airline}`}</div>
            </div>
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
