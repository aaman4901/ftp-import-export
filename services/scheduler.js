const dms = require('./dms');
const DMS_IMPORT_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

exports.run = async () => {
  try {
    // Scheduling dms import task
    dms.import(); // Running first time
    setInterval(() => {
      dms.import(); // It will run after every 24 hours
    }, DMS_IMPORT_INTERVAL);
  } catch (error) {
    console.log(error);
  }
};
