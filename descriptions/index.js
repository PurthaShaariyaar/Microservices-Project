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

// Create a data structure to store all descriptions
const descriptionsByProjectId = {};

/**
 * Route handler to GET all descriptions by the project id
 * Either send all the descriptions or send an empty array
 */
app.get('/projects/:id/descriptions', (req, res) => {
  res.send(descriptionsByProjectId[req.params.id] || []);
});

/**
 * Route handler to create a description
 * Calls randomBytes to generate a random id for the new description
 * Extract the description in the request body
 * Either retrieve all descriptions or assign empty array to descriptions array
 * Push the new description with its id and description
 * Update the descriptionsByProjectId with the new descriptions associated with the id
 * Send a status of 201 with descriptions
 */
app.post('/projects/:id/descriptions', (req, res) => {
  const descriptionId = randomBytes(4).toString('hex');
  const { description } = req.body;

  const descriptions = descriptionsByProjectId[req.params.id] || [];

  descriptions.push({ id: descriptionId, description });

  descriptionsByProjectId[req.params.id] = descriptions;

  // TODO: Event-Bus functionality

  res.status(201).send(descriptions);
});

// Start the server and listen on port 4001
app.listen(4001, () => {
  console.log('Listening on port 4001...');
});
