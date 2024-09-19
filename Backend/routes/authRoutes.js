const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');


// @route POST api/register
// @desc Register user
router.post('/register', authController.registerUser);

// @route POST api/login
// @desc Authenticate user & get token
router.post('/login', authController.loginUser);

// Protecting the '/verify' route with the middleware
router.post('/verify', verifyToken, (req, res) => {
    // If token is valid, send success response
    res.json({ msg: 'Token is valid', user: req.user });
  });
  
module.exports = router;
