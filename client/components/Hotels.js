import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import './Hotels.scss';

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

  const hotelLink = (input) => {
    window.open(input);
  };

  if (hotelData.length === 0 || hotelData.length === undefined || null) {
    return (
      <h3>
        Finding the best hotels for your trip...If your results do not return in 10
        seconds or less, there may not be any reservations available. Please try again
        later
      </h3>
    );
  }

  return (
    <div>
      <div>
        <Typography>HOTELS</Typography>
      </div>
      <p>{`Hey, ${currentUser.first_name}!`}</p>
      <p>{`These hotels in ${city} match up best with everyone's preferences.`}</p>
      <div>
        <p>You should book before hotel prices go up!</p>
        <div className="hotels-container">
          {hotelData.map((hotel) => {
            if (
              hotel.price !== undefined &&
              hotel.name !== undefined &&
              hotel.hac_offers.offers[0].link !== undefined &&
              hotel.photo.images.thumbnail.url !== undefined
            ) {
              return (
                <div className="hotel-container">
                  <List>
                    <ListItem>
                      <img
                        className="hotel-image"
                        alt="new"
                        src={
                          hotel.photo.images.thumbnail.url !== undefined
                            ? hotel.photo.images.thumbnail.url
                            : null
                        }
                      />
                      <div color="primary">
                        <div className="hotel-name">{`${hotel.name}`}</div>
                        <br />
                        {`${hotel.price} per night`}
                        <div>
                          <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className="hotel-link"
                            onClick={() => hotelLink(hotel.hac_offers.offers[0].link)}
                          >
                            Book now
                          </Button>
                        </div>
                      </div>
                    </ListItem>
                  </List>
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
