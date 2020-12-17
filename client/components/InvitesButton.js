import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import axios from 'axios';
import SelectPlaces from './SelectPlaces';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
  },
  inline: {
  },
}));

const InvitesButton = ({ currentUser, trip, setClickedPage }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [otherUsers, setOtherUsers] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get('/inviteUsers', {
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
      .then(() => {
        axios.post('/sendTwilio', { user });
      })
      .catch((err) => {
        console.warn(err);
      });
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
        <Typography component="h1" variant="h6">
          Invite Friends
        </Typography>
        <ul>
          {otherUsers.map((user) => (
            <List className={classes.root}>
              <ListItem key={user.id} onClick={(event) => {
                handleClick(event, user);
              }}>
                <ListItemAvatar>
                  <Avatar src={user.profile_pic}
                    alt="user loaded from google login" />
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.first_name} ${user.last_name}`}
                />
              </ListItem>
            </List>
          ))}
        </ul>
      </div>
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
