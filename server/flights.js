const Amadeus = require('amadeus');
const { API_KEY, API_SECRET } = require('../config');
const { Trip } = require('./db');
const { getCoordinates } = require('./weather');

const getFlightsInfo = async (tripInfo) => {
  // input: object with trip ID, destination
  // output: array of objects - flight info
  // array of objects - destinations: airport codes

  let flightData;
  let dictionary;
  const array = [];
  let iataCodeDestination;

  // access trip
  const trip = await Trip.findOne({
    where: { id: tripInfo.currentTrip.id },
  });

  const dest = trip.dataValues.destination;

  // find coordinates of destination
  const coordinates = await getCoordinates(dest);
  const long = coordinates.Longitude;
  const lat = coordinates.Latitude;

  // get API keys
  const amadeus = new Amadeus({
    clientId: API_KEY,
    clientSecret: API_SECRET,
  });

  // get airport iata code
  await amadeus.referenceData.locations.airports
    .get({
      longitude: long,
      latitude: lat,
    })
    .then((response) => {
      iataCodeDestination = response.data[0].iataCode;
    })
    .catch((response) => {
      console.warn(response);
    });

  // get Flight prices
  await amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: 'MSY',
      destinationLocationCode: iataCodeDestination,
      departureDate: trip.dataValues.start_date,
      returnDate: trip.dataValues.end_date,
      adults: '1',
      max: '5',
    })
    .then((response) => {
      flightData = response.data;
      dictionary = response.result.dictionaries.carriers;
    })
    .then(() => {
      const price = flightData.map((flight) => flight.price.grandTotal);

      const carrier = Object.values(dictionary);
      let result;
      for (let i = 0; i < price.length; i += 1) {
        result = { price: price[i], airline: carrier };
        array.push(result);
      }
    })
    .catch((err) => console.warn(err));

  return array.slice(0, 5);
};

module.exports = {
  getFlightsInfo,
};
