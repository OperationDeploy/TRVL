import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import axios from 'axios';

const ChatComponent = ({ currentUser, currentTrip }) => {
  const socket = io('localhost:8080');

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [oldMessages, setOldMessages] = useState([]);

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
  });

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit('SEND_MESSAGE', {
      author: currentUser.first_name,
      message: messageText,
    });
    axios.post('/postMessages', {
      text: messageText,
      author: currentUser.first_name,
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
              <div className="card-title">CHAT</div>
              <hr />
              <div className="messages">
                {oldMessages.map((message) => (
                  <div>
                    {message.author}: {message.text}
                  </div>
                ))}
                {messages.map((message) => (
                  <div>
                    {message.author}: {message.message}
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <br />
              <input
                type="text"
                placeholder="Message"
                className="form-control"
                value={messageText}
                onChange={(ev) => setMessageText(ev.target.value)}
              />
              <br />
              <button
                type="submit"
                onClick={sendMessage}
                className="btn btn-primary form-control"
              >
                Send
              </button>
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
};
export default ChatComponent;
