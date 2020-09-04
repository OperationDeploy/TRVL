require('dotenv').config();
// import db
const express = require('express');
const path = require('path'); // NEW
const bodyParser = require('body-parser');

const {
  createUser,
  addPreferences,
  planTrip,
  grabPlaces,
  setDest,
  getOtherUsers,
  enterProposal,
  getAllTrips,
} = require('./queries.js');

const app = express();
const { PORT } = process.env;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW

// parse application/json
app.use(bodyParser.json());

/** ************************************************** */

// established axios connection to front end
// GET

// gets the users who aren't the current user from the db
app.get('/inviteUsers', (req, res) => {
  getOtherUsers(req.query, res);
});

// POST

// add preferences
app.post('/preferences', (req, res) => {
  addPreferences(req.body, res);
});

// plan a trip
app.post('/trips', (req, res) => {
  planTrip(req.body, res);
});

// add user
app.post('/login', (req, res) => {
  createUser(req, res);
});

app.post('/grabPlaces', (req, res) => {
  grabPlaces(req, res);
});

app.post('/setDest', (req, res) => {
  setDest(req, res);
});

app.post('/proposals', (req, res) => {
  enterProposal(req.body, res);
});

app.post('/getAllTrips', (req, res) => {
  getAllTrips(req, res);
});

app.use(express.static(DIST_DIR)); // NEW

// listening on localhost:3000
app.listen(PORT, () => {
  console.info(`App listening on port:${PORT}`);
});
