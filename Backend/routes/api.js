const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');

// Project routes
router.get('/projects', projectController.getAllProjects);
router.post('/projects', projectController.createProject);
router.delete('/projects/:id', projectController.deleteProject);
router.put('/projects/:id', projectController.updateProject);

// Task routes
router.get('/projects/:id/tasks', taskController.getTasksByProjectId);
router.post('/projects/:id/tasks', taskController.addTaskToProject);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
