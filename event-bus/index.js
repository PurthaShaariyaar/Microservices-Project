// Import required modules
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

// Create an express application
const app = express();

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

// Create an array to store all events
const events = [];

/**
 * Route handler endpoint to post the event to all other services
 * Extract the event from the request body
 * Push the event into the events array
 * Each post includes a catch error block
 */
app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });

  // EXTREMELY IMPORTANT TODO QUERY SERVICE

  res.send({ status: 'OK' });
});

/**
 * Route handler to send all events
 */
app.get('/events', (req, res) => {
  res.send(events);
});

// Start the server and start listening on port 4005
app.listen(4005, () => {
  console.log('Listening on port 4005...');
});
