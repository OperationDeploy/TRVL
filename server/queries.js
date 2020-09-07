require('dotenv').config();
const { Op } = require('sequelize');

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
const addPreferences = (req) => {
  TripPreferences.findOne({ where: { user_id: req.user_id, trip_id: req.trip_id } }).then(
    (obj) => {
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
        });
      }
    },
  );
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
  users = users.map((user) => User.findOne({ where: { googleId: user.user_id }, raw: true }));
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

const getSplit = async ({ trip, user }, res) => {
  const response = {};
  let items = await SplitItem.findAll({ where: { trip_id: trip }, raw: true });
  let users = items.map((item) => User.findOne(
    { where: { googleId: item.purchaser_id }, raw: true },
  ));
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
  users = payments.map((payment) => User.findOne(
    { where: { googleId: payment.ower_id }, raw: true },
  ));
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
  let users = photos.map((photo) => User.findOne(
    { where: { googleId: photo.user_id }, raw: true },
  ));
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
  let photos = files.map((photo) => TripPhoto.create({
    user_id: user,
    trip_id: trip,
    photo_link: photo.filename,
  }));
  await Promise.all(photos).then((response) => { photos = response; });
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

const getTripForFlight = async (req, res) => {
  const getTrip = await Trip.findOne({
    where: { id: req.body.id, googleId: req.body.googleId },
  });
  res.send(getTrip);
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

const tripUser = async (req) => {
  await TripUser.create({
    user_id: req.currentUser.googleId || req.currentUser.user_id,
    trip_id: req.trip_id,
  }).catch((err) => console.warn(err, 'ERRRRRRRR!!@#$'));
};

const inviteAllOtherUsers = async (req) => {
  const inviteThem = await User.findAll({
    where: { [Op.not]: [{ googleId: req.currentUser }] },
    raw: true,
  });
  inviteThem.forEach((user) => {
    TripProposalVotes.create({
      user_id: user.googleId,
      trip_id: req.trip,
    }).catch((err) => console.warn(err));
  });
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

const removeInvite = async (req) => {
  await TripProposalVotes.destroy({
    where: { user_id: req.user, trip_id: req.trip_id },
  }).catch((err) => console.warn(err));
};

module.exports = {
  createUser,
  addDestinations,
  addPreferences,
  addSplit,
  getSplit,
  planTrip,
  removeInvite,
  grabPlaces,
  setDest,
  enterProposal,
  getOtherUsers,
  getTripNames,
  getPhotos,
  getAllTrips,
  getTripForFlight,
  inviteAllOtherUsers,
  tripUser,
  getMyInvites,
  addPhoto,
};
