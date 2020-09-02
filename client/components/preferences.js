import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";

// adjusts the width of the preferences sliders
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

// exports our ContinuousSlider
export default function ContinuousSlider({ currentUser }) {
  const classes = useStyles();
  // states of our preferences
  const [name, setName] = useState('');
  const [temperature, setTemp] = useState(50);
  const [city_expenses, setExpense] = useState(50);
  const [landscape, setLandscape] = useState(50);
  const [city_type, setCityType] = useState(50);
  const [proximity, setProximity] = useState(50);
  const [group_age, setAge] = useState(50);
  const [group_relationship, setRelationship] = useState(50);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  // sets new states for our preferences upon change
  const handleChangeTemp = (event, newValue) => {
    setTemp(newValue);
  };
  const handleChangeExpense = (event, newValue) => {
    setExpense(newValue);
  };
  const handleChangeLandscape = (event, newValue) => {
    setLandscape(newValue);
  };
  const handleChangeCityType = (event, newValue) => {
    setCityType(newValue);
  };
  const handleChangeProximity = (event, newValue) => {
    setProximity(newValue);
  };
  const handleChangeAge = (event, newValue) => {
    setAge(newValue);
  };
  const handleChangeRelationship = (event, newValue) => {
    setRelationship(newValue);
  };
  // Posts preferences to DB
  // Need to be able to get individual user's id instead of hard coding on line 54
  // Also need to have specific trip_id specified as well
  // need to come back and refactor
  const user_id = currentUser.id;
  // useEffect(() => {
  //   axios.post('/preferences', {
  //     user_id, temperature, city_expenses, landscape, city_type, proximity, group_age, group_relationship,
  //   })
  //     .then((result) => {
  //       console.log(result);
  //     }).catch((err) => console.log('ERR', err));
  // }, [temperature, city_expenses, landscape, city_type, proximity, group_age, group_relationship]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeStartDate = (event) => {
    setStartDate(event);
  };

  const handleChangeEndDate = (event) => {
    setEndDate(event);
  };

  const handleSubmit = () => {
    event.preventDefault();
    // axios
    //   .post('/preferences', {
    //     user_id,
    //     temperature,
    //     city_expenses,
    //     landscape,
    //     city_type,
    //     proximity,
    //     group_age,
    //     group_relationship,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   }).then(
        axios.post('/trips', {
        name: name, start_date: startDate, end_date: endDate,
      })
      // )
      .catch((err) => console.log('ERR', err));
  };

  return (
    <div>
    <div>
        <label>
          Trip name:
          <input type="text" value={name} onChange={handleChangeName} />
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
            value={city_expenses}
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
            value={city_type}
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
            value={group_age}
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
            value={group_relationship}
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
    </div>
    </div>
  );
}
