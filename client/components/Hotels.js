import React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Hotels = (() => {
  const hotels = [
    ['Hilton', 243, 3], ['Sheraton', 278, 4], ['Ramada', 197, 2], ['Marriott', 310, 4], ['Holiday Inn', 162, 2],
  ];

  return (
    <div className="hotels-container">
      <Typography component="h1" variant="h2">
          Hotels
      </Typography>
       Based on your groups preferences and trip length, these are your top hotel choices:
      {hotels.map((hotel) => (
        <div >
          <div>
            {`${hotel[0]} $${hotel[1]}`}
          </div>
        </div>
      ))}
    </div>
  );
});

export default Hotels;
