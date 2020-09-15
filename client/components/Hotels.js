import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import Typography from '@material-ui/core/Typography';

const Hotels = ({ currentUser, currentTrip }) => {
  const [hotelData, setHotelData] = useState([]);
  const [trip, setTrip] = useState({});
  const [city, setCity] = useState('');

  const handleChange = (response, cityName) => {
    setTrip(response);
    setCity(cityName);
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
        handleChange(response.data, response.data.destination);
        axios
          .post('/getHotels', { trip: response.data, city: response.data.destination })
          .then((results) => {
            handleChangeHotel(results.data);
          })
          .catch((err) => console.warn(err, trip));
      });
  }, []);

  if (hotelData.length === 0 || undefined || null) {
    return (
      <h3>
        Finding the best hotels for your trip...If your results do no return in 10 seconds or
        less, there may not be any reservations available. Please try again later
      </h3>
    );
  }

  return (
    <div>
      <h2>HOTELS</h2>
      <p>{`Hey, ${currentUser.first_name}!`}</p>
      <p>{`These hotels in ${city} match up best with everyone's preferences.`}</p>
      <div>
        <p>You should book before hotel prices go up!</p>
        <div>
          {hotelData.map((hotel) => {
            if (hotel.price && hotel.name) {
              return (
                <div>
                  <div>{`${hotel.name}: ${hotel.price} per night`}</div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

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
