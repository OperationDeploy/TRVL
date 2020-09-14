const moment = require('moment');
const { hotelLookup } = require('./2hotels');

const getHotelsInfo = async (req, res) => {
  const startDate = req.trip.start_date;
  const endDate = req.trip.end_date;
  const start = moment(startDate, 'YYYY-MM-DD');
  const end = moment(endDate, 'YYYY-MM-DD');
  const tripLength = -Math.round(moment.duration(start.diff(end)).asDays());

  const hotel = await hotelLookup(req.city, req.trip.start_date, tripLength);

  res.send(hotel);
};

module.exports = {
  getHotelsInfo,
};
