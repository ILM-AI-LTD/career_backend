const emailService = require('../services/emailService');
const validator = require('../validation/formValidator');

const submitApplication = async (req, res) => {
  try {
    // Log incoming request
    console.log('----------------------------------------');
    console.log('New application submission received:');
    console.log(`  Name: ${req.body.firstName} ${req.body.lastName}`);
    console.log(`  Email: ${req.body.email}`);
    console.log(`  Position: ${req.body.jobPosition}`);
    console.log(`  CV File: ${req.file ? req.file.originalname : 'No file uploaded'}`);
    
    // Validate form data
    console.log('Validating application data...');
    const validationResult = validator.validateApplication(req.body);
    
    if (!validationResult.isValid) {
      console.log('Validation failed:', validationResult.errors);
      return res.status(400).json({ success: false, errors: validationResult.errors });
    }
    console.log('Validation successful');

    // Send emails
    console.log('Sending confirmation emails...');
    const emailResult = await emailService.sendEmails(req.body, req.file);
    
    if (emailResult.success) {
      console.log('Emails sent successfully');
      console.log('----------------------------------------');
      res.status(200).json({ success: true, message: 'Application submitted successfully' });
    } else {
      console.log('Failed to send emails:', emailResult.error);
      console.log('----------------------------------------');
      res.status(500).json({ success: false, message: 'Failed to send emails' });
    }
  } catch (error) {
    console.error('Error in submitApplication:', error);
    console.log('----------------------------------------');
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { submitApplication };