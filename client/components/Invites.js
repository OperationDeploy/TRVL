import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

const Invites = ({ otherUsers, currentUser, trip }) => {
  const [inviteClicked, setInviteClicked] = useState(false);

  if (inviteClicked === true) {
    // take other users
    // trigger a state change if User is other user
    // save the trip ID and State in invites
    // on state change show current trip's ID in responsive invite page
    // make that ID or trip info clickable
    // Once clicked show preferences page but make page only for trip ID from

    // OR
    // take other users
    // send get to tripUsers
    // then send post to tripUsers and;
    // send TripPropalsVotes for Invites
    if (currentUser.googleId !== otherUsers.googleId) {
      axios.post('/inviteAllOtherUsers', {
        otherUsers, trip,
      }).then((response) => {
        console.log(response);
      }).catch((err) => console.warn(err));
    }
  }

  return (
  <div>
    <Button
      variant="contained"
      onClick={() => {
        setInviteClicked(!inviteClicked);
      }}
    >
      Invite Users
    </Button>
  </div>
  );
};

Invites.propTypes = {
  trip: PropTypes.number.isRequired,
  otherUsers: PropTypes.arrayOf(PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  })).isRequired,
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default Invites;
