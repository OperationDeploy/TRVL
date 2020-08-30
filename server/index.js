require('dotenv').config();
// import db
const { sequelize } = require('./db.js');
const express = require('express');
const path = require('path'); // NEW
const bodyParser = require('body-parser');

const app = express();
const { PORT } = process.env;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

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
  console.log('Data from post:', req.body.data);
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
