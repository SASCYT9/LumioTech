const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lumio-forge-secret-key-2025');
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Будь ласка, авторизуйтесь' });
  }
};

// Optional auth - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lumio-forge-secret-key-2025');
      const user = await User.findById(decoded.userId);

      if (user) {
        req.user = user;
        req.token = token;
      }
    }
  } catch (error) {
    // Ignore auth errors in optional auth
  }

  next();
};

module.exports = { auth, optionalAuth };
