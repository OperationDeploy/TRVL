import React from 'react';
import Button from '@material-ui/core/Button';
// TODO: Handle trips click
const Trips = () => (
  <div>
    <Button variant="contained" onClick={() => { alert('clicked Trips') }}>Trips</Button>
  </div>
);

export default Trips;
