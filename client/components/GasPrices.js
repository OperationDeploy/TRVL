import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

const GasPrices = ({ currentTrip }) => {
  const [value, setValue] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(null);

  let display = '';

  const submit = (car, trip) => {
    setLoading(<div> Loading...</div>);
    axios.post('/gas', { car, trip }).then(({ data }) => {
      setLoading(null);
      if (data && data.total) {
        setResponse(data);
      } else {
        setResponse('unavailable');
      }
    });
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
      <div className="activity-form-container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(value, currentTrip);
            setValue('');
          }}
        >
          <TextField
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
          />
          <Button
            variant="contained"
            component="label"
            onClick={(event) => {
              event.preventDefault();
              submit(value, currentTrip);
              setValue({ year: '', make: '', model: '' });
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
