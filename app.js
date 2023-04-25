// Loading environment variables from .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

const config = require('./config/config.js');

const app = require('express')();
app.listen(config.SERVER_PORT, () => {
  console.log(`Server is working at ${config.SERVER_PORT}`);
});

const { getSqlConnection } = require('./services/sequelize.js');
global.databaseInstances = getSqlConnection();

const fs = require('fs');
const dms = require('./services/dms.js');

// Creating tempFiles folder to store files
if (!fs.existsSync('./tempFiles')) {
  fs.mkdirSync('./tempFiles');
}

dms.import();
