const nodemailer = require('nodemailer');
const config = require('./env');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'recruitment@ilm-ai-ltd.com',
    pass: process.env.EMAIL_PASS || 'clnkzyygsiycwuzy'
  }
});

module.exports = transporter;