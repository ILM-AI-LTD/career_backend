const multer = require('multer');

// Configure storage for in-memory file handling
console.log('📁 Configuring file upload storage...');
const storage = multer.memoryStorage();

// File filter to allow only PDFs and documents
const fileFilter = (req, file, cb) => {
  // Log file validation
  console.log('----------------------------------------');
  console.log('Validating uploaded file:');
  console.log(`  Filename: ${file.originalname}`);
  console.log(`  Mimetype: ${file.mimetype}`);

  // Accept PDF, DOC, DOCX files
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    console.log('File type accepted');
    console.log('----------------------------------------');
    cb(null, true);
  } else {
    console.log('File type rejected');
    console.log('----------------------------------------');
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;