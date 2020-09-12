const axios = require('axios');
const Amadeus = require('amadeus');
const { API_KEY, API_SECRET } = require('../config');
const { GEO_API } = require('../config');

let hotels;
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
  return axios
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

      hotels = amadeus.shopping.hotelOffers
        .get({
          latitude: lat,
          longitude: long,
          radius: 2,
          radiusUnit: 'MILE',
          checkInDate: startDate,
          checkOutDate: endDate,
          adults: '1',
          currency: 'USD',
          bestRateOnly: true,
          sort: 'PRICE',
        })
        .then((results) => {
          const result = results.data.map((hotel) => {
            return {
              hotelName: hotel.hotel.name,
              price: hotel.offers[0].price.base,
              rating: hotel.hotel.rating,
            };
          });
          const arr = [result[0], result[1], result[2], result[3], result[4]];
          return arr;
        }).catch((err) => console.warn(err));
        console.info(hotels);
      res.send(hotels);
    })
    .catch((err) => console.warn(err));
};

module.exports = {
  getHotelsInfo,
};
