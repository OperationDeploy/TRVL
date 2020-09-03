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
  const userTrips = await TripUser.findAll({
    where: {
      user_id: id,
    },
  });
  if(userTrips === null) {
    console.log("errrrrrr", userTrips);
  } else {
    console.log("success!!", userTrips);
  }
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
};
