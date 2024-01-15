// 1. Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// 2. Create an express application
const app = express();

// 3. Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

// 4. Bypass CORS error
app.use(cors());

// 5. Storing all projects locally including descriptions essentially an object
const projects = {};

/**
 * 6. Route handler to send all courses
 */
app.get('/projects', (req, res) => {
  res.send(projects);
});

/**
 * 7. Route handler to handle all POST events
 * Destructure the data from the request body: type & data
 * Run 2 type checks -> associate the id & the posts & insert in the destructured data
 */
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'ProjectCreated') {
    const { id, name } = data;

    projects[id] = { id, name, descriptions: [] };
  }

  if (type === 'DescriptionCreated') {
    const { id, description, projectId } = data;

    const project = projects[projectId];

    project.descriptions.push({ id, description });
  }

  console.log(projects);

  res.send({});
});

// 8. Start the server & listen on port 4002
app.listen(4002, () => {
  console.log('Listening on port 4002...');
});
