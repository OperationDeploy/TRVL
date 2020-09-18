import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ChatComponent from './ChatComponent';

const ChatRoom = ({ currentUser, currentTrip, newMsgs }) => (
  <div>
    <Typography component="h1" variant="h4">
      CHAT ROOM
    </Typography>
    <Typography component="h2" variant="h3" color="secondary">
      {currentTrip.name}
    </Typography>
    <Typography component="h3" variant="h5">
      {`Welcome, ${currentUser.first_name}`}
    </Typography>
    <Typography>{`Your group is going to ${currentTrip.destination}`}</Typography>
    <ChatComponent
      newMsgs={newMsgs}
      currentUser={currentUser}
      currentTrip={currentTrip}
    />
  </div>
);

ChatRoom.propTypes = {
  currentUser: PropTypes.shape({
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
export default ChatRoom;
