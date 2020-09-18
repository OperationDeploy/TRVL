import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const ChatComponent = ({ currentUser, currentTrip, newMsgs }) => {
  const socket = io('localhost:8080');

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [oldMessages, setOldMessages] = useState([]);
  const classes = useStyles();

  const handleChange = (response) => {
    setOldMessages(response);
  };

  useEffect(() => {
    axios
      .post('/getMessages', { trip_id: currentTrip.id }, () => {})
      .then((response) => {
        handleChange(response.data);
      });
  }, []);

  const addMessage = (data) => {
    console.info(data, 'Message added');
    setMessages([...messages, data]);
  };

  socket.on('RECEIVE_MESSAGE', (data) => {
    addMessage(data);
    newMsgs();
  });

  const sendMessage = (event) => {
    event.preventDefault();
    const today = new Date();
    const time = `${today.getHours() % 12 || 12}:${
      today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
    }${today.getHours() < 12 ? 'AM' : 'PM'}`;
    socket.emit('SEND_MESSAGE', {
      author: currentUser.first_name,
      message: messageText,
      time,
    });
    axios.post('/postMessages', {
      text: messageText,
      author: currentUser.first_name,
      time,
      user_google_id: currentUser.googleId,
      trip_id: currentTrip.id,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Join the Conversation</div>
              <hr />
              <List className={classes.root}>
              {oldMessages.map((message) => (
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={`${messageText} ${message.time}`}
                    secondary={
                        <Typography
                        component="span"
                        color="primary"
                        >
                          {message.author}
                        </Typography>
                    }
                  />
                </ListItem>
              ))}
               {messages.map((message) => (
                 <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={`${messageText} ${message.time}`}
                    secondary={
                      <Typography
                      component="span"
                      color="primary"
                      >
                          {message.author}
                        </Typography>
                    }
                  />
                </ListItem>
               ))}
               <Divider variant="inset" component="li" />
              </List>
            </div>
            <div className="card-footer">
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={1}
                placeholder="Share your message"
                variant="outlined"
                color="secondary"
                value={messageText}
                onChange={(ev) => setMessageText(ev.target.value)}
              />
              <Button
                type="submit"
                onClick={sendMessage}
                className="btn btn-primary form-control"
                color="primary"
                variant="contained"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ChatComponent.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  currentTrip: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    destination: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
  newMsgs: PropTypes.func.isRequired,
};
export default ChatComponent;
