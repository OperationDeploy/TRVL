require('dotenv').config();
const Sequelize = require('sequelize');

const {
  DB_NAME, DB_USER, DB_PASS, DB_HOST,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 10000,
  },
});

/// need to seed into db
const User = sequelize.define('User', {
  firstName: Sequelize.TEXT,
  lastName: Sequelize.TEXT,
  profile_pic: Sequelize.TEXT,
  email: {
      type: Sequelize.TEXT,
      unique: true,
    },
  host: Sequelize.BOOLEAN,
});

module.exports = {
  sequelize,
};
