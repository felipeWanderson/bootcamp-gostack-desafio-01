const express = require('express');

const server = express();
server.use(express.json());

const projects = [];

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req,res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    task: []
  }

  projects.push(project);

  return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;
  return res.json(project);
});

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const idProject = projects.findIndex(p => p.id == id);
  projects.splice(idProject, 1);
  return res.send();
});

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  
  project.task.push(title);

  return res.json(project);
});
server.listen(3333);