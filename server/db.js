require('dotenv').config();
const Sequelize = require('sequelize');

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.info('Successful DB connection!');
  })
  .catch((err) => {
    console.warn(err);
  });

/// need to seed into db

const User = sequelize.define('User', {
  first_name: Sequelize.TEXT,
  last_name: Sequelize.TEXT,
  profile_pic: Sequelize.TEXT,
  email: {
    type: Sequelize.TEXT,
    unique: true,
  },
  host: Sequelize.BOOLEAN,
  googleId: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  },
  phoneNumber: Sequelize.TEXT,
});

const Trip = sequelize.define('Trip', {
  name: Sequelize.TEXT,
  destination: Sequelize.TEXT,
  start_date: Sequelize.DATE,
  end_date: Sequelize.DATE,
  departure_city: Sequelize.TEXT,
  airport_code: {
    type: Sequelize.TEXT,
    references: {
      model: 'destinations',
      key: 'airport_code',
    },
  },
  googleId: {
    type: Sequelize.TEXT,
    references: {
      model: 'user',
      key: 'googleId',
    },
  },
});

const TripUser = sequelize.define('TripUser', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'trip',
      key: 'id',
    },
  },
});

const TripPreferences = sequelize.define(
  'TripPreferences',
  {
    user_id: {
      type: Sequelize.TEXT,
      references: {
        model: 'user',
        key: 'googleId',
      },
    },
    trip_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'trip',
        key: 'id',
      },
    },
    temperature: Sequelize.INTEGER,
    city_expenses: Sequelize.INTEGER,
    landscape: Sequelize.INTEGER,
    city_type: Sequelize.INTEGER,
    proximity: Sequelize.INTEGER,
    group_age: Sequelize.INTEGER,
    group_relationship: Sequelize.INTEGER,
  },
  {
    timestamps: false,
  },
);

const TripPhoto = sequelize.define('TripPhoto', {
  user_id: {
    type: Sequelize.TEXT,
    references: {
      model: 'user',
      key: 'googleId',
    },
  },
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'trip',
      key: 'id',
    },
  },
  photo_link: Sequelize.INTEGER,
});

const TripProposal = sequelize.define('TripProposal', {
  user_id: {
    type: Sequelize.TEXT,
    references: {
      model: 'user',
      key: 'googleId',
    },
  },
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'trip',
      key: 'id',
    },
  },
  destination_A_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'destinations',
      key: 'id',
    },
  },
  destination_B_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'destinations',
      key: 'id',
    },
  },
  destination_C_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'destinations',
      key: 'id',
    },
  },
});

const TripItinerary = sequelize.define('TripItinerary', {
  user_id: {
    type: Sequelize.TEXT,
    references: {
      model: 'user',
      key: 'googleId',
    },
  },
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'trip',
      key: 'id',
    },
  },
  event: Sequelize.TEXT,
  day: Sequelize.DATE,
});

const TripProposalVotes = sequelize.define('TripProposalVotes', {
  user_id: {
    type: Sequelize.TEXT,
    references: {
      model: 'user',
      key: 'googleId',
    },
  },
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'trip',
      key: 'id',
    },
  },
  destination: Sequelize.INTEGER,
});

const Destinations = sequelize.define('Destinations', {
  city: Sequelize.TEXT,
  temperature: Sequelize.INTEGER,
  city_expenses: Sequelize.INTEGER,
  landscape: Sequelize.INTEGER,
  city_type: Sequelize.INTEGER,
  proximity: Sequelize.INTEGER,
  group_age: Sequelize.INTEGER,
  group_relationship: Sequelize.INTEGER,
  airport_code: Sequelize.TEXT,
});

const SplitItem = sequelize.define('SplitItem', {
  purchaser_id: Sequelize.INTEGER,
  description: Sequelize.TEXT,
  price: Sequelize.FLOAT,
  trip_id: Sequelize.INTEGER,
});

const SplitOwedPayment = sequelize.define('SplitOwedPayment', {
  ower_id: Sequelize.INTEGER,
  recipient_id: Sequelize.INTEGER,
  amount: Sequelize.FLOAT,
  trip_id: Sequelize.INTEGER,
  item_id: Sequelize.INTEGER,
});

const Message = sequelize.define('Message', {
  text: Sequelize.TEXT,
  author: Sequelize.TEXT,
  user_google_id: {
    type: Sequelize.TEXT,
    references: {
      model: 'user',
      key: 'googleId',
    },
  },
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'trip',
      key: 'id',
    },
  },
});

module.exports = {
  User,
  Trip,
  TripUser,
  TripPreferences,
  TripPhoto,
  TripProposal,
  TripItinerary,
  TripProposalVotes,
  Destinations,
  SplitItem,
  SplitOwedPayment,
  Message,
  sequelize,
};
