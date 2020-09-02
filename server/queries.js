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
  SplitItem,
  SplitOwedPayment
} = require('./db.js');

// create a user
const createUser = async (req, res) => {
  console.log('Data from post:', req.body);
  const user = await User.create(req.body);
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

module.exports = {
  createUser,
  addDestinations,
  addPreferences,
};
