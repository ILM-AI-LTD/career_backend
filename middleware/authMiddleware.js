const jwt = require('jsonwebtoken');
const UserDao = require('../dao/user/userDao');
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        status: "error",
        message: 'Authentication token missing.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userDao = new UserDao();
    const user = await userDao.findByToken(decoded._id, token);

    if (!user) {
      return res.status(401).json({ 
        status: "error",
        message: 'User not found.'
      });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        status: "error",
        message: 'Invalid token.'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        status: "error",
        message: 'Token expired.'
      });
    }
    res.status(500).json({ 
      status: "error",
      message: 'Internal server error.'
    });
  }
};

module.exports = auth;
