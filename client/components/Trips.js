/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import UserTrips from './UserTrips';

const Trips = ({ clickTrips, onClickGetTrips, currentUser }) => {
  if (clickTrips) {
    return <UserTrips currentUser={currentUser} />;
  }
  return (
    <div>
      <Button variant="contained" onClick={() => { onClickGetTrips(); }}>Trips</Button>
    </div>
  );
};

Trips.propTypes = {
  clickTrips: PropTypes.bool.isRequired,
  onClickGetTrips: PropTypes.func.isRequired,
};

export default Trips;
