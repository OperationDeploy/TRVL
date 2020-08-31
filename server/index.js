require('dotenv').config();
// import db
const { sequelize } = require('./db.js');
const express = require('express');
const path = require('path'); // NEW
const bodyParser = require('body-parser');

const app = express();
const { PORT, DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

/*****************************************************/
const format = require('pg-format');
// pool connection to db
const Pool = require('pg').Pool;
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: 5432,
});

// parse application/json
app.use(bodyParser.json());

/*****************************************************/
// established database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Successful DB connection!');
  })
  .catch((err) => {
    console.log(err);
  });
/*****************************************************/

// established axios connection to front end
// GET
app.get('/get', (req, res) => {
  res.send('HELLO WORLD');
});

//POST
app.post('/post', (req, res) => {
  const { firstName, lastName, email, profilePic, host } = req.body;
  console.log('Data from post:', req.body);

  const addUser = format(
    'INSERT INTO user(first_name, last_name, email, profile_pic, host) VALUES ($1, $2, $3, $4, $5)'
  );

  pool.query(
    addUser,
    [firstName, lastName, email, profilePic, host],
    (error, results) => {
      if (error) {
        console.error(error);
      }
      console.log(results);
    }
  );
});

/*****************************************************/

app.use(express.static(DIST_DIR)); // NEW

// listening on localhost:3000
app.listen(PORT, function () {
  console.log(`App listening on port:${PORT}`);
});

/***********************************************************************/
/*
  //these are no longer needed now that we connected front end w react:

// mock response for /api
  const mockResponse = {
    foo: 'bar',
    bar: 'foo',
  };

// sending JSON data for testing purposes
app.get('/api', (req, res) => {
  res.send(mockResponse);
});

// sending HTML FILE
app.get('/', (req, res) => {
 res.sendFile(HTML_FILE); // EDIT
 });

*/
