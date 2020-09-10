import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import moment from 'moment';

import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

moment().format();

const Itinerary = ({ currentUser, currentTrip, day }) => {
  const [activities, setActivities] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios
      .get(`/activities/${currentTrip.id}`, {
        trip_id: currentTrip.id,
      })
      .then((res) => {
        // eslint-disable-next-line max-len
        const allEvents = res.data.filter((activity) => activity.day === day).map((activity) => activity.event);
        setActivities(...activities, allEvents);
      });
  }, []);

  return (
    <div id="trip-itinerary" className="itinerary-container">
      <Typography component="h1" variant="h6">
        {`Plans for: ${moment(day).format('MMM Do')}`}
      </Typography>
      <ActivityForm
        saveActivity={(input) => {
          setText(input.trim());
          if (text.length > 0) {
            axios
              .post('/activities', {
                user_id: currentUser.id,
                trip_id: currentTrip.id,
                event: text,
                day,
              })
              .then((response) => {
                setActivities([...activities, response.data.event]);
              });
          }
        }}
        currentTrip={currentTrip}
        currentUser={currentUser}
      />
      <ActivityList
        activities={activities}
        currentTrip={currentTrip}
        currentUser={currentUser}
        deleteActivity={(activityIndex) => {
          const newActivities = activities.filter((_, index) => index !== activityIndex);
          axios
            .delete('/activity', {
              params: {
                user_id: currentUser.id,
                trip_id: currentTrip.id,
                event: activities[activityIndex],
                day,
              },
            })
            .then((res) => res.status(204).send('Content Deleted'));
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
  day: PropTypes.string.isRequired,
};

export default Itinerary;
