// Loading environment variables from .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

const config = require('./config/config.js');
const app = require('express')();
const { getSqlConnection } = require('./services/sequelize.js');
const fs = require('fs');
const scheduler = require('./services/scheduler.js');

// Database connections
global.databaseInstances = getSqlConnection();

// Creating tempFiles folder to store files
if (!fs.existsSync('./tempFiles')) {
  fs.mkdirSync('./tempFiles');
}

// Running scheduler
scheduler.run();

app.listen(config.SERVER_PORT, () => {
  console.log(`Server is working at ${config.SERVER_PORT}`);
});
