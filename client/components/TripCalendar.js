import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Itinerary from './Itinerary';

moment().format();

const TripCalendar = ({ currentUser, currentTrip }) => {
  const [day, setDay] = useState('');

  const tripRange = {
    startDate: new Date(currentTrip.startDate),
    endDate: new Date(currentTrip.endDate),
    key: 'selection',
  };

  const handleSelect = (item) => {
    if (item.selection.startDate >= item.selection.endDate) {
      setDay(moment(item.selection.startDate).format('YYYY-M-D'));
    } else if (item.selection.startDate <= item.selection.endDate) {
      setDay(moment(item.selection.endDate).format('YYYY-M-D'));
    }
  };

  return (
    <div>
      <Typography component="h1" variant="h2">
        Itinerary
      </Typography>
      <DateRange ranges={[tripRange]} onChange={(item) => handleSelect(item)} />
      {day ? (
        <Itinerary currentUser={currentUser} currentTrip={currentTrip} day={day} />
      ) : null}
    </div>
  );
};

TripCalendar.propTypes = {
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
    destination: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
};

export default TripCalendar;
