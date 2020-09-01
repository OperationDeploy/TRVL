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
  const { firstName, lastName, email, profile_pic, host } = req.body;
  console.log('Data from post:', req.body);

  User.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    profile_pic: profile_pic,
    host: host,
  });
};

module.exports = {
  createUser,
};

// destinations - dummy data

const addDestinations = () => {
  Destinations.create({});
};
