/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { userTripsData } from '../dummyData/userTripsData';
import Itinerary from './Itinerary';

const UserTrips = ({ currentUser }) => {
  const [itiernaryClicked, setitiernaryClicked] = useState(false);
  const [userTrips, setUserTrips] = useState([]);

  const getItinerary = () => {
    setitiernaryClicked(true);
  };

  const getUserTrips = (userData) => {
    // console.log(userData, "hedsffffffffff");
    const { googleId } = userData;
    axios.get('/user/trips', {
      params: {
        user_id: googleId,
      },
    })
      .then((response) => console.log(response.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    setUserTrips(userTripsData);
    getUserTrips(currentUser);
  }, []);

  if (itiernaryClicked) {
    return <Itinerary />;
  }
  return (
    <div>
      <Typography variant="h1">
        Trips
      </Typography>
      {userTrips.map((data, index) => (
        <List>
          <ListItem>
            <ListItemText>{ data.tripName}</ListItemText>
            <ListItemSecondaryAction>
              <Button onClick={getItinerary} color="primary">
                Trip Itinerary
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

export default UserTrips;
