import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

const GasPrices = ({ currentTrip }) => {
  const [car, setCar] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(null);
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    axios.get('https://www.fueleconomy.gov/ws/rest/vehicle/menu/year')
      .then(({ data }) => {
        setYears(data.menuItem.map((item) => item.value));
      });
  }, []);

  const getMakes = (year) => {
    setModels([]);
    setCar({ year, make: '', model: '' });
    axios.get(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${year}`)
      .then(({ data }) => {
        setMakes(data.menuItem.map((item) => item.value));
      });
  };

  const getModels = (make) => {
    setCar({ ...car, make, model: '' });
    axios.get(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${car.year}&make=${make}`)
      .then(({ data }) => {
        setModels(data.menuItem.map((item) => item.value));
      });
  };

  let display = '';

  const submit = () => {
    const { year, make, model } = car;
    if (year.length && make.length && model.length) {
      setLoading(<CircularProgress />);
      axios.post('/gas', { car, trip: currentTrip })
        .then(({ data }) => {
          setLoading(null);
          if (data && data.total) {
            setResponse(data);
          } else {
            setResponse('unavailable');
          }
        });
    }
  };

  const to2Dec = (num) => Math.round(num * 100) / 100;

  if (response) {
    display =
      response === 'unavailable' ? (
        <div>Data Not Available</div>
      ) : (
        <div className="weather-widget">
          <h2>Between here and {currentTrip.destination}</h2>
          <div>Average Gas Price: ${to2Dec(response.avgPrice)}</div>
          <div>Driving Distance: {to2Dec(response.miles)}</div>
          <div>Fuel Economy: {to2Dec(response.mpg)} mpg</div>
          <h2>Total Cost: ${to2Dec(response.total)}</h2>
        </div>
      );
  }

  return (
      <div className="activity-form-container gas-prices">
        <Typography component="h4" variant="h4">
          Car Select:
        </Typography>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <div>
            <Autocomplete
              id="year"
              onChange={(_, year) => getMakes(year)}
              key={years}
              options={years}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
              <TextField key={years} {...params} label="Year" variant="outlined" />
              )}
            />
          </div>
          <div>
            <Autocomplete
              id="make"
              onChange={(_, model) => getModels(model)}
              key={makes}
              options={makes}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
              <TextField key={makes} {...params} label="Make" variant="outlined" />
              )}
            />
          </div>
          <div>
            <Autocomplete
              id="model"
              onChange={(_, model) => setCar({ ...car, model })}
              key={models}
              options={models}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
              <TextField key={models} {...params} label="Model" variant="outlined" />
              )}
            />
          </div>
          <Button
            variant="contained"
            component="label"
            onClick={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            Submit
          </Button>
        </form>
      {loading || display}
    </div>
  );
};

GasPrices.propTypes = {
  currentUser: PropTypes.shape({
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
    destination: PropTypes.string,
  }).isRequired,
};

export default GasPrices;
