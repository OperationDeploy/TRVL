/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
require('dotenv').config();
const { Op } = require('sequelize');
const { getFlightsInfo } = require('./flights');
const { getWeather, compareISODates } = require('./weather');
const { getHotelsInfo } = require('./hotels');

const { generatePlaces } = require('./algo.js');
const {
  User,
  Trip,
  TripUser,
  TripPreferences,
  Destinations,
  SplitItem,
  TripProposal,
  SplitOwedPayment,
  TripProposalVotes,
  TripPhoto,
  TripItinerary,
  Message,
} = require('./db.js');

// create a user
const createUser = async (req, res) => {
  let user = await User.findOne({ where: { googleId: req.body.googleId } });
  if (user === null) {
    user = await User.create(req.body);
  }
  res.send(user);
};

// destinations - dummy data

const addDestinations = () => {
  Destinations.create({});
};

// add preferences
// TODO: need to come back and find where trip_id is = correct trip_id
const addPreferences = (req, res) => {
  const pref = TripPreferences.findOne({
    where: { user_id: req.user_id, trip_id: req.trip_id },
  })
    .then((obj) => {
      if (obj) {
        obj.update({
          user_id: req.user_id,
          trip_id: req.trip_id,
          temperature: req.temperature,
          city_expenses: req.city_expenses,
          landscape: req.landscape,
          city_type: req.city_type,
          proximity: req.proximity,
          group_age: req.group_age,
          group_relationship: req.group_relationship,
          phoneNumber: req.phoneNumber,
        });
      } else {
        TripPreferences.create({
          user_id: req.user_id,
          trip_id: req.trip_id,
          temperature: req.temperature,
          city_expenses: req.city_expenses,
          landscape: req.landscape,
          city_type: req.city_type,
          proximity: req.proximity,
          group_age: req.group_age,
          group_relationship: req.group_relationship,
          phoneNumber: req.phoneNumber,
        });
      }
    })
    .catch((err) => console.warn(err));

  res.send(pref);
};

const addSplit = async (req, res) => {
  const purchaserId = req.purchaser_id;
  const tripId = req.trip_id;
  const { price } = req;
  const item = await SplitItem.create(req);
  let users = await TripUser.findAll({
    where: { trip_id: tripId, user_id: { [Op.ne]: purchaserId } },
    raw: true,
  });
  const amount = price / (users.length + 1);
  const userObjs = users.map((user) => ({
    ower_id: user.user_id,
    recipient_id: purchaserId,
    amount,
    trip_id: tripId,
    item_id: item.id,
  }));
  await Promise.all(userObjs.map((user) => SplitOwedPayment.create(user)));
  users = users.map((user) =>
    User.findOne({ where: { googleId: user.user_id }, raw: true }),
  );
  await Promise.all(users).then((result) => {
    users = result;
  });
  res.send(
    userObjs.map((user, i) => ({
      first_name: users[i].first_name,
      last_name: users[i].last_name,
      amount,
    })),
  );
};

const deleteSplit = async (req, res) => {
  const id = req.params.itemId;
  await SplitItem.destroy({ where: { id } });
  await SplitOwedPayment.destroy({ where: { item_id: id } });
  res.sendStatus(200);
};

const getSplit = async ({ trip, user }, res) => {
  const response = {};
  let items = await SplitItem.findAll({ where: { trip_id: trip }, raw: true });
  let users = items.map((item) =>
    User.findOne({
      where: { googleId: item.purchaser_id },
      raw: true,
    }),
  );
  await Promise.all(users).then((result) => {
    users = result;
  });

  items = items.map((item, i) => {
    const newItem = item;
    newItem.purchaser = users[i].first_name;
    return newItem;
  });
  const payments = await SplitOwedPayment.findAll({
    where: { trip_id: trip, recipient_id: user },
    raw: true,
  });
  users = payments.map((payment) =>
    User.findOne({
      where: { googleId: payment.ower_id },
      raw: true,
    }),
  );
  await Promise.all(users).then((result) => {
    users = result;
  });
  const debts = {};
  payments.forEach((payment, i) => {
    const name = `${users[i].first_name} ${users[i].last_name}`;
    debts[name] = debts[name] ? debts[name] + payment.amount : payment.amount;
  });
  response.items = items;
  response.debts = debts;
  res.send(response);
};

// grab preferences
const grabPlaces = async (req, res) => {
  const tripPrefs = await TripPreferences.findAll({
    where: { trip_id: req.body.trip_id },
  });
  const dest = await Destinations.findAll({});
  const prefObj = tripPrefs[0].dataValues;
  res.send(generatePlaces(prefObj, dest));
};

// add planned trip
const planTrip = async (req, res) => {
  const trip = await Trip.create(req);
  res.send(trip);
};

const setDest = async (req) => {
  const destinations = await Destinations.findAll({});
  let code;
  for (let place = 0; place < destinations.length; place += 1) {
    const dest = destinations[place].city.substr(
      0,
      destinations[place].city.indexOf(','),
    );
    if (dest === req.body.destination) {
      code = destinations[place].airport_code;
    }
  }

  Trip.findOne({ where: { id: req.body.trip_id } }).then((obj) => {
    if (obj) {
      obj.update({ destination: req.body.destination, airport_code: code });
    }
  });
};

