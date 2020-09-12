const axios = require('axios');
// const Amadeus = require('amadeus');
// const { API_KEY, API_SECRET } = require('../config');
const { GEO_API } = require('../config');

const getHotelsInfo = async (req, res) => {
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

      console.info(long, lat, res);
      // const amadeus = new Amadeus({
      //     clientId: API_KEY,
      //     clientSecret: API_SECRET,
      //   });

      //   await amadeus.shopping.flightOffersSearch
      //     .get({
      //       originLocationCode: 'MSY',
      //       destinationLocationCode: 'LAX',
      //       departureDate: '2020-09-20',
      //       returnDate: '2020-09-28',
      //       adults: '1',
      //       max: '5',
      //     })
      //     .then((response) => {
      //       console.info(response.data, 'DATA!!!');
      //       hotelData = response.data;
      //       dictionary = response.result.dictionaries;
      //       console.info(dictionary, 'FIRST DICTIONRY!!!');
      //       console.info(hotelData, 'HOTEL DATA!!!');
      //     })

      // .then(() => {
      //   console.info(dictionary, 'dictionary!!!!!!!');
      //   const price = hotelData.map((flight) => flight.price.grandTotal);
      //   //   const carrier = 'SPIRIT AIRLINES';
      //   // for (const key in dictionary.carriers) {
      //   //   carrier = dictionary.carriers[key];
      //   // }

      //   let result;
      //   for (let i = 0; i < price.length; i += 1) {
      //     result = { price: price[i], airline: carrier };
      //     array.push(result);
      //   }
      // })
      // .catch((err) => console.warn(err));

      //   return array;
    })
    .catch((err) => console.warn(err));
};

module.exports = {
  getHotelsInfo,
};
