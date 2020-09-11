import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

const GasPrices = ({ currentTrip }) => {
  const [value, setValue] = useState({});
  const [response, setResponse] = useState(null);

  let display = '';

  const submit = (car, trip) => {
    display = (<div> Loading...</div>);
    axios.post('/gas', { car, trip: { ...trip, departure_city: 'New Orleans, LA' } })
      .then(({ data }) => {
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
          <div>Avg gas price between here and {currentTrip.destination}: ${to2Dec(response.avgPrice)}</div>
          <div>Driving for {to2Dec(response.miles)} miles at {to2Dec(response.mpg)} mpg,</div>
          <div>it would cost: ${to2Dec(response.total)}</div>
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
          <Button variant="contained" component="label" onClick={(event) => {
            event.preventDefault();
            submit(value, currentTrip);
            setValue({ year: '', make: '', model: '' });
          }}>
            Submit
          </Button>
        </form>
      </div>
      {display}
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
  }).isRequired,
};

export default GasPrices;
