import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import Typography from '@material-ui/core/Typography';

const Hotels = ({ currentUser, currentTrip }) => {
  const [hotelData, setHotelData] = useState([]);
  const [trip, setTrip] = useState({});
  const [city, setCity] = useState('');

  // const hotels = [
  //   ['Hilton', 243, 3],
  //   ['Sheraton', 278, 4],
  //   ['Ramada', 197, 2],
  //   ['Marriott', 310, 4],
  //   ['Holiday Inn', 162, 2],
  // ];

  const handleChange = (response, cityName) => {
    setTrip(response);
    setCity(cityName);
    console.info(trip, city)
  };

  const handleChangeHotel = (response) => {
    setHotelData(response);
  };

  useEffect(() => {
    axios
      .post(
        '/getFullTrip',
        { id: currentTrip.id, googleId: currentUser.googleId },
        () => {},
      )
      .then((response) => {
        console.info(
          `Grabbing ${currentUser.first_name}'s trip info for ${currentTrip.city}`,
        );
        handleChange(response.data, response.data.destination);
        // const sliced = response.data.destination.slice(0, response.data.destination.length - 4);
        axios
          .post('/getHotels', { trip: response.data, city: response.data.destination })
          .then((results) => {
            console.info(results);
            handleChangeHotel(results.data);
          });
      });
  }, []);

  if (hotelData.length === 0) {
    return <h3>Finding the best hotel prices for you...</h3>;
  }

  return (
    <div>
      <h2>HOTELS</h2>
      <p>{`Hey, ${currentUser.first_name}!`}</p>
      <p>{`Check out the cheapest hotels in ${currentTrip.city}:`}</p>
      <div>
        <p>You should book before hotel prices go up!</p>
        {/* <div>
          {hotelData.map((hotel) => (
            <div>
              <div>{`It costs $${hotel.price} to fly with ${hotel.airline}`}</div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

//   return (
//     <div className="hotels-container">
//       <Typography component="h1" variant="h2">
//         Hotels
//       </Typography>
//       Based on your groups preferences and trip length, these are your top hotel choices:
//       {hotels.map((hotel) => (
//         <div>
//           <div>{`${hotel[0]} $${hotel[1]}`}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

Hotels.propTypes = {
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

export default Hotels;
