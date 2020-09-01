import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ActivityForm from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';


const Itinerary = () => {
  const [activities, setActivities] = useState([]);

  return (
    <div className="tripitinerary">
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
