import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function ContinuousSlider() {
  const classes = useStyles();
  const [temp, setTemp] = useState(50);
  const [expense, setExpense] = useState(50);
  const [landscape, setLandscape] = useState(50);
  const [cityType, setCityType] = useState(50);
  const [proximity, setProximity] = useState(50);
  const [age, setAge] = useState(50);
  const [relationship, setRelationship] = useState(50);

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

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        Preferences:
      </Typography>
      <Grid container spacing={2}>
        Temperature
        <Grid item>Hot</Grid>
        <Grid item xs>
          <Slider
            value={temp}
            onChange={handleChangeTemp}
            aria-labelledby="temp"
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
            value={expense}
            onChange={handleChangeExpense}
            aria-labelledby="continuous-slider"
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
            aria-labelledby="continuous-slider"
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
            aria-labelledby="continuous-slider"
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
            aria-labelledby="continuous-slider"
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
            value={age}
            onChange={handleChangeAge}
            aria-labelledby="continuous-slider"
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
            value={relationship}
            onChange={handleChangeRelationship}
            aria-labelledby="continuous-slider"
            step={10}
            marks
            min={0}
            max={100}
          />
        </Grid>
        <Grid item>Couples</Grid>
      </Grid>
    </div>
  );
}
