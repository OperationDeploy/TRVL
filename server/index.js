require('dotenv').config();
// import db
const { sequelize } = require('./db.js');
const express = require('express');
const path = require('path'); // NEW
const bodyParser = require('body-parser');
const { pool, createUser } = require('./queries.js');

const app = express();
const { PORT, DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

pool.connect().then(() => console.log('Connected to DB'));

// parse application/json
app.use(bodyParser.json());

/*****************************************************/
// established database connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Successful DB connection!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
/*****************************************************/

// established axios connection to front end
// GET
app.get('/get', (req, res) => {
  res.send('HELLO WORLD');
});

//POST
app.post('/post', (req, res) => {
  createUser(req, res);
});






/*****************************************************/

app.use(express.static(DIST_DIR)); // NEW

// listening on localhost:3000
app.listen(PORT, function () {
  console.log(`App listening on port:${PORT}`);
});

