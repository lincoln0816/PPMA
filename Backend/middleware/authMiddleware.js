const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'richardaskedmelikewhoisit'; // Use environment variables for security

// Middleware function to verify token
const verifyToken = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('x-auth-token');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user info to the request object
    req.user = decoded.user;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = { verifyToken };
