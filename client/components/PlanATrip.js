import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Preferences from './preferences.js'
// TODO: Handle plan a trip click
// const [plan, setPlan] = useState(false);
const PlanATrip = () => {
  return (
    <div>
      <Button variant="contained" onClick={() => { alert('clicked Plan A Trip'); }}>Plan A Trip</Button>
      <Preferences />
    </div>
  );
};

export default PlanATrip;