const getPhotos = async ({ trip }, res) => {
  const photos = await TripPhoto.findAll({
    where: { trip_id: trip },
    raw: true,
    order: [['createdAt', 'DESC']],
  });
  let users = photos.map((photo) =>
    User.findOne({
      where: { googleId: photo.user_id },
      raw: true,
    }),
  );
  await Promise.all(users).then((results) => {
    users = results;
  });
  res.send(
    photos.map((photo, i) => ({
      ...photo,
      userName: `${users[i].first_name} ${users[i].last_name}`,
    })),
  );
};

const addPhoto = async ({ files, body }, res) => {
  const { user, trip } = body;
  let photos = files.map((photo) =>
    TripPhoto.create({
      user_id: user,
      trip_id: trip,
      photo_link: photo.filename,
    }),
  );
  await Promise.all(photos).then((response) => {
    photos = response;
  });
  res.send(photos);
};

const getAllTrips = async (req, res) => {
  const tripIds = await TripUser.findAll({ where: { user_id: req.body.user_id } });
  let trips = tripIds.map((item) => Trip.findByPk(item.trip_id));
  await Promise.all(trips).then((response) => {
    trips = response;
  });
  res.send(trips);
};

// Gets the users from the db who are not the current user
const getOtherUsers = async (req, res) => {
  const inviteThem = await User.findAll({
    where: { [Op.not]: [{ googleId: req.currentUser }] },
  });
  res.send(inviteThem);
};

// putting tip proposal into the db
const enterProposal = async (req) => {
  let city1;
  let city2;
  let city3;
  await Destinations.findOne({ where: { city: req.destination_A_id } }).then(
    (response) => {
      city1 = response;
    },
  );
  await Destinations.findOne({ where: { city: req.destination_B_id } }).then(
    (response) => {
      city2 = response;
    },
  );
  await Destinations.findOne({ where: { city: req.destination_C_id } }).then(
    (response) => {
      city3 = response;
    },
  );
  await TripProposal.findOne({ where: { trip_id: req.trip_id } }).then((obj) => {
    if (obj) {
      obj.update({
        user_id: req.user_id,
        trip_id: req.trip_id,
        destination_A_id: city1.dataValues.id,
        destination_B_id: city2.dataValues.id,
        destination_C_id: city3.dataValues.id,
      });
    } else {
      TripProposal.create({
        user_id: req.user_id,
        trip_id: req.trip_id,
        destination_A_id: city1.dataValues.id,
        destination_B_id: city2.dataValues.id,
        destination_C_id: city3.dataValues.id,
      });
    }
  });
};

const tripUser = async (req, res) => {
  const addUser = await TripUser.create({
    user_id: req.currentUser.googleId || req.currentUser.user_id,
    trip_id: req.trip_id,
  }).catch((err) => console.warn(err, 'ERRRRRRRR!!@#$'));

  res.send(addUser);
};

const inviteAllOtherUsers = async (req, res) => {
  const inviteThem = await User.findAll({
    where: { [Op.not]: [{ googleId: req.currentUser }] },
    raw: true,
  });
  const inviteEm = inviteThem.forEach((user) => {
    TripProposalVotes.create({
      user_id: user.googleId,
      trip_id: req.trip,
    }).catch((err) => console.warn(err));
  });
  res.send(inviteEm);
};

const getMyInvites = async (req, res) => {
  const invites = await TripProposalVotes.findAll({
    where: { user_id: req.googleId },
  }).catch((err) => console.warn(err));

  res.send(invites);
};

const getTripNames = async (req, res) => {
  const invitedTrips = [];
  await Promise.all(
    req.myInvites.map(async (invite) => {
      const invitedTrip = await Trip.findOne({ where: { id: invite.trip_id } });
      invitedTrips.push(invitedTrip);
    }),
  );
  res.send(invitedTrips);
};

const removeInvite = async (req, res) => {
  const remove = await TripProposalVotes.destroy({
    where: { user_id: req.user, trip_id: req.trip_id },
  }).catch((err) => console.warn(err));
  res.send(remove);
};

const addActivity = async (req, res) => {
  let activity = await TripItinerary.findOne({
    where: {
      trip_id: req.trip_id,
      event: req.event,
      day: req.day,
    },
  });

  if (activity === null) {
    activity = await TripItinerary.create({
      user_id: req.user_id,
      trip_id: req.trip_id,
      event: req.event,
      day: req.day,
    });
    res.send(activity.dataValues);
  }
};

const getTripActivities = async (req, res) => {
  const tripActivities = await TripItinerary.findAll({
    where: {
      trip_id: req.trip,
    },
  });

  res.status(200).send(tripActivities);
};

const deleteActivity = async (req) => {
  await TripItinerary.destroy({
    where: {
      user_id: req.user_id,
      trip_id: req.trip_id,
      event: req.event,
      day: req.day,
    },
  });
};

