import React from 'react';
import Button from '@material-ui/core/Button';
// TODO: Handle plan a trip click
const PlanATrip = () => (
  <div>
    <Button variant="contained" onClick={() => { alert('clicked Plan A Trip') }}>Plan A Trip</Button>
  </div>
);

export default PlanATrip;
