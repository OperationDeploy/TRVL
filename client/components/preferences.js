import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SelectPlaces from './SelectPlaces';
import InvitesButton from './InvitesButton';

// adjusts the width of the preferences sliders
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

// exports our ContinuousSlider
const ContinuousSlider = ({ currentUser, otherUsers, setClickedPage }) => {
  const classes = useStyles();
  // states of our preferences
  const [name, setName] = useState('');
  const [temperature, setTemp] = useState(50);
  const [cityExpenses, setExpense] = useState(50);
  const [landscape, setLandscape] = useState(50);
  const [cityType, setCityType] = useState(50);
  const [proximity, setProximity] = useState(50);
  const [groupAge, setAge] = useState(50);
  const [groupRelationship, setRelationship] = useState(50);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [trip, setTrip] = useState(0);
  const userId = currentUser.googleId;

  // sets new states for our preferences upon change
  const handleChangeTemp = (_, newValue) => {
    setTemp(newValue);
  };
  const handleChangeExpense = (_, newValue) => {
    setExpense(newValue);
  };
  const handleChangeLandscape = (_, newValue) => {
    setLandscape(newValue);
  };
  const handleChangeCityType = (_, newValue) => {
    setCityType(newValue);
  };
  const handleChangeProximity = (_, newValue) => {
    setProximity(newValue);
  };
  const handleChangeAge = (_, newValue) => {
    setAge(newValue);
  };
  const handleChangeRelationship = (_, newValue) => {
    setRelationship(newValue);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeStartDate = (event) => {
    setStartDate(event);
  };

  const handleChangeEndDate = (event) => {
    setEndDate(event);
  };

  // Posts preferences to DB
  const handleSubmit = () => {
    axios
      .post('/trips', {
        name,
        start_date: startDate,
        end_date: endDate,
        googleId: currentUser.googleId,
      })
      .then((result) => {
        const tripId = result.data.id;
        setTrip(result.data);
        axios.post('/preferences', {
          user_id: userId,
          trip_id: tripId,
          temperature,
          city_expenses: cityExpenses,
          landscape,
          city_type: cityType,
          proximity,
          group_age: groupAge,
          group_relationship: groupRelationship,
        });
      })
      .catch((err) => console.warn('ERR', err));
  };

  useEffect(() => {
    if (trip !== 0) {
      axios.post('./tripUser', {
        currentUser,
        trip_id: trip.id,
      });
    }
  }, [trip]);

  const selectPlaces = () => {
    setButtonClicked(true);
  };

  if (buttonClicked) {
    return (
      <SelectPlaces
        trip={trip}
        currentUser={currentUser}
        setClickedPage={setClickedPage}
      />
    );
  }

  return (
    <Container fixed classes={{ root: 'preferences-container' }}>
      <div className="prefs">
        <label htmlFor="text">
          Trip name:
          <input
            type="text"
            id="text"
            name="type"
            placeholder="text"
            value={name}
            onChange={handleChangeName}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="start-date"
              label="Start Date"
              value={startDate}
              onChange={handleChangeStartDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="end-date"
              label="End Date"
              value={endDate}
              onChange={handleChangeEndDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </label>
      </div>
      <div className={classes.root}>
        <Typography id="continuous-slider" gutterBottom>
          Preferences:
        </Typography>
        <Grid container spacing={2}>
          Temperature
          <Grid item>Hot</Grid>
          <Grid item xs>
            <Slider
              value={temperature}
              onChange={handleChangeTemp}
              aria-labelledby="temperature"
              step={10}
              marks
              min={0}
              max={100}
            />
          </Grid>
          <Grid item>Cold</Grid>
        </Grid>
        <Grid container spacing={2}>
          City Expenses
          <Grid item>Low</Grid>
          <Grid item xs>
            <Slider
              value={cityExpenses}
              onChange={handleChangeExpense}
              aria-labelledby="city_expenses"
              step={10}
              marks
              min={0}
              max={100}
            />
          </Grid>
          <Grid item>High</Grid>
        </Grid>
        <Grid container spacing={2}>
          Landscape
          <Grid item>City</Grid>
          <Grid item xs>
            <Slider
              value={landscape}
              onChange={handleChangeLandscape}
              aria-labelledby="landscape"
              step={10}
              marks
              min={0}
              max={100}
            />
          </Grid>
          <Grid item>Nature</Grid>
        </Grid>
        <Grid container spacing={2}>
          City Type
          <Grid item>Party</Grid>
          <Grid item xs>
            <Slider
              value={cityType}
              onChange={handleChangeCityType}
              aria-labelledby="city_type"
              step={10}
              marks
              min={0}
              max={100}
            />
          </Grid>
          <Grid item>Historical</Grid>
        </Grid>
        <Grid container spacing={2}>
          Proximity
          <Grid item>Domestic</Grid>
          <Grid item xs>
            <Slider
              value={proximity}
              onChange={handleChangeProximity}
              aria-labelledby="proximity"
              step={10}
              marks
              min={0}
              max={100}
            />
          </Grid>
          <Grid item>International</Grid>
        </Grid>
        <Grid container spacing={2}>
          Group Age
          <Grid item>Young Adults</Grid>
          <Grid item xs>
            <Slider
              value={groupAge}
              onChange={handleChangeAge}
              aria-labelledby="group_age"
              step={10}
              marks
              min={0}
              max={100}
            />
          </Grid>
          <Grid item>Older Adults</Grid>
        </Grid>
        <Grid container spacing={2}>
          Group Relationship Status
          <Grid item>Singles</Grid>
          <Grid item xs>
            <Slider
              value={groupRelationship}
              onChange={handleChangeRelationship}
              aria-labelledby="group_relationship"
              step={10}
              marks
              min={0}
              max={100}
            />
          </Grid>
          <Grid item>Couples</Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit Preferences
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            selectPlaces();
          }}
        >
          Generate Places
        </Button>
        <InvitesButton otherUsers={otherUsers} currentUser={currentUser} trip={trip} />
      </div>
    </Container>
  );
};

ContinuousSlider.propTypes = {
  setClickedPage: PropTypes.func.isRequired,
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
};
export default ContinuousSlider;
