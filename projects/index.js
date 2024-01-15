// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

// Create an express application
const app = express();

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

// Bypass CORS error
app.use(cors());

// Create a projects data structure to store all projects
const projects = {};

/**
 * Route handler endpoint to GET all projects
 */
app.get('/projects', (req, res) => {
  res.send(projects);
});

/**
 * Route handler endpoint to create a project via client submission
 * Generates a new project id via randomBytes
 * Extract the name from the request body
 * Assigns to projects data structure with the id the id & name
 * Await & Async post to event bus when a new project is created
 */
app.post('/projects', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { name } = req.body;

  projects[id] = {
    id, name
  };

  await axios.post('http://localhost:4005/events', {
    type: 'ProjectCreated',
    data: {
      id, name
    }
  });

  res.status(201).send(projects[id]);
});

/**
 * Route handler to post it received an event and respond with a status of OK
 * Respond via 2 parameters: received event & request body type
 */
app.post('/events', (req, res) => {
  console.log('Received event.', req.body.type);

  res.send({});
});

// Start the server & start listening on port 4000
app.listen(4000, () => {
  console.log('Listening on port 4000...');
});
