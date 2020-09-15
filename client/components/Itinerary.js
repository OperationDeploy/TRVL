import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
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

  const toDate = (date) => {
    const table = {
      Mon: 'Monday,',
      Tue: 'Tuesday,',
      Wed: 'Wednesday,',
      Thu: 'Thursday,',
      Fri: 'Friday,',
      Sat: 'Saturday,',
      Sun: 'Sunday,',
      Jan: 'January',
      Feb: 'February',
      Mar: 'March',
      Apr: 'April',
      May: 'May',
      Jun: 'June',
      Jul: 'July',
      Aug: 'August',
      Sep: 'September',
      Oct: 'October',
      Nov: 'November',
      Dec: 'December',
    };
    const str = new Date(date).toDateString();
    return str.split(' ').map((word, i) => {
      const sub = i === 2 ? `${word},` : word;
      return table[sub] || sub;
    }).join(' ');
  };

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

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  const classes = useStyles();

  let weatherDisp = <CircularProgress />;

  if (weather) {
    if (weather === 'unavailable' || !weather[toISO(day)]) {
      weatherDisp = <div className="weather-widget">Weather Data Not Available</div>;
    } else {
      weatherDisp = (
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`/weather-img/${weather[toISO(day)].weather}.jpg`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
             {currentTrip.city.split(',')[0]} Weather
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="p">
              {toDate(day)}
            </Typography>
            <Typography className="weather-widget" variant="body2" component="p">
              <div id="main">{weather[toISO(day)].weather}</div>
              <div id="high">High: {weather[toISO(day)].temp.high}</div>
              <div id="low">Low: {weather[toISO(day)].temp.low}</div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      );
    }
  }
  // <div className="weather-widget">
  //   <div id="city">Weather in {currentTrip.city}</div>
  //   <div id="date">{toDate(day)}</div>
  //   <div>
  //     <img alt="icon" src={weather[toISO(day)].icon} />
  //   </div>
  //   <div id="main">{weather[toISO(day)].weather}</div>
  //   <div id="high">High: {weather[toISO(day)].temp.high}</div>
  //   <div id="low">Low: {weather[toISO(day)].temp.low}</div>
  // </div>
  //     );
  //   }
  // }

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
              });
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
