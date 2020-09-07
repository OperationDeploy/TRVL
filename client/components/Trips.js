import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import UserTrips from './UserTrips';

const Trips = ({ clickTrips, onClickGetTrips, currentUser, currentTrip }) => {
  if (clickTrips) {
    return <UserTrips currentUser={currentUser} currentTrip={currentTrip} />;
  }
  return (
    <div className="trip-container">
      <Button
        variant="outlined"
        onClick={() => {
          onClickGetTrips();
        }}
        color="primary"
      >
        Trips
      </Button>
    </div>
  );
};

Trips.propTypes = {
  clickTrips: PropTypes.bool.isRequired,
  onClickGetTrips: PropTypes.func.isRequired,
  currentTrip: PropTypes.objectOf.isRequired,
  currentUser: PropTypes.objectOf.isRequired,
};

export default Trips;
