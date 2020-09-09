import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

const InvitesButton = ({ otherUsers, trip }) => {
  const [inviteClicked, setInviteClicked] = useState(false);

  const handleClick = (event, user) => {
    // event.preventDefault();
    axios
      .post('/inviteTheUser', {
        user,
        trip: trip.id,
      })
      .then(axios.post('/sendTwilio', { user }))
      .catch((err) => console.warn(err));
  };

  if (inviteClicked === true) {
    return (
      <div>
        <header>Click on a user to send them a invite to this trip!</header>
        <ul>
          {otherUsers.map((user) => (
            <button type="submit" key={user} onClick={(e) => handleClick(e, user)}>
              {user.last_name}, {user.first_name}
            </button>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setInviteClicked(!inviteClicked);
        }}
      >
        Invite Users
      </Button>
    </div>
  );
};

InvitesButton.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    destination: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }).isRequired,
  otherUsers: PropTypes.arrayOf(
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
};

export default InvitesButton;
