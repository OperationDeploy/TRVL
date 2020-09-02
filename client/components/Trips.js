import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import Itinerary from './Itinerary';

// TODO: Handle trips click

const Trips = () => (
  <div>
    <Button component={Link} to="/UserTrips" variant="contained">Trips</Button>
  </div>
);

// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Itinerary from './Itinerary';

// // TODO: Handle trips click
// const Trips = () => (
//   <div>
//     <Button variant="contained" onClick={() => { alert('clicked Trips'); }}>Trips</Button>
//     <Itinerary />
//   </div>
// );

export default Trips;
