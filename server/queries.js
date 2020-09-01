require('dotenv').config();

const { User } = require('./db.js');

// create a user
const createUser = (req, res) => {
  const { firstName, lastName, email, profilePic, host } = req.body;
  console.log('Data from post:', req.body);

  User.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    profilePic: profilePic,
    host: host,
  });
};

module.exports = {
  createUser,
};
