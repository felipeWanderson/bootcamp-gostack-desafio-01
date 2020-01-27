const express = require('express');

const server = express();
server.use(express.json());

const projects = [];

function checkProjetExists(req, res, next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if(!project){
    return res.status(400).json({ error: "Projeto não Existe!"});
  }

  return next();
}

function logRequest(req, res, next){
  console.count("Requisções")

  return next();
}

server.use(logRequest);

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

server.put('/projects/:id', checkProjetExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;
  return res.json(project);
});

server.delete('/projects/:id', checkProjetExists, (req, res) => {
  const { id } = req.params;

  const idProject = projects.findIndex(p => p.id == id);
  projects.splice(idProject, 1);
  return res.send();
});

server.post('/projects/:id/tasks',checkProjetExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  
  project.task.push(title);

  return res.json(project);
});


server.listen(3333);