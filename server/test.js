const axios = require('axios');
const { getCoordinates } = require('./weather');
const { GAS_API } = require('../config');

const between = (lat1, lon1, lat2, lon2) => {
  const half = (a, b) => (a + b) / 2;
  const result = {};
  result.lat50 = half(lat1, lat2);
  result.lon50 = half(lon1, lon2);
  result.lat25 = half(lat1, result.lat50);
  result.lon25 = half(lon1, result.lon50);
  result.lat75 = half(result.lat50, lat2);
  result.lon75 = half(result.lon50, lon2);
  return result;
};

const distance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const b = (1 - c((lon2 - lon1) * p)) / 2;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * b;
  return (12742 * Math.asin(Math.sqrt(a))) * 0.62137;
};

const gasRequest = (lat, lon) => {
  return axios.get(`http://api.collectapi.com/gasPrice/fromCoordinates?lng=${lon}&lat=${lat}`, {
    headers: {
      'content-type': 'application/json',
      authorization: GAS_API,
    } });
};

const getGasPrices = async (trip, mpg) => {
  const departure = await getCoordinates(trip.departure_city);
  const destination = await getCoordinates(trip.destination);
  const locA = departure.data.data[0];
  const locB = destination.data.data[0];
  const stops = between(locA.latitude, locA.longitude, locB.latitude, locB.longitude);
  const miles = distance(locA.latitude, locA.longitude, locB.latitude, locB.longitude) * 1.1;
  const quote1 = await gasRequest(stops.lat25, stops.lon25);
  const quote2 = await gasRequest(stops.lat50, stops.lon50);
  const quote3 = await gasRequest(stops.lat75, stops.lon75);
  const price1 = Number(quote1.data.result.gasoline);
  const price2 = Number(quote2.data.result.gasoline);
  const price3 = Number(quote3.data.result.gasoline);
  const avgPrice = (price1 + price2 + price3) / 3;
  const gals = miles / mpg;
  const total = avgPrice * gals;
  console.info('avg price', avgPrice, 'total', total);
};

getGasPrices({ departure_city: 'Syracuse, NY', destination: 'New Orleans, LA' }, 30);
