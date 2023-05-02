const path = require('path');
const fs = require('fs');
const ftp = require('./ftp');
const csv = require('csvtojson');

const FTP_LOCAL_PATH = path.join(__dirname + '/../ftpLocalFiles');
const FTP_REMOTE_PATH = 'ftpRemoteFiles';
const FTP_FILE_NAME = 'dealers.csv';

exports.import = async () => {
  try {
    // Downloading and storing into local path
    await ftp.downloadFileFromFTP(FTP_LOCAL_PATH, FTP_REMOTE_PATH);

    // Reading files and performing operations like split('=')
    const dealerFilePath = `${FTP_LOCAL_PATH}/${FTP_FILE_NAME}`;
    const dealersData = await csv().fromFile(dealerFilePath);
    console.log(dealersData);

    // Inserting data to database
    let dealers = await databaseInstances.dms1.dealers.bulkCreate(dealersData, {
      updateOnDuplicate: ['name', 'email', 'pan_number', 'city', 'address']
    });
    console.log(dealers);

    // Removing excel file from server storage
    // fs.unlinkSync(dealerFilePath);
  } catch (error) {
    console.log(error);
  }
};
