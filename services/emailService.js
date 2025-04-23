const transporter = require('../config/mailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Load email templates
console.log('Loading email templates...');
const adminTemplate = fs.readFileSync(
  path.join(__dirname, '../templates/admin-email.html'), 
  'utf8'
);
const applicantTemplate = fs.readFileSync(
  path.join(__dirname, '../templates/applicant-email.html'), 
  'utf8'
);

const compileTemplate = (template, data) => {
  // Log template compilation
  console.log('Compiling email template with data...');
  const compiledTemplate = handlebars.compile(template);
  return compiledTemplate(data);
};

const sendEmails = async (applicationData, cvFile) => {
  try {
    // Log email preparation
    console.log('----------------------------------------');
    console.log('Preparing to send emails:');
    console.log(`  To Admin: ${process.env.EMAIL_USER}`);
    console.log(`  Applicant: ${applicationData.email}`);

    // Prepare email content
    const adminHtml = compileTemplate(adminTemplate, applicationData);
    
    // Configure email options
    console.log('Configuring email options...');
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Job Application - ${applicationData.jobPosition}`,
      html: adminHtml,
      attachments: []
    };

    // Add CV attachment if provided
    if (cvFile) {
      console.log('Attaching CV file...');
      mailOptions.attachments.push({
        filename: cvFile.originalname,
        content: cvFile.buffer
      });
    }

    // Send email
    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log('----------------------------------------');

    // Email to applicant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: applicationData.email,
      subject: 'Your Application Has Been Received',
      html: compileTemplate(applicantTemplate, applicationData)
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    console.log('----------------------------------------');
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmails };