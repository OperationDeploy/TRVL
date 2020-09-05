require('dotenv').config();
const { Op } = require('sequelize');

const { User, Trip, TripUser, TripPreferences, Destinations, SplitItem, SplitOwedPayment, TripPhoto } = require('./db.js');

const { generatePlaces } = require('./algo.js');
// create a user
const createUser = async (req, res) => {
  let user = await User.findOne({ where: { googleId: req.body.googleId } });
  if (user === null) {
    user = await User.create(req.body);
  }
  res.send(user);
};

// destinations - dummy data

const addDestinations = () => {
  Destinations.create({});
};

// add preferences
// TODO: need to come back and find where trip_id is = correct trip_id
const addPreferences = (req) => {
  TripPreferences.findOne({ where: { user_id: req.user_id } }).then((obj) => {
    if (obj) {
      obj.update({
        user_id: req.user_id,
        trip_id: req.trip_id,
        temperature: req.temperature,
        city_expenses: req.city_expenses,
        landscape: req.landscape,
        city_type: req.city_type,
        proximity: req.proximity,
        group_age: req.group_age,
        group_relationship: req.group_relationship,
      });
    } else {
      TripPreferences.create({
        user_id: req.user_id,
        trip_id: req.trip_id,
        temperature: req.temperature,
        city_expenses: req.city_expenses,
        landscape: req.landscape,
        city_type: req.city_type,
        proximity: req.proximity,
        group_age: req.group_age,
        group_relationship: req.group_relationship,
      });
    }
  });
  TripUser.create({ trip_id: req.trip_id, user_id: req.user_id });
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
  // users = users.map((user) => User.findByPk(user.user_id, { raw: true }));
  users = users.map((user) => User.findOne({ where: { googleId: user.user_id }, raw: true }));
  await Promise.all(users).then((result) => { users = result; });
  res.send(userObjs.map(
    (user, i) => ({ first_name: users[i].first_name, last_name: users[i].last_name, amount }),
  ));
};

const getSplit = async ({ trip, user }, res) => {
  const response = {};
  let items = await SplitItem.findAll({ where: { trip_id: trip }, raw: true });
  let users = items.map((item) => User.findOne(
    { where: { googleId: item.purchaser_id }, raw: true },
  ));
  await Promise.all(users).then((result) => { users = result; });
  items = items.map((item, i) => {
    const newItem = item;
    newItem.purchaser = users[i].first_name;
    return newItem;
  });
  const payments = await SplitOwedPayment.findAll(
    { where: { trip_id: trip, recipient_id: user }, raw: true },
  );
  users = payments.map((payment) => User.findOne(
    { where: { googleId: payment.ower_id }, raw: true },
  ));
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

const grabPlaces = async (req, res) => {
  const tripPrefs = await TripPreferences.findAll({
    where: { trip_id: req.body.trip_id },
  });

  const prefObj = tripPrefs[0].dataValues;
  res.send(generatePlaces(prefObj));
};

// add planned trip
const planTrip = async (req, res) => {
  const trip = await Trip.create(
    { name: req.name, start_date: req.start_date, end_date: req.end_date },
  );
  res.send(trip);
};

const setDest = (req) => {
  Trip.findOne({ where: { id: req.body.trip_id } }).then((obj) => {
    if (obj) {
      obj.update({ destination: req.body.destination });
    }
  });
};

const getPhotos = async ({ trip }, res) => {
  const photos = await TripPhoto.findAll({ where: { trip_id: trip },
    raw: true,
    order: [
      ['createdAt', 'DESC'],
    ] });
  let users = photos.map((photo) => User.findOne(
    { where: { googleId: photo.user_id }, raw: true },
  ));
  await Promise.all(users).then((results) => { users = results; });
  res.send(
    photos.map((photo, i) => ({ ...photo, userName: `${users[i].first_name} ${users[i].last_name}` })),
  );
};

const addPhoto = async ({ file, body }, res) => {
  const { user, trip } = body;
  const photo = await TripPhoto.create({ user_id: user, trip_id: trip, photo_link: file.filename });
  res.send(photo);
};

const getAllTrips = async (req, res) => {
  const tripIds = await TripUser.findAll({ where: { user_id: req.body.user_id } });
  let trips = tripIds.map((item) => Trip.findByPk(item.trip_id));
  await Promise.all(trips).then((response) => { trips = response; });

  res.send(trips);
};
module.exports = {
  createUser,
  addDestinations,
  addPreferences,
  addSplit,
  getSplit,
  planTrip,
  grabPlaces,
  setDest,
  getPhotos,
  addPhoto,
  getAllTrips,
};
