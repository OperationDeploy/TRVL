require('dotenv').config();

const { PORT, DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

/*****************************************************/
// const format = require('pg-format');
// pool connection to db
const { Pool } = require('pg');
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: 5432,
});

// create a user
const createUser = (req, res) => {
  const { firstName, lastName, email, profilePic, host } = req.body;
  console.log('Data from post:', req.body);

  pool.query(
    'INSERT INTO "user" (first_name, last_name, email, profile_pic, host) VALUES ($1, $2, $3, $4, $5)',
    [firstName, lastName, email, profilePic, host],
    (error, result) => {
      if (error) {
        console.error(error);
      }
      console.log('Added data to user table successfully:', result);
    }
  );
};

module.exports = {
  pool,
  createUser,
};
