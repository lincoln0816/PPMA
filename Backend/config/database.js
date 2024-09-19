const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_URI);

sequelize.authenticate()
  .then(() => console.log('MySQL connected'))
  .catch(err => console.error('MySQL connection error:', err));

module.exports = sequelize;
