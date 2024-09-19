const { Project } = require('../models/sequelize/Project');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

exports.createProject = async (req, res) => {
    const { title, description, taskCount } = req.body;
    try {
        const project = await Project.create({ title, description, taskCount });
        res.status(201).json(project);
    } catch (error) {
        console.error('Create Project Error:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      await project.destroy();
      res.status(204).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete project' });
    }
  };


  // Update an existing project
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, taskCount } = req.body;
    try {
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      project.title = title || project.title;
      project.description = description || project.description;
      project.taskCount = taskCount || project.taskCount;
      await project.save();
  
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update project' });
    }
  };
  