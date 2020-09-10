const { weatherRefresh } = require('./weather');

// getWeather([{ destination: 'Scranton, PA', start_date: '2020-09-12', end_date: '2023-09-11' },
//   { destination: 'Campeche, Mexico', start_date: '2020-09-07', end_date: '2023-09-11' }])
//   .then((res) => {
//     console.log(res);
//   })

weatherRefresh();
