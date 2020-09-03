require('dotenv').config();

const { User, Trip, TripPreferences, Destinations } = require('./db.js');

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
  planTrip,
  grabPreferences,
  setDest,
};
