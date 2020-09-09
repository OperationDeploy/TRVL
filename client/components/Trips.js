import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import UserTrips from './UserTrips';

const Trips = ({ setClickedPage, currentUser, currentTrip }) => (
  <div className="trip-container">
    <Button
      variant="outlined"
      color="primary"
      onClick={() => {
        setClickedPage(<UserTrips currentUser={currentUser} currentTrip={currentTrip} />);
      }}
    >
      Trips
    </Button>
  </div>
);

Trips.propTypes = {
  setClickedPage: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  currentTrip: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    destination: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }).isRequired,
};

export default Trips;
