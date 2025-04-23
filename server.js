const app = require('./app');
const config = require('./config/env');

const PORT = config.PORT;

// Log environment information
console.log('----------------------------------------');
console.log('Server Environment Configuration:');
console.log(`NODE_ENV: ${config.NODE_ENV}`);
console.log(`PORT: ${PORT}`);
console.log('----------------------------------------');

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('Available Routes:');
  console.log('  - GET  /career-form');
  console.log('  - POST /submit-application');
  console.log('----------------------------------------');
});