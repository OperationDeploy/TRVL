const axios = require('axios');
const Amadeus = require('amadeus');
const { API_KEY, API_SECRET } = require('../config');
const { GEO_API } = require('../config');

const getHotelsInfo = async (req, res) => {
  const startDate = req.trip.start_date;
  const endDate = req.trip.end_date;
  const city = req.city.slice(0, req.city.length - 4);
  let state = req.city.slice(req.city.length - 2);
  let country = 'us';
  if (state === 'Mexico') {
    country = 'mx';
    state = null;
  }
  if (state === 'Canada') {
    country = 'ca';
    state = null;
  }
  const query = state ? `${city},${state},${country}` : `${city},${country}`;
  await axios
    .get(
      `http://api.positionstack.com/v1/forward?access_key=${GEO_API}&query=${query}&limit=1`,
    )
    .then((response) => {
      const long = response.data.data[0].longitude;
      const lat = response.data.data[0].latitude;
      const amadeus = new Amadeus({
        clientId: API_KEY,
        clientSecret: API_SECRET,
      });
      return amadeus.shopping.hotelOffers
        .get({
          latitude: lat,
          longitude: long,
          radius: 10,
          radiusUnit: 'MILE',
          // checkInDate: startDate,
          // checkOutDate: endDate,
          adults: '1',
          currency: 'USD',
          bestRateOnly: true,
          sort: 'PRICE',
          rating: [4, 3, 2],
        });
    })
    .then((hotelList) => {
      // console.log(hotelList);
      res.send(hotelList.data);
    }).catch((err) => console.warn(err));
  // const arr = [result[0], result[1], result[2], result[3], result[4]];
};

module.exports = {
  getHotelsInfo,
};
