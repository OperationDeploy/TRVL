import React from 'react';
import Button from '@material-ui/core/Button';
import Itinerary from './Itinerary';

// TODO: Handle trips click
const Trips = () => (
  <div>
    <Button variant="contained" onClick={() => { alert('clicked Trips'); }}>Trips</Button>
    <Itinerary />
  </div>
);

export default Trips;
