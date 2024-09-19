// controllers/taskController.js
const Task = require('../models/mongoose/Task');
const { Project } = require('../models/sequelize/Project');

console.log('Project Model:', Project);

exports.getTasksByProjectId = async (req, res) => {
    const { id } = req.params;
    console.log('Fetching tasks for project ID:', id);

    try {
        if (!Project) {
            console.error('Project model is not defined.');
            return res.status(500).json({ error: 'Internal server error' });
        }

        const project = await Project.findByPk(id);
        if (!project) {
            console.log('Project not found:', id);
            return res.status(404).json({ error: 'Project not found' });
        }

        const tasks = await Task.find({ projectId: id });
        console.log('Tasks fetched:', tasks);
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};


exports.addTaskToProject = async (req, res) => {
    console.log(req.body);
    const { id } = req.params; // Project ID
    const { title, description, status, dueDate } = req.body;

    // Validate input
    if (!title || !description || !status || !dueDate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
    
        // Create new task
        const task = await new Task({ title, description, status, dueDate, projectId: id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Failed to add task' });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params; // This is the `id` sent from the frontend
    if (!id) {
        return res.status(400).json({ error: "Task ID is missing." });
    }
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json({ success: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};
