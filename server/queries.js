require('dotenv').config();
const { Op } = require("sequelize");

const {
  User,
  Trip,
  TripUser,
  TripPreferences,
  TripPhoto,
  TripProposal,
  TripItinerary,
  TripProposalVotes,
  Destinations,
  SplitItem,
  SplitOwedPayment
} = require('./db.js');

const { generatePlaces } = require('./algo.js');
// create a user
const createUser = async (req, res) => {
  let user = await User.findOne({ where: { googleId: req.body.googleId } });
  if (user === null) {
    user = await User.create(req.body);
  }
  res.send(user);
};

// get user

// destinations - dummy data

const addDestinations = () => {
  Destinations.create({});
};

// add preferences
// need to come back and find where trip_id is = correct trip_id
const addPreferences = (req, res) => {
  TripPreferences.findOne({ where: { user_id: req.user_id } }).then((obj) => {
    if (obj) {
      obj.update(req);
    } else {
      TripPreferences.create(req);
    }
  });
};

const addSplit = async (req, res) => {
  const {
    purchaser_id, price, trip_id,
  } = req;
  const item = await SplitItem.create(req);
  let users = await TripUser.findAll({ where: { trip_id, user_id: { [Op.ne]: purchaser_id } }, raw: true });
  const amount = price / (users.length + 1);
  const userObjs = users.map((user) => ({
    ower_id: user.user_id, recipient_id: purchaser_id, amount, trip_id, item_id: item.id,
  }));
  await Promise.all(userObjs.map((user) => SplitOwedPayment.create(user)));
  users = users.map((user) => User.findByPk(user.user_id, { raw: true }));
  await Promise.all(users).then((result) => { users = result });
  res.send(userObjs.map((user, i) => ({ first_name: users[i].first_name, last_name: users[i].last_name, amount })));
  // console.log('the item', item.id);
};

const getSplit = async ({ trip, user }, res) => {
  // let payments = SplitOwedPayment.findAll({ where: { trip_id } });
  const response = {};
  const trip_id = trip;
  const recipient_id = user;
  let items = await SplitItem.findAll({ where: { trip_id }, raw: true });
  let users = items.map((item) => User.findByPk(item.purchaser_id, { raw: true }));
  await Promise.all(users).then((result) => { users = result });
  items = items.map((item, i) => {
    item.purchaser = users[i].first_name;
    return item;
  })
  const payments = await SplitOwedPayment.findAll({ where: { trip_id, recipient_id }, raw: true });
  users = payments.map((payment) => User.findByPk(payment.ower_id, { raw: true }));
  await Promise.all(users).then((result) => { users = result });
  const debts = {};
  payments.forEach((payment, i) => {
    const name = `${users[i].first_name} ${users[i].last_name}`
    debts[name] = debts[name] ? debts[name] + payment.amount : payment.amount;
  })
  response.items = items;
  response.debts = debts;
  res.send(response);
}
// grab preferences
const grabPreferences = async (req, res) => {
  // console.log(req);
  const tripPrefs = await TripPreferences.findAll({
    where: { trip_id: req.body.trip_id },
  });

  // console.log('trip pref', tripPrefs[0].dataValues);
  const prefObj = tripPrefs[0].dataValues;
  res.send(generatePlaces(prefObj));
};

// add planned trip
const planTrip = async (req, res) => {
  const trip = await Trip.create(req);
  res.send(trip);
};

const setDest = (req, res) => {
  Trip.findOne({ where: { id: req.body.trip_id } }).then((obj) => {
    if (obj) {
      obj.update({ destination: req.body.destination });
    }
  });
};

module.exports = {
  createUser,
  addDestinations,
  addPreferences,
  addSplit,
  getSplit,
  planTrip,
  grabPreferences,
  setDest,
};
