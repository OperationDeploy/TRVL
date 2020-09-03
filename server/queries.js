require('dotenv').config();
const { Op } = require('sequelize');

const { User, Trip, TripPreferences, Destinations, TripProposal } = require('./db.js');

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
  TripPreferences.findOne({ where: { user_id: req.user_id } }).then((obj) => {
    if (obj) {
      obj.update(req);
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
  const dest = await Destinations.findAll({});
  const prefObj = tripPrefs[0].dataValues;
  res.send(generatePlaces(prefObj, dest));
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

// Gets the users from the db who are not the current user
const getOtherUsers = async (req, res) => {
  const inviteThem = await User.findAll({
    where: { [Op.not]: [{ googleId: req.currentUser }] },
  });
  res.send(inviteThem);
};

// putting tip proposal into the db
const enterProposal = async (req) => {
  let city1;
  let city2;
  let city3;
  await Destinations.findOne({ where: { city: req.destination_A_id } }).then(
    (response) => {
      city1 = response;
    },
  );
  await Destinations.findOne({ where: { city: req.destination_B_id } }).then(
    (response) => {
      city2 = response;
    },
  );
  await Destinations.findOne({ where: { city: req.destination_C_id } }).then(
    (response) => {
      city3 = response;
    },
  );
  await TripProposal.findOne({ where: { trip_id: req.trip_id } }).then((obj) => {
    if (obj) {
      obj.update({
        user_id: req.user_id,
        trip_id: req.trip_id,
        destination_A_id: city1.dataValues.id,
        destination_B_id: city2.dataValues.id,
        destination_C_id: city3.dataValues.id,
      });
    } else {
      TripProposal.create({
        user_id: req.user_id,
        trip_id: req.trip_id,
        destination_A_id: city1.dataValues.id,
        destination_B_id: city2.dataValues.id,
        destination_C_id: city3.dataValues.id,
      });
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
  enterProposal,
  getOtherUsers,
};
