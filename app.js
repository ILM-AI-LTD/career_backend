const express = require('express');
const path = require('path');
const careerRoutes = require('./routes/careerRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use('/api', careerRoutes);

module.exports = app;