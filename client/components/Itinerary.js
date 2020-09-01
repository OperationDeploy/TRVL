import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ActivityForm from '../components/ActivityForm'

const Itinerary = () => {
  const [activities, setActivities] = useState([]);

  return (
    <div className="tripitinerary">
      <Typography component="h1" variant="h2">
        Itinerary
      </Typography>

      <ActivityForm saveActivity={console.warn} />
    </div>
  );
};

export default Itinerary;
