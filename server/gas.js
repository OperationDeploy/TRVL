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
  return 12742 * Math.asin(Math.sqrt(a)) * 0.62137;
};

const gasRequest = (lat, lon) =>
  axios.get(
    `http://api.collectapi.com/gasPrice/fromCoordinates?lng=${lon.toFixed(
      6,
    )}&lat=${lat.toFixed(6)}`,
    {
      headers: {
        'content-type': 'application/json',
        authorization: GAS_API,
      },
    },
  );

const getMPG = async (year, make, model) => {
  const car = await axios.get(
    `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`,
  );
  let mpg = 25.1;
  if (car && car.data && car.data.menuItem) {
    let { menuItem } = car.data;
    menuItem = Array.isArray(menuItem) ? menuItem : [menuItem];
    let mpgs = menuItem.map(async (item) =>
      axios.get(
        `https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/${item.value}`,
      ),
    );
    await Promise.all(mpgs).then((res) => {
      mpgs = res;
    });
    for (let i = 0; i < mpgs.length; i += 1) {
      if (mpgs[i].data.avgMpg) {
        mpg = mpgs[i].data.avgMpg;
        break;
      }
    }
  }
  return mpg;
};

const getGasPrices = async (trip, car) => {
  const mpg = await getMPG(car.year, car.make, car.model);
  const locA = await getCoordinates(trip.departure_city);
  const locB = await getCoordinates(trip.destination);
  const stops = between(locA.Latitude, locA.Longitude, locB.Latitude, locB.Longitude);
  const miles =
    distance(locA.Latitude, locA.Longitude, locB.Latitude, locB.Longitude) * 1.2;
  const quote1 = await gasRequest(stops.lat25, stops.lon25);
  const quote2 = await gasRequest(stops.lat50, stops.lon50);
  const quote3 = await gasRequest(stops.lat75, stops.lon75);
  const price1 = Number(quote1.data.result.gasoline);
  const price2 = Number(quote2.data.result.gasoline);
  const price3 = Number(quote3.data.result.gasoline);
  const avgPrice = (price1 + price2 + price3) / 3;
  const gals = miles / mpg;
  const total = avgPrice * gals;
  return { avgPrice, total, miles, mpg };
};

module.exports = {
  getGasPrices,
};
