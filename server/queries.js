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
const createUser = (req, res) => {

  console.log('Data from post:', req.body);

  User.create(req.body);
};

// destinations - dummy data

const addDestinations = () => {
  Destinations.create({});
};

module.exports = {
  createUser,
  addDestinations,
};