const getWeatherForTrip = async (req, res) => {
  const trip = await Trip.findByPk(req.trip);
  getWeather([trip])
    .then((response) => res.send(response))
    .catch((err) => console.warn(err));
};

const getMessages = async (req, res) => {
  const messages = await Message.findAll({ where: { trip_id: req.body.trip_id } });

  res.send(messages);
};

const postMessages = async (req, res) => {
  const msg = await Message.create({
    text: req.body.text,
    author: req.body.author,
    time: req.body.time,
    unread: true,
    user_google_id: req.body.user_google_id,
    trip_id: req.body.trip_id,
  });
  res.send(msg);
};

const getPhone = (req, res) => {
  User.findOne({ where: { googleId: req.googleId, phoneNumber: { [Op.not]: null } } })
    .then((response) => res.send(response))
    .catch((err) => console.warn(err));
};

const addPhone = async (req, res) => {
  const num = `+1${req.phone}`;
  await User.update(
    { phoneNumber: num },
    { where: { googleId: req.currentUser.googleId } },
  )
    .then((response) => {
      res.send(response);
    })
    .catch((err) => console.warn(err));
};

const getAllOtherUsers = async (req, res) => {
  const inviteThem = await User.findAll({
    where: { [Op.not]: [{ googleId: req.currentUser }] },
  });
  res.send(inviteThem);
};

const inviteSelectedUser = async (req, res) => {
  const selected = await TripProposalVotes.findOne({
    where: { user_id: req.user.googleId, trip_id: req.trip },
  })
    .then((response) => {
      if (response === null) {
        TripProposalVotes.create({
          user_id: req.user.googleId,
          trip_id: req.trip,
        });
      }
    })
    .catch((err) => console.warn(err));
  res.send(selected);
};

const getFlights = async (req, res) => {
  const flightsInfo = await getFlightsInfo(req, res);
  res.send(flightsInfo);
};

const getHotels = async (req, res) => {
  const hotelsInfo = await getHotelsInfo(req, res);
  res.send(hotelsInfo);
};

const getFullTrip = async (req, res) => {
  // console.info(req, 'REQ');
  const trip = await Trip.findOne({
    where: { id: req.body.id },
  });
  // console.info('trip found', trip);

  res.send(trip);
};

const setRead = async (req, res) => {
  const unreadMsg = await Message.findAll({
    where: { unread: true, [Op.not]: [{ user_google_id: req.currentUser.googleId }] },
  });
  const setReadMsg = unreadMsg.forEach((msg) => {
    msg.update({ unread: false });
  });
  res.send(setReadMsg);
};

const newMsgs = async (req, res) => {
  const tripsArr = [];
  await TripUser.findAll({ where: { user_id: req.currentUser.googleId } }).then(
    (response) => {
      response.forEach((trip) => {
        tripsArr.push(trip.dataValues.trip_id);
      });
    },
  );
  const findNew = await Message.findAll({
    where: {
      unread: true,
      user_google_id: { [Op.not]: req.currentUser.googleId },
      trip_id: { [Op.or]: tripsArr },
    },
  }).catch((err) => console.warn(err));
  res.send(findNew);
};

const getActiveWeather = async (req, res) => {
  const tripIds = await TripUser.findAll({ where: { user_id: req.user.googleId } });
  let trips = tripIds.map((item) => Trip.findByPk(item.trip_id));
  await Promise.all(trips).then((response) => {
    trips = response;
  });
  let trip = null;
  let nextTrip = null;
  for (let i = 0; i < trips.length; i += 1) {
    const toStart = compareISODates('today', trips[i].start_date);
    const toEnd = compareISODates('today', trips[i].end_date);
    if (toStart <= 0 && toEnd >= 0) {
      trip = trips[i];
      break;
    }
    if (!nextTrip || (toStart < compareISODates('today', nextTrip.start_date) && toStart >= 0)) {
      nextTrip = trips[i];
    }
  }
  if (trip || nextTrip) {
    const result = await getWeather([trip || nextTrip]);
    if (result) {
      const forecast = Object.keys(result[0].forecast).length <= 4 ? null : result[0].forecast;
      res.send({ ...result[0].dataValues, forecast, activeTrip: !!trip });
    } else {
      res.send(nextTrip);
    }
  } else {
    res.send(null);
  }
};

module.exports = {
  createUser,
  addDestinations,
  inviteSelectedUser,
  addPreferences,
  addSplit,
  getSplit,
  deleteSplit,
  planTrip,
  removeInvite,
  grabPlaces,
  setDest,
  enterProposal,
  getOtherUsers,
  getAllOtherUsers,
  getTripNames,
  getPhotos,
  getHotels,
  getAllTrips,
  getFlights,
  inviteAllOtherUsers,
  tripUser,
  getMyInvites,
  addPhoto,
  addActivity,
  getTripActivities,
  deleteActivity,
  getWeatherForTrip,
  getMessages,
  setRead,
  newMsgs,
  postMessages,
  addPhone,
  getPhone,
  getFullTrip,
  getActiveWeather,
};
