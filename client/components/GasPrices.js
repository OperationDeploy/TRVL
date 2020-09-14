/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
      setLoading(<div> Loading...</div>);
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
    <div>
      <Typography component="h1" variant="h2">
        Select Your Car
      </Typography>
      <div className="activity-form-container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <div className="gas-prices">
            <Autocomplete
              onChange={(_, year) => getMakes(year)}
              key={years}
              id="year"
              options={years}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => (
              <TextField key={years} {...params} label="Year" variant="outlined" />
              )}
            />
          </div>
          <div>
            <Autocomplete
              onChange={(_, model) => getModels(model)}
              key={makes}
              id="make"
              options={makes}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => (
              <TextField key={makes} {...params} label="Make" variant="outlined" />
              )}
            />
          </div>
          <div>
            <Autocomplete
              onChange={(_, model) => setCar({ ...car, model })}
              key={models}
              id="model"
              options={models}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => (
              <TextField key={models} {...params} label="Model" variant="outlined" />
              )}
            />
          </div>
          {/* <TextField
            value={value.year}
            variant="outlined"
            placeholder="Year"
            onChange={(event) => {
              setValue({ ...value, year: event.target.value });
            }}
            margin="normal"
          />
          <TextField
            value={value.make}
            variant="outlined"
            placeholder="Make"
            onChange={(event) => {
              setValue({ ...value, make: event.target.value });
            }}
            margin="normal"
          />
          <TextField
            value={value.model}
            variant="outlined"
            placeholder="Model"
            onChange={(event) => {
              setValue({ ...value, model: event.target.value });
            }}
            margin="normal"
          /> */}
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
      </div>
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
