const express = require('express');
const cors = require('cors');
const path = require('path');
const careerRoutes = require('./routes/careerRoutes');

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://development.d1dxdcfh1vnsex.amplifyapp.com', 'http://test-case-3-env.eba-zvhuder4.eu-west-2.elasticbeanstalk.com'];

// Enable CORS
app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Routes
app.use('/api', careerRoutes);

module.exports = app;