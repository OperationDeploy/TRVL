import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectPlaces = ({ currentUser, trip }) => {
  const [places, setPlaces] = useState([]);

  const handleChange = (response) => {
    setPlaces(response);
  };

  useEffect(() => {
    axios
      .post('./grabPlaces', { trip_id: trip }, (req, res) => {
      })
      .then((response) => {
        handleChange(response.data);
      });
  }, []);

  return (
    <div>
      <header>Here are Your Places:</header>
      <ul>
        {places.map((dest) => (
          <li key={dest}>
            {dest}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectPlaces;
