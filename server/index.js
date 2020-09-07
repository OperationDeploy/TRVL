require('dotenv').config();
// import db
const express = require('express');
const path = require('path'); // NEW
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const {
  createUser,
  addPreferences,
  planTrip,
  removeInvite,
  grabPlaces,
  setDest,
  getTripNames,
  getOtherUsers,
  enterProposal,
  getSplit,
  getMyInvites,
  addSplit,
  getAllTrips,
  getTripForFlight,
  tripUser,
  inviteAllOtherUsers,
  getPhotos,
  addPhoto,

} = require('./queries.js');

const app = express();
const { PORT } = process.env;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW

// parse application/json
app.use(bodyParser.json());
app.use(cors());

/** ************************************************** */

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('file');

// established axios connection to front end
// GET

// gets the users who aren't the current user from the db
app.get('/inviteUsers', (req, res) => {
  getOtherUsers(req.query, res);
});

app.get('/split/:trip/:user', (req, res) => {
  getSplit(req.params, res);
});

app.get('/getInvites', (req, res) => {
  getMyInvites(req.query, res);
});

app.get('/photos/:trip', (req, res) => {
  getPhotos(req.params, res);
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

app.post('/split', (req, res) => {
  addSplit(req.body, res);
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

app.post('/photos', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    addPhoto(req, res);
  });
});

app.post('/getAllTrips', (req, res) => {
  getAllTrips(req, res);
});

app.post('/getTripForFlight', (req, res) => {
  getTripForFlight(req, res);
});

app.post('/tripUser', (req, res) => {
  tripUser(req.body, res);
});

app.post('/inviteAllOtherUsers', (req, res) => {
  inviteAllOtherUsers(req.body, res);
});

app.post('/tripNames', (req, res) => {
  getTripNames(req.body, res);
});

app.post('/removeInvite', (req, res) => {
  removeInvite(req.body, res);
});

app.use(express.static('public'));

app.use(express.static(DIST_DIR)); // NEW

app.listen(PORT, () => {
  console.info(`App listening on port:${PORT}`);
});
