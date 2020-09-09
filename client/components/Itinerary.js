import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

const Itinerary = ({ currentUser, currentTrip }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get(`/activities/${currentTrip.id}`, {
      trip_id: currentTrip.id,
      user_id: currentUser,
    })
      .then((res) => {
        console.info(res.data, 'got the activities!!');
        const allEvents = res.data;
        allEvents.forEach((activity) => {
          setActivities(activities.push(activity.event));
        });
        // setActivities(res.data);
      }).catch((err) => console.warn(err));
  }, []);

  return (
    <div id="trip-itinerary" className="itinerary-container">
      <Typography component="h1" variant="h2">
        Itinerary
      </Typography>

      <ActivityForm
        saveActivity={(input) => {
          const text = input.trim();
          if (text.length > 0) {
            axios.post('/activities', {
              user_id: currentUser.id,
              trip_id: currentTrip.id,
              event: text,
              day: new Date(),
            }).then((response) => {
              console.info(response, 'kuygiygi');
              setActivities(activities.push(response.data.event));
            });
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
    city: PropTypes.string,
  }).isRequired,
};

export default Itinerary;
