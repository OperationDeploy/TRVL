import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import Preferences from './preferences';

const PlanATrip = ({ setClickedPage, currentUser }) => {
  const [allOtherUsers, setAllOtherUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/inviteUsers', {
        params: {
          currentUser: currentUser.googleId,
        },
      })
      .then((response) => {
        setAllOtherUsers(response.data);
      })
      .catch((err) => console.warn('ERRR', err));
  }, []);
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setClickedPage(
            <Preferences
              currentUser={currentUser}
              otherUsers={allOtherUsers}
              setClickedPage={setClickedPage}
            />,
          );
        }}
      >
        Plan A Trip
      </Button>
    </div>
  );
};

PlanATrip.propTypes = {
  setClickedPage: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default PlanATrip;
