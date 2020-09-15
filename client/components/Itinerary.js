import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import moment from 'moment';

import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

moment().format();

const Itinerary = ({ currentUser, currentTrip, day }) => {
  const [activities, setActivities] = useState([]);
  const [text, setText] = useState('');
  const [weather, setWeather] = useState(null);

  const toISO = (date) => new Date(date).toISOString().slice(0, 10);

  useEffect(() => {
    axios
      .get(`/activities/${currentTrip.id}`, {
        trip_id: currentTrip.id,
      })
      .then((res) => {
        const allEvents = res.data
          .filter((activity) => activity.day === day)
          .map((activity) => activity.event);
        setActivities([...activities, ...allEvents]);
      });

    axios.get(`/weather/${currentTrip.id}`).then(({ data }) => {
      if (data[0] && Object.keys(data[0].forecast).length) {
        setWeather(data[0].forecast);
      } else {
        setWeather('unavailable');
      }
    });
  }, []);

  let weatherDisp = <div className="weather-widget"> Loading Weather...</div>;

  if (weather) {
    if (weather === 'unavailable' || !weather[toISO(day)]) {
      weatherDisp = <div className="weather-widget">Weather Data Not Available</div>;
    } else {
      weatherDisp = (
        <div className="weather-widget">
          <div id="city">Weather in {currentTrip.city}:</div>
          <div id="date">({day.slice(0, 16)})</div>
          <div>
            <img alt="icon" src={weather[toISO(day)].icon} />
          </div>
          <div id="main">{weather[toISO(day)].weather}</div>
          <div id="high">High: {weather[toISO(day)].temp.high}</div>
          <div id="low">Low: {weather[toISO(day)].temp.low}</div>
        </div>
      );
    }
  }

  return (
    <div id="trip-itinerary" className="itinerary-container">
      <Typography component="h1" variant="h6">
        {`Plans for: ${moment(day).format('MMM Do')}`}
      </Typography>
      <ActivityForm
        saveActivity={(input) => {
          setText(input.trim());
          if (text.length > 0) {
            axios
              .post('/activities', {
                user_id: currentUser.id,
                trip_id: currentTrip.id,
                event: text,
                day,
              })
              .then((response) => {
                setActivities([...activities, response.data.event]);
              })
              .catch((err) => console.warn(err));
          }
        }}
        currentTrip={currentTrip}
        currentUser={currentUser}
      />
      <ActivityList
        activities={activities}
        currentTrip={currentTrip}
        currentUser={currentUser}
        deleteActivity={(activityIndex) => {
          const newActivities = activities.filter((_, index) => index !== activityIndex);
          axios
            .delete('/activity', {
              params: {
                user_id: currentUser.id,
                trip_id: currentTrip.id,
                event: activities[activityIndex],
                day,
              },
            })
            .then((res) => res.status(204).send('Content Deleted'));
          setActivities(newActivities);
        }}
      />
      {weatherDisp}
    </div>
  );
};

Itinerary.propTypes = {
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
    city: PropTypes.string,
    start_date: PropTypes.string,
    destination: PropTypes.string,
  }).isRequired,
  day: PropTypes.string.isRequired,
};

export default Itinerary;
