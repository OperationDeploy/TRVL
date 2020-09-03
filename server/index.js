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
  grabPreferences,
  setDest,
  getSplit,
  addSplit,
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
    cb(null, 'photos');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('file');

// established axios connection to front end
// GET
app.get('/get', (req, res) => {
  res.send('HELLO WORLD');
});

app.get('/split/:trip/:user', (req, res) => {
  getSplit(req.params, res);
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
  grabPreferences(req, res);
});

app.post('/setDest', (req, res) => {
  setDest(req, res);
});

app.post('/photos', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(req.file.filename);
  });
});

app.use(express.static(DIST_DIR)); // NEW

// listening on localhost:3000
app.listen(PORT, () => {
  console.info(`App listening on port:${PORT}`);
});
