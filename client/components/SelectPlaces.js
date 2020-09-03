import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const SelectPlaces = ({ trip }) => {
  const [places, setPlaces] = useState([]);

  const handleChange = (response) => {
    setPlaces(response);
  };

  useEffect(() => {
    axios
      .post('./grabPlaces', { trip_id: trip }, () => {})
      .then((response) => {
        handleChange(response.data);
      });
  }, []);

  // updates destination on trips table onclick

  const handleClick = (event) => {
    axios.post('./setDest', { destination: event, trip_id: trip }, () => {});
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
  trip: 0,
};

SelectPlaces.propTypes = {
  trip: PropTypes.number,
};

export default SelectPlaces;
