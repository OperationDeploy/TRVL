import React from 'react';
import PropTypes from 'prop-types';
import ChatComponent from './ChatComponent';

const ChatRoom = ({ currentUser, currentTrip, newChatMsg }) => (
  <div>
    <h2>CHAT ROOM: {currentTrip.name}</h2>
    <h4>{`Welcome, ${currentUser.first_name}`}</h4>
    <p>{`Your group is going to ${currentTrip.destination}`}</p>
    <ChatComponent currentUser={currentUser} currentTrip={currentTrip} newChatMsg={newChatMsg} />
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
  newChatMsg: PropTypes.func.isRequired,
};
export default ChatRoom;
