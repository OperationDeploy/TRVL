const Amadeus = require('amadeus');

const getFlightsInfo = () => {
  // input: object with trip ID, destination
  // output: array of objects - flight info
  // array of objects - destinations: airport codes

  const amadeus = new Amadeus({
    clientId: 'rfNXlbNx2n1u9N5eSINqsFoSrTRrIUmL',
    clientSecret: 'r9HEL895nhlLQSdC',
  });

  amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: 'MSY',
      destinationLocationCode: 'LAX',
      departureDate: '2020-09-20',
      returnDate: '2020-09-28',
      adults: '1',
      max: '5',
    })
    .then((response) => {
      console.info(response.data);
    })
    .catch((responseError) => {
      console.info(responseError.code);
    });

  // .get(
  //     'https://test.api.amadeus.com/v2/shopping/flight-offers',

  //     {
  //       params: {
  //         access_token: '9BAnvWXyjKuZFgOJC2SmYceUsuTb',
  //         client_id: 'rfNXlbNx2n1u9N5eSINqsFoSrTRrIUmL',
  //         client_secret: 'r9HEL895nhlLQSdC',
  //         originLocationCode: 'MSY',
  //         destinationLocationCode: 'LAX',
  //         departureDate: '2020-09-28',
  //         returnDate: '2020-09-28',
  //         adults: '1',
  //         max: '5',
  //       },
  //     },
  //     (req, res) => {},
  //   );
  // get flight info:
  // axios call to API for flight info
  // origin, destination, dates

  // axios call to API for airline look up

  // convert EUR to USD

  // create object with Airline & Price

  // return array of results
  // return cool;
};

module.exports = {
  getFlightsInfo,
};
