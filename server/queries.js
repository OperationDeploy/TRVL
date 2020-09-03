require('dotenv').config();
const { Op } = require('sequelize');

const { User, Trip, TripUser, TripPreferences, Destinations, SplitItem, SplitOwedPayment } = require('./db.js');

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
const addPreferences = (req) => {
  const {
    userId,
    tripId,
    temperature,
    cityExpenses,
    landscape,
    cityType,
    proximity,
    groupAge,
    groupRelationship,
  } = req;
  TripPreferences.findOne({ where: { user_id: userId } }).then((obj) => {
    if (obj) {
      obj.update({
        user_id: userId,
        trip_id: tripId,
        temperature,
        city_expenses: cityExpenses,
        landscape,
        city_type: cityType,
        proximity,
        group_age: groupAge,
        group_relationship: groupRelationship,
      });
    } else {
      TripPreferences.create(req);
    }
  });
};

const addSplit = async (req, res) => {
  const purchaserId = req.purchaser_id;
  const tripId = req.trip_id;
  const { price } = req;
  const item = await SplitItem.create(req);
  let users = await TripUser.findAll(
    { where: { trip_id: tripId, user_id: { [Op.ne]: purchaserId } }, raw: true },
  );
  const amount = price / (users.length + 1);
  const userObjs = users.map((user) => ({
    ower_id: user.user_id, recipient_id: purchaserId, amount, trip_id: tripId, item_id: item.id,
  }));
  await Promise.all(userObjs.map((user) => SplitOwedPayment.create(user)));
  users = users.map((user) => User.findByPk(user.user_id, { raw: true }));
  await Promise.all(users).then((result) => { users = result; });
  res.send(userObjs.map(
    (user, i) => ({ first_name: users[i].first_name, last_name: users[i].last_name, amount }),
  ));
  // console.log('the item', item.id);
};

const getSplit = async ({ trip, user }, res) => {
  // let payments = SplitOwedPayment.findAll({ where: { trip_id } });
  const response = {};
  let items = await SplitItem.findAll({ where: { trip_id: trip }, raw: true });
  let users = items.map((item) => User.findByPk(item.purchaser_id, { raw: true }));
  await Promise.all(users).then((result) => { users = result; });
  items = items.map((item, i) => {
    const newItem = item;
    newItem.purchaser = users[i].first_name;
    return newItem;
  });
  const payments = await SplitOwedPayment.findAll(
    { where: { trip_id: trip, recipient_id: user }, raw: true },
  );
  users = payments.map((payment) => User.findByPk(payment.ower_id, { raw: true }));
  await Promise.all(users).then((result) => { users = result; });
  const debts = {};
  payments.forEach((payment, i) => {
    const name = `${users[i].first_name} ${users[i].last_name}`;
    debts[name] = debts[name] ? debts[name] + payment.amount : payment.amount;
  });
  response.items = items;
  response.debts = debts;
  res.send(response);
};
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

const setDest = (req) => {
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
