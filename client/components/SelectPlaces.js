import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import UserTrips from './UserTrips';

const SelectPlaces = ({ trip, currentUser, setClickedPage }) => {
  const [places, setPlaces] = useState([]);

  const handleChange = (response) => {
    setPlaces(response);
  };

  useEffect(() => {
    axios
      .post('./grabPlaces', { trip_id: trip.id }, () => {})
      .then((response) => {
        handleChange(response.data);
      });
  }, []);

  // updates destination on trips table onclick

  const handleClick = (event) => {
    axios.post('./setDest', { destination: event, trip_id: trip.id }, () => {});
    setClickedPage(<UserTrips currentUser={currentUser} currentTrip={trip} />);
  };

  return (
    <div>
      <header>Here are Your Places:</header>
      <ul>
        {places.map((dest) => (
          <button type="submit" key={dest} onClick={() => handleClick(dest)}>
            {dest}
          </button>
        ))}
      </ul>
    </div>
  );
};

SelectPlaces.defaultProps = {
  trip: { id: 0 },
};

SelectPlaces.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.number,
  }),
  setClickedPage: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default SelectPlaces;
