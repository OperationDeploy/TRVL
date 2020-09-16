import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import SelectPlaces from './SelectPlaces';

const InvitesButton = ({ currentUser, trip, setClickedPage }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    axios.get('/inviteUsers', {
      params: {
        currentUser: currentUser.googleId,
      },
    })
      .then((response) => {
        setOtherUsers(response.data);
      })
      .catch((err) => console.warn('ERRR', err));
  }, []);

  const handleClick = (event, user) => {
    event.preventDefault();
    axios
      .post('/inviteTheUser', {
        user,
        trip: trip.id,
      })
      .then(axios.post('/sendTwilio', { user }))
      .catch((err) => console.warn(err));
  };

  const selectPlaces = () => {
    setButtonClicked(true);
  };

  if (buttonClicked) {
    return (
      <SelectPlaces
        trip={trip}
        otherUsers={otherUsers}
        currentUser={currentUser}
        setClickedPage={setClickedPage}
      />
    );
  }

  return (
    <div>
      <div>
        <Button
          color="secondary"
          aria-label="outlined primary button group"
          variant="contained"
          onClick={() => {
            selectPlaces();
          }}
        >
          Generate Places
        </Button>
      </div>
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
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  setClickedPage: PropTypes.func.isRequired,
};

export default InvitesButton;
