import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import Itinerary from './Itinerary';

const UserTrips = ({ currentUser }) => {
  const [itineraryClicked, setItineraryClicked] = useState(false);

  const [trips, setTrips] = useState([]);

  const handleChange = (response) => {
    setTrips(response);
  };

  useEffect(() => {
    axios
      .post('./getAllTrips', { user_id: currentUser.googleId }, () => {})
      .then((response) => {
        handleChange(response.data);
      });
  }, []);

  const getItinerary = () => {
    setItineraryClicked(true);
  };

  if (itineraryClicked) {
    return <Itinerary />;
  }
  return (
    <div>
      <Typography variant="h1">Trips</Typography>
      {trips.map((data) => (
        <List>
          <ListItem>
            <ListItemText>{data.name}</ListItemText>
            <ListItemSecondaryAction>
              <Button onClick={getItinerary} color="primary">
                Trip Itinerary
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            Dates:
            <ListItemText>{`${data.start_date} to ${data.end_date}`}</ListItemText>
          </ListItem>
          <ListItem>
            Destination:
            <ListItemText>{data.destination}</ListItemText>
          </ListItem>
        </List>
      ))}
    </div>
  );
};

UserTrips.propTypes = {
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default UserTrips;
