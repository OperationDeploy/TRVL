import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import TripCalendar from './TripCalendar';
// import Itinerary from './Itinerary';
import Purchases from './Purchases';
import Photos from './Photos';
import Flights from './Flights';

const UserTrips = ({ currentUser }) => {
  const [clicked, setClicked] = useState(null);
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState({});

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

  switch (clicked) {
    case 'itinerary':
      return <TripCalendar currentUser={currentUser} currentTrip={currentTrip} />;
    case 'purchases':
      return <Purchases currentUser={currentUser} currentTrip={currentTrip} />;
    case 'photos':
      return <Photos currentUser={currentUser} currentTrip={currentTrip} />;
    case 'flights':
      return <Flights currentUser={currentUser} currentTrip={currentTrip} />;
    default:
  }

  return (
    <div className="itinerary-container">
      <Typography variant="h2">Trips</Typography>
      {trips.map((data) => (
        <List>
          <ListItem>
            <ListItemSecondaryAction>
              <Button
                onClick={() => {
                  // eslint-disable-next-line max-len
                  const trip = {
                    id: data.id,
                    city: data.destination,
                    startDate: data.start_date,
                    endDate: data.end_date,
                  };
                  setCurrentTrip(trip);
                  setClicked('itinerary');
                }}
                color="primary"
              >
                Itinerary
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemSecondaryAction>
              <Button
                onClick={() => {
                  const trip = { id: data.id, city: data.destination };
                  setCurrentTrip(trip);
                  setClicked('purchases');
                }}
                color="primary"
              >
                Purchases
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <br />
          <ListItem>
            <ListItemSecondaryAction>
              <Button
                onClick={() => {
                  const trip = { id: data.id, city: data.destination };
                  setCurrentTrip(trip);
                  setClicked('photos');
                }}
                color="primary"
              >
                Photos
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemSecondaryAction>
              <Button
                onClick={() => {
                  const trip = { id: data.id, city: data.destination };
                  setCurrentTrip(trip);
                  setClicked('flights');
                }}
                color="primary"
              >
                Flights
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
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default UserTrips;
