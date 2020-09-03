require('dotenv').config();

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

// get user trips
const getUserTrips = async (id) => {
  const userPrefs = await TripPreferences.findAll({
    where: {
      user_id: id,
    },
  })
    .then((data) => { 
      console.log("success!", data.get({ plain: true }));
      const userTrips = Trip.findAll({
        // where: {
        //   id: data[dataValues][trip_id]
        // }
      });
    })
    .catch(() => {console.error("ERORRRRRRRR")});
};

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

module.exports = {
  createUser,
  addDestinations,
  addPreferences,
  planTrip,
  getUserTrips,
  grabPreferences,
};
