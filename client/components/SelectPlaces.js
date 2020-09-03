import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectPlaces = ({ currentUser, trip }) => {
  const [places, setPlaces] = useState([]);

  const handleChange = (response) => {
    setPlaces(response);
  };

  const proposal = () => {
    axios.post('./proposals', {
      user_id: currentUser.googleId,
      trip_id: trip,
      destination_A_id: places[0],
      destination_B_id: places[1],
      destination_C_id: places[2],
    }).then((response) => {
      console.log(response);
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .post('./grabPlaces', { trip_id: trip }, (req, res) => {
      })
      .then((response) => {
        handleChange(response.data);
      }).then(() => {
        axios.post('./proposals', {
          user_id: currentUser.googleId,
          trip_id: trip,
          destination_A_id: places[0],
          destination_B_id: places[1],
          destination_C_id: places[2],
        }).then((response) => {
          console.log(response);
        });
        }).catch((err) => console.log(err));
  }, []);

  // updates destination on trips table onclick
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
