const axios = require('axios');
require('dotenv').config();

const HOTEL_API = 'fd3e8d4c5cmshde40c89514f3e56p1c5e67jsn80df48e46993';

// LOCATION LOOKUP AUTOCOMPLETE
const idLookup = async (location) => {
  const res = await axios({
    method: 'GET',
    url: 'https://tripadvisor1.p.rapidapi.com/locations/auto-complete',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
      'x-rapidapi-key': HOTEL_API,
      useQueryString: true,
    },
    params: {
      lang: 'en_US',
      units: 'mi',
      query: location,
    },
  });
  return res.data.data[0].result_object.location_id;
};
// HOTEL LOOKUP
const hotelLookup = async (location, checkin, nights) => {
  const id = await idLookup(location);
  const res = await axios({
    method: 'GET',
    url: 'https://tripadvisor1.p.rapidapi.com/hotels/list',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
      'x-rapidapi-key': HOTEL_API,
      useQueryString: true,
    },
    params: {
      offset: '0',
      currency: 'USD',
      limit: '5',
      order: 'asc',
      lang: 'en_US',
      sort: 'price',
      location_id: id,
      adults: '1',
      checkin,
      rooms: '1',
      nights,
    },
  });
  const hotels = res.data.data;
  return hotels;
};

module.exports = {
  hotelLookup,
  idLookup,
};
