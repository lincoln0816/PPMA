const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Adjust path as needed

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

// Define associations if needed
// For example, if a Project has many Tasks:
// Project.hasMany(Task, { foreignKey: 'projectId' });

module.exports = { Project };
