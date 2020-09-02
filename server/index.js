require('dotenv').config();
// import db
const express = require('express');
const path = require('path'); // NEW
const bodyParser = require('body-parser');

const { createUser, addPreferences, planTrip } = require('./queries.js');

const app = express();
const { PORT } = process.env;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW

// parse application/json
app.use(bodyParser.json());

/** ************************************************** */

// established axios connection to front end
// GET
app.get('/get', (req, res) => {
  res.send('HELLO WORLD');
});

// POST

// add preferences
app.post('/preferences', (req, res) => {
  console.log('preffff req body', req.body);
  addPreferences(req.body, res);
});

// plan a trip
app.post('/trips', (req, res) => {
  console.log('TRIPS req body', req.body);
  planTrip(req.body, res);
});

// add user
app.post('/login', (req, res) => {
  createUser(req, res);
});

app.use(express.static(DIST_DIR)); // NEW

// listening on localhost:3000
app.listen(PORT, () => {
  console.log(`App listening on port:${PORT}`);
});
