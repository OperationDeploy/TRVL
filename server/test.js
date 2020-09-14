// const { getCoordinates } = require('./weather');
const axios = require('axios');

// getCoordinates('Syracuse, NY');

axios.get(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=2012`)
  .then(({ data }) => {
    console.info(data.menuItem);
  })
