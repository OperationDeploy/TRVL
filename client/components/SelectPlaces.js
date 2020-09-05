import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const SelectPlaces = ({ currentUser, trip }) => {
  const [places, setPlaces] = useState([]);

  const handleChange = (response) => {
    setPlaces(response);
  };

  useEffect(() => {
    axios
      .post('./grabPlaces', { trip_id: trip }, () => {})
      .then((response) => {
        handleChange(response.data);
        axios.post('./proposals', {
          user_id: currentUser.googleId,
          trip_id: trip,
          destination_A_id: response.data[0],
          destination_B_id: response.data[1],
          destination_C_id: response.data[2],
        });
      })
      .catch((err) => console.warn(err));
  }, []);

  // updates destination on trips table onclick
  const handleClick = (event) => {
    axios.post('./setDest', { destination: event, trip_id: trip }, () => {});
  };

  return (
    <div className="places-container">
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
  trip: 0,
};

SelectPlaces.propTypes = {
  trip: PropTypes.number,
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
