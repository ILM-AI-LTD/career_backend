// const nodeMailer = require('nodemailer');

// const html = `
// <h1>Hello World</h1>
// <p>This is a test email</p>
// <p>Thank you for using our service</p>
// <p>Best regards</p>
// <p>The Team</p>
// `;

// async function main() {
//   // Creating the email transporter with Outlook credentials
//   const transporter = nodeMailer.createTransport({
//     host: 'smtp-mail.outlook.com',    // Outlook's SMTP server
//     port: 587,                         // Port for TLS
//     secure: false,                     // false for TLS - requires STARTTLS
//     auth: {
//       user: 'raiyan.ashraf@ilmai.co.uk',  // Your Outlook email address
//       pass: '15987ilm2025!'  // Your password or app password
//     },
//     tls: {
//       ciphers: 'SSLv3',                // Required for Outlook
//       rejectUnauthorized: false        // Helps avoid certificate issues
//     }
//   });
  
//   // Defining the content and recipients of your email
//   const mailOptions = {
//     from: 'raiyan.ashraf@ilmai.co.uk',   // Sender address (must match auth user)
//     to: 'raiyanashraf20@gmail.com',      // Replace with the actual recipient's email
//     subject: 'Test Email from Node.js with Outlook',
//     text: 'Hello World. This is a test email sent via Outlook.',
//     html: html
//   };
  
//   try {
//     // Sending the email and waiting for the result
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully!');
//     console.log('Message ID:', info.messageId);
//   } catch (error) {
//     // If anything goes wrong, show the error
//     console.error('Error sending email:', error);
//     // More detailed error information for debugging
//     if (error.response) {
//       console.error('Server responded with:', error.response);
//     }
//   }
// }

// main();





const nodeMailer = require('nodemailer');

const html = `
<h1>Hello World</h1>
<p>This is a test email</p>
<p>Thank you for using our service</p>
<p>Best regards</p>
<p>The Team</p>
`;

async function main() {
  // Creating the email transporter with your Gmail credentials
  // The transporter handles the connection to Gmail's SMTP server
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,  // Using SSL
    auth: {
      user: 'recruitment@ilm-ai-ltd.com',  // Your Gmail address
      pass: 'clnkzyygsiycwuzy'  // Your App Password (without spaces)
    }
  });
  
  // Defining the content and recipients of your email
  const mailOptions = {
    from: 'recruitment@ilm-ai-ltd.com',  // Sender address (must match auth user)
    to: 'recruitment@ilm-ai-ltd.com',  // Replace with the actual recipient's email
    subject: 'Test Email from Node.js',  // Subject line
    text: 'Hello World. This is a test email. Thank you for using our service. Best regards, The Team.',  // Plain text version
    html: html  // HTML version defined above
  };
  
  try {
    // Sending the email and waiting for the result
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    // If anything goes wrong, show the error
    console.error('Error sending email:', error);
  }
}

// The App Password generated from Google Account: apkn ozao lflo uxhs
// Note: In the code above, we use it without spaces

main();

//recruitment@ilm-ai-ltd.com
//clnk zyyg siyc wuzy
 





//Gmail:  yipy fxzu sgol xwim