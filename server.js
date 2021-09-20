//!Setup Node js , Express , Cors, bodyParser
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
const { response } = require('express');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
projectData = {};

//! Spin up the server
const port = 3000;
app.listen(port, listening);

// Callback to debug
function listening() {
  console.log('server running');
  console.log(`running on localhost:${port}`);
}

//===================================================================//
//! Define Routes

//Callback function to complete GET '/all'
const getAll = function (req, res) {
  res.send(projectData);
};
// GET route
app.get('/all', getAll);

//Callback function to complete post '/addData'
const addData = function (req, res) {
  projectData = req.body;
  console.log(projectData);
  res.send(projectData);
};

// Post Route
app.post('/addData', addData);
