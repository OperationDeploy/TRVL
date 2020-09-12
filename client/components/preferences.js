/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InvitesButton from './InvitesButton';

const states = ['AG', 'AL', 'AK', 'AB', 'AZ', 'AR', 'BJ', 'BS', 'BC', 'CA', 'CP', 'CH', 'CI', 'CU', 'CL', 'CO',
  'CT', 'DE', 'DC', 'DF', 'DG', 'FL', 'GA', 'GJ', 'GR', 'HI', 'HG', 'ID', 'IL', 'IN', 'IA', 'JA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MB', 'MA', 'EM', 'MI', 'MH', 'MN', 'MS', 'MO', 'MT', 'MR', 'NA', 'NE', 'NV', 'NB', 'NH', 'NJ', 'NM', 'NY', 'NF',
  'NC', 'ND', 'NT', 'NS', 'NL', 'NU', 'OA', 'OH', 'OK', 'ON', 'OR', 'PA', 'PE', 'PU', 'PR', 'QC', 'QA', 'QR', 'RI', 'SL',
  'SK', 'SI', 'SO', 'SC', 'SD', 'TA', 'TM', 'TN', 'TX', 'TL', 'UT', 'VZ', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'YC', 'YT', 'ZT', 'Canada', 'Mexico'];

// adjusts the width of the preferences sliders
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

// exports our ContinuousSlider
const ContinuousSlider = ({ currentUser, allOtherUsers, setClickedPage }) => {
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
  const [trip, setTrip] = useState(0);
  const [inviteButtonClicked, setInviteButtonClicked] = useState(false);
  const [departureCity, setDepartureCity] = useState('');
  const [departureState, setDepartureState] = useState('');
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
        departure_city: `${departureCity}, ${departureState}`,
        googleId: currentUser.googleId,
        weather_alert: false,
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

  const inviteUsers = () => {
    setInviteButtonClicked(true);
  };

  if (inviteButtonClicked) {
    return (
      <InvitesButton
        otherUsers={allOtherUsers}
        currentUser={currentUser}
        trip={trip}
        setClickedPage={setClickedPage}
      />
    );
  }

  return (
    <Container fixed classes={{ root: 'preferences-container' }}>
      <div className="text-inputs">
        <Typography variant="h2">Plan a Trip</Typography>
        <TextField
          value={name}
          id="trip-name"
          label="Trip Name"
          variant="outlined"
          onChange={handleChangeName}
          margin="normal"
        />
        <br />
        <TextField
          value={departureCity}
          id="departure-city"
          label="Departure City"
          variant="outlined"
          onChange={(event) => {
            setDepartureCity(event.target.value);
          }}
          margin="normal"
        />
        <TextField
          id="departure-state"
          select
          label="State"
          value={departureState}
          onChange={(event) => {
            setDepartureState(event.value);
          }}
          variant="outlined"
          margin="normal"
        >
          {states.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
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
        <ButtonGroup color="secondary" aria-label="outlined primary button group">
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit Preferences
          </Button>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              inviteUsers();
            }}
          >
            Invite Users
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
};

ContinuousSlider.propTypes = {
  setClickedPage: PropTypes.func.isRequired,
  allOtherUsers: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      profile_pic: PropTypes.string,
      host: PropTypes.bool,
      googleId: PropTypes.string,
    }),
  ),
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

ContinuousSlider.defaultProps = {
  allOtherUsers: [],
};

export default ContinuousSlider;
