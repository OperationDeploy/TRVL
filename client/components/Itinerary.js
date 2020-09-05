import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

const Itinerary = () => {
  const [activities, setActivities] = useState([]);

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

export default Itinerary;
