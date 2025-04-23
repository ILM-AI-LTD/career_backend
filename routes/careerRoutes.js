const express = require('express');
const path = require('path'); 
const router = express.Router();
const careerController = require('../controller/careerController');
const fileUpload = require('../middleware/fileUpload');

router.get('/career-form', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/career-form.html'));
});

router.post('/submit-application', fileUpload.single('cv'), careerController.submitApplication);

module.exports = router;