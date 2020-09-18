import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import ChatRoom from './ChatRoom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(3),
    },
  },
}));

const Chat = ({ currentUser, newMsgs }) => {
  const [clicked, setClicked] = useState(null);
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState({});
  const classes = useStyles();

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

  if (clicked) {
    return (
      <ChatRoom currentTrip={currentTrip} newMsgs={newMsgs} currentUser={currentUser} />
    );
  }

  if (trips.length === 0) {
    return (
      <div>
        <p>No chat rooms currently available.</p>
        <p>Plan a trip to access the chat!</p>
      </div>
    );
  }
  return (
    <div className="chat-container">
      <Typography component="h1" variant="h5">
        Chat Rooms
      </Typography>
      {trips.map((data) => (
        <List>
          <ListItem>
            <ListItemText>{data.name}</ListItemText>
            <div className={classes.root}>
              <Tooltip placement="top" title="Enter Chat">
                <Button
                  onClick={() => {
                    const trip = data;
                    setCurrentTrip(trip);
                    setClicked(true);
                  }}
                  color="secondary"
                  variant="contained"
                >
                  Enter
                </Button>
              </Tooltip>
            </div>
          </ListItem>
          <Divider />
        </List>
      ))}
    </div>
  );
};

Chat.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  newMsgs: PropTypes.func.isRequired,
};

export default Chat;
