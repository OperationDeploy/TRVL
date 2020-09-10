import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import InvitesPreferences from './InvitesPreferences';

const InvitesPage = ({ otherUsers, currentUser, myInvites }) => {
  const [invitedTripsArray, setInvitedTripsArray] = useState([]);
  const [invitedTripClicked, setInvitedTripClicked] = useState(false);
  const [inviteTripId, setInviteTripId] = useState(0);
  const [invitedStartDate, setInvitedStartDate] = useState('');
  const [invitedEndDate, setInvitedEndDate] = useState('');
  const [inviteTripName, setInviteTripName] = useState('');

  const handleClick = (event, name, id, startDate, endDate) => {
    event.preventDefault();
    setInviteTripId(id);
    setInvitedTripClicked(true);
    setInvitedStartDate(startDate);
    setInvitedEndDate(endDate);
    setInviteTripName(name);
  };

  useEffect(() => {
    axios
      .post('./tripNames', {
        myInvites,
      })
      .then((response) => setInvitedTripsArray(response.data));
  }, []);

  if (invitedTripClicked) {
    return (
      <InvitesPreferences
        inviteTripId={inviteTripId}
        currentUser={currentUser}
        otherUsers={otherUsers}
        invitedStartDate={invitedStartDate}
        invitedEndDate={invitedEndDate}
        inviteTripName={inviteTripName}
      />
    );
  }
  return (
    <div>
      <header>Here are your trip invites:</header>
      <ul>
        {invitedTripsArray.map((invite) => (
          <button
            type="submit"
            key={invite.id}
            onClick={(e) => {
              handleClick(e, invite.name, invite.id, invite.start_date, invite.end_date);
            }}
          >
            {invite.name}
          </button>
        ))}
      </ul>
    </div>
  );
};

InvitesPage.propTypes = {
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
