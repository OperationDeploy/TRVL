require('dotenv').config();
// import db
const express = require('express');
const socket = require('socket.io');
const path = require('path'); // NEW

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const {
  createUser,
  addPreferences,
  inviteSelectedUser,
  getPhone,
  addPhone,
  planTrip,
  removeInvite,
  grabPlaces,
  setDest,
  getTripNames,
  getAllOtherUsers,
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
  getWeatherForTrip,
  getMessages,
  postMessages,
} = require('./queries.js');

const app = express();
const { PORT } = process.env;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW

// parse application/json
app.use(bodyParser.json());
app.use(cors());

/** SOCKET.IO - CHAT ROOM CONNECTIONS* */
const server = app.listen(8080, () => {
  console.info('socket server running on 8080');
});

const io = socket(server);

io.on('connection', (sock) => {
  sock.on('SEND_MESSAGE', (data) => {
    io.emit('RECEIVE_MESSAGE', data);
  });
});

/** ************************************************** */

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).array('file', 10);

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

app.get('/weather/:trip', async (req, res) => {
  getWeatherForTrip(req.params, res);
});

app.get('/phone', (req, res) => {
  getPhone(req.query, res);
});

app.get('/inviteUsers', (req, res) => {
  getAllOtherUsers(req.query, res);
});

// POST

app.post('/inviteTheUser', (req, res) => {
  inviteSelectedUser(req.body, res);
});

app.post('/addPhoneNumber', (req, res) => {
  addPhone(req.body, res);
});

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

// get all messages for trip
app.post('/getMessages', (req, res) => {
  getMessages(req, res);
});
// post message
app.post('/postMessages', (req, res) => {
  postMessages(req, res);
});
// Twilio
// TODO: comment back in and take out console log when demoing
app.post('/sendTwilio', (req, res) => {
  console.info(req, res, client, TWILIO_PHONE_NUMBER);
  // res.header('Content-Type', 'application/json');
  // client.messages
  //   .create({
  //     from: TWILIO_PHONE_NUMBER,
  //     to: req.body.user.phoneNumber,
  //     body: 'Hey you have a new trip invite in Trvl! Login to view it!',
  //   })
  //   .then(() => {
  //     res.send(JSON.stringify({ success: true }));
  //   })
  //   .catch((err) => {
  //     console.warn('ERR', err);
  //     res.send(JSON.stringify({ success: false }));
  //   });
});

app.use(express.static('public'));

app.use(express.static(DIST_DIR)); // NEW

app.listen(PORT, () => {
  console.info(`App listening on port:${PORT}`);
});
