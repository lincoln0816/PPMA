// models/mongoose/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: true
    },
    projectId: {
        type: String,  // Use String if IDs from MySQL are numbers or strings
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
