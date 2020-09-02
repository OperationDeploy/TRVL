import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { userTripsData } from '../dummyData/userTripsData';
import Itinerary from './Itinerary';
import Purchases from './Purchases';

const UserTrips = () => {
  const [clicked, setClicked] = useState('');

  // const render = () => {
  //   setitiernaryClicked(true);
  // };
  switch (clicked) {
    case 'itinerary':
      return <Itinerary />;
      break;
    case 'purchases':
      return <Purchases />;
      break;
    default:
  }

  // if (itiernaryClicked) {
  //   return <Itinerary />;
  // }
  return (
    <div>
      <Typography variant="h1">
        Trips
      </Typography>
      {userTripsData.map((data, index) => (
        <List>
          <ListItem>
            <ListItemText>{ data.tripName}</ListItemText>
            <ListItemSecondaryAction>
              <Button onClick={() => setClicked('itinerary')} color="primary">
                Trip Itinerary
              </Button>
            </ListItemSecondaryAction>
            <ListItemSecondaryAction>
              <Button onClick={() => setClicked('purchases')} color="primary">
                Purchases
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            Dates:
            <ListItemText>{ `${data.tripDates[0]} to ${data.tripDates[1]}`}</ListItemText>
          </ListItem>
          <ListItem>
            Destination:
            <ListItemText>{ data.tripDestination}</ListItemText>
          </ListItem>
        </List>
      ))}
      ;
    </div>
  );
};

UserTrips.propTypes = {
  getItinerary: PropTypes.func.isRequired,
};

export default UserTrips;
