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
 */
app.post('/projects', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { name } = req.body;

  projects[id] = {
    id, name
  };

  // TODO: Event-Bus functionality

  res.status(201).send(projects[id]);
});

// Start the server & start listening on port 4000
app.listen(4000, () => {
  console.log('Listening on port 4000...');
});
