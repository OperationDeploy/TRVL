const Amadeus = require('amadeus');
const { API_KEY, API_SECRET } = require('../config');
const { Trip } = require('./db');
const { getCoordinates } = require('./weather');

const getFlightsInfo = async (tripInfo) => {
  // input: object with trip ID, destination
  // output: array of objects - flight info
  // array of objects - destinations: airport codes

  let flightData;
  // let dictionary;
  const array = [];
  let iataCodeDestination;
  let carrierCode;

  // access trip
  const trip = await Trip.findOne({
    where: { id: tripInfo.currentTrip.id },
  });

  const dest = trip.dataValues.destination;

  // find coordinates of destination
  // geCoordinates func
  // Gets coordinates from a location string
  const coordinates = await getCoordinates(dest);
  const long = coordinates.Longitude;
  const lat = coordinates.Latitude;
  // console.info('lat:', lat);
  // console.info(';ong', long);
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
      // console.info(
      //   'flight data!!!!!!',
      //   response.data[0].itineraries[0].segments[0].carrierCode,
      // );
      carrierCode = response.data[0].itineraries[0].segments[0].carrierCode;
      flightData = response.data;
      // dictionary = response.result.dictionaries;
    })
    .then(() => {
      const price = flightData.map((flight) => flight.price.grandTotal);
      // const carrier = 'SPIRIT AIRLINES';
      // for (const key in dictionary.carriers) {
      //   carrier = dictionary.carriers[key];
      // }

      let result;
      for (let i = 0; i < price.length; i += 1) {
        result = { price: price[i], airline: carrierCode };
        array.push(result);
      }

      // get flight info:
      // axios call to API for flight info
      // origin, destination, dates

      // axios call to API for airline look up

      // convert EUR to USD

      // create object with Airline & Price

      // return array of results
      // return array;
    })
    .catch((err) => console.warn(err));

  return array.slice(0, 5);
};

module.exports = {
  getFlightsInfo,
};
