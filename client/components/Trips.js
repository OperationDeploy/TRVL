import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import UserTrips from './UserTrips';

const Trips = ({ clickTrips, onClickGetTrips, currentUser, currentTrip }) => {
  if (clickTrips) {
    return <UserTrips currentUser={currentUser} currentTrip={currentTrip} />;
  }
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          onClickGetTrips();
        }}
      >
        Trips
      </Button>
    </div>
  );
};

Trips.propTypes = {
  clickTrips: PropTypes.bool.isRequired,
  onClickGetTrips: PropTypes.func.isRequired,
  currentTrip: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default Trips;
