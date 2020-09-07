import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

const Itinerary = ({ currentUser, currentTrip }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => console.info('currentTrip:', currentTrip));

  return (
    <div id="trip-itinerary" className="itinerary-container">
      <Typography component="h1" variant="h2">
        Itinerary
      </Typography>

      <ActivityForm
        saveActivity={(input) => {
          const text = input.trim();
          if (text.length > 0) {
            setActivities([...activities, text]);
          }
        }}
        currentTrip={currentTrip}
        currentUser={currentUser}
      />
      <ActivityList
        activities={activities}
        deleteActivity={(activityIndex) => {
          const newActivities = activities.filter((_, index) => index !== activityIndex);
          setActivities(newActivities);
        }}
      />
    </div>
  );
};

Itinerary.propTypes = {
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  currentTrip: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.string,
  }).isRequired,
};

export default Itinerary;
