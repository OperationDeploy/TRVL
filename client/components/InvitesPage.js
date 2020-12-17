import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UserTrips from './UserTrips';

const InvitesPage = ({ currentTrip, currentUser, myInvites }) => {
  const [invitedTripsArray, setInvitedTripsArray] = useState([]);
  const [invitedTripClicked, setInvitedTripClicked] = useState(false);

  const handleClick = (event, id) => {
    event.preventDefault();
    axios
      .post('./tripUser', {
        currentUser,
        trip_id: id,
      })
      .then(() => {
        axios.post('/removeInvite', { trip_id: id, user: currentUser.googleId });
      })
      .then(() => {
        setInvitedTripClicked(true);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    axios
      .post('./tripNames', {
        myInvites,
      })
      .then((response) => setInvitedTripsArray(response.data));
  }, []);

  if (invitedTripClicked) {
    return <UserTrips currentUser={currentUser} currentTrip={currentTrip} />;
  }
  return (
    <div>
      <Typography variant="h5">Trip Invites</Typography>
      <ul>
        <List>
        {invitedTripsArray.map((invite) => (
          <div>
            <ListItem button key={invite.id} onClick={(e) => {
              handleClick(e, invite.id);
            }}>
              <ListItemText
                primary={invite.name}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
        </List>
      </ul>
    </div>
  );
};

InvitesPage.propTypes = {
  currentTrip: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      profile_pic: PropTypes.string,
      host: PropTypes.bool,
      googleId: PropTypes.string,
    }),
  ).isRequired,
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  myInvites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      user_id: PropTypes.string,
      trip_id: PropTypes.number,
      destination: PropTypes.number,
      createdAt: PropTypes.TIME,
      updatedAt: PropTypes.TIME,
    }),
  ).isRequired,
};

export default InvitesPage;
