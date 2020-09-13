require('dotenv').config();
const express = require('express');
const socket = require('socket.io');
const path = require('path');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER, COOKIE_KEY, PORT } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const multer = require('multer');
const cors = require('cors');
const auth = require('./passport/auth-routes');
const { getGasPrices } = require('./gas');
const { weatherUpdate } = require('./weather');

const {
  addPreferences,
  newMsgs,
  inviteSelectedUser,
  getPhone,
  addPhone,
  setRead,
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
  getFlights,
  tripUser,
  inviteAllOtherUsers,
  getPhotos,
  addPhoto,
  addActivity,
  getTripActivities,
  deleteActivity,
  getWeatherForTrip,
  getMessages,
  postMessages,
  getFullTrip,
} = require('./queries.js');

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/google');
  } else {
    next();
  }
};

const app = express();
app.use(cors());
const DIST_DIR = path.join(__dirname, '../dist'); // NEW

// parse application/json
app.use(bodyParser.json());

app.use(cookieSession({
  maxAge: 86400000,
  keys: [COOKIE_KEY],
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth);

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
app.get('/session', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send(null);
  }
});

// gets the users who aren't the current user from the db
app.get('/inviteUsers', authCheck, (req, res) => {
  getOtherUsers(req.query, res);
});

app.get('/split/:trip/:user', authCheck, (req, res) => {
  getSplit(req.params, res);
});

app.get('/getInvites', authCheck, (req, res) => {
  getMyInvites(req.query, res);
});

app.get('/photos/:trip', authCheck, (req, res) => {
  getPhotos(req.params, res);
});

// get all trip activities
app.get('/activities/:trip', authCheck, (req, res) => {
  getTripActivities(req.params, res);
});

app.get('/weather/:trip', authCheck, async (req, res) => {
  getWeatherForTrip(req.params, res);
});

app.get('/phone', authCheck, (req, res) => {
  getPhone(req.query, res);
});

app.get('/inviteUsers', authCheck, (req, res) => {
  getAllOtherUsers(req.query, res);
});

// POST

app.post('/newMsgs', authCheck, (req, res) => {
  newMsgs(req.body, res);
});

app.post('/inviteTheUser', authCheck, (req, res) => {
  inviteSelectedUser(req.body, res);
});

app.post('/addPhoneNumber', authCheck, (req, res) => {
  addPhone(req.body, res);
});

// add preferences
app.post('/preferences', authCheck, (req, res) => {
  addPreferences(req.body, res);
});

// plan a trip
app.post('/trips', authCheck, (req, res) => {
  planTrip(req.body, res);
});

app.post('/split', authCheck, (req, res) => {
  addSplit(req.body, res);
});

app.post('/grabPlaces', authCheck, (req, res) => {
  grabPlaces(req, res);
});

app.post('/setDest', authCheck, (req, res) => {
  setDest(req);
  res.send('Dest set');
});

app.post('/proposals', authCheck, (req, res) => {
  enterProposal(req.body);
  res.send('Proposal sent');
});

app.post('/photos', authCheck, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    addPhoto(req, res);
  });
});

app.post('/getFullTrip', authCheck, (req, res) => {
  getFullTrip(req, res);
});

app.post('/getAllTrips', authCheck, (req, res) => {
  getAllTrips(req, res);
});

app.post('/getFlights', authCheck, (req, res) => {
  getFlights(req, res);
});

app.post('/tripUser', authCheck, (req, res) => {
  tripUser(req.body, res);
});

app.post('/inviteAllOtherUsers', authCheck, (req, res) => {
  inviteAllOtherUsers(req.body, res);
});

app.post('/tripNames', authCheck, (req, res) => {
  getTripNames(req.body, res);
});

app.post('/activities', authCheck, (req, res) => {
  addActivity(req.body, res);
});

app.post('/removeInvite', authCheck, (req, res) => {
  removeInvite(req.body, res);
});

app.delete('/activity', authCheck, (req, res) => {
  deleteActivity(req.query, res);
});

// get all messages for trip
app.post('/getMessages', authCheck, (req, res) => {
  getMessages(req, res);
});
// post message
app.post('/postMessages', authCheck, (req, res) => {
  postMessages(req, res);
});

// Twilio
// TODO: comment back in and take out console log when demoing
app.post('/sendTwilio', authCheck, (req, res) => {
  console.info(req.body, TWILIO_PHONE_NUMBER);
  res.send('We are not using twilio until we present our final app');
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

app.post('/gas', authCheck, async (req, res) => {
  const { trip, car } = req.body;
  const result = await getGasPrices(trip, car);
  res.send(result);
});

app.post('/setUnread', (req, res) => {
  setRead(req.body, res);
});

app.get('/weatherUpdate', (req, res) => {
  weatherUpdate();
  res.sendStatus(200);
});

setInterval(weatherUpdate, 43200000);

app.use(express.static('public'));
app.use('/', express.static(DIST_DIR));

app.listen(PORT, () => {
  console.info(`App listening on port:${PORT}`);
});

module.exports = {
  client,
};
