const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const cors = require('cors');
require('dotenv').config();

// Import models here to ensure they are registered before sync
require('./models/sequelize/Project');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB and Mongoose setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};


connectDB();

// Sync models with the database
sequelize.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch(err => {
    console.error('Failed to synchronize models:', err);
  });


// Init MiddleWare
app.use(express.json({ extended: false }));

// Routes 
app.use('/api', require('./routes/api'));
app.use('/api', require('./routes/authRoutes'));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went Wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
