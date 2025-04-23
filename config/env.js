require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  EMAIL_USER: process.env.EMAIL_USER || 'recruitment@ilm-ai-ltd.com',
  EMAIL_PASS: process.env.EMAIL_PASS || 'clnkzyygsiycwuzy',
  NODE_ENV: process.env.NODE_ENV || 'development'
};