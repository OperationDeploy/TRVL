import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectPlaces = ({ currentUser, trip }) => {
  useEffect(() => {

    axios
      .post('./grabPlaces', { trip_id: trip }, (req, res) => {
        console.log('req', req, 'res', res);
      })
      .then((response) => {
        console.log(response);
      });
  }, []);

  return (
    <div>
      <header>Here are Your Places:</header>
    </div>
  );
};

export default SelectPlaces;
