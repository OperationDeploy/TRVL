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

  //updates destination on trips table onclick
  const handleClick = (event) => {
    axios.post('./setDest', { destination: event, trip_id: trip }, (req, res) => {
    });
  };

  return (
    <div>
      <header>Here are Your Places:</header>
      <ul>
        {places.map((dest) => (
          <li value={dest} onClick={() => handleClick(dest)}>
            {dest}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectPlaces;
