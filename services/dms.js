const path = require('path');
const fs = require('fs');
const ftp = require('./ftp');

const FTP_LOCAL_PATH = path.resolve(__dirname + '/../tempFiles');
const FTP_REMOTE_PATH = 'dealers';

exports.import = async () => {
  try {
    // downloading and storing into local path
    await ftp.downloadFileFromFTP(FTP_LOCAL_PATH, FTP_REMOTE_PATH);

    // read files and perform operations like split('=')
    const files = fs.readdirSync(FTP_LOCAL_PATH);
    console.log(files);

    // insert data to database
    let records = await databaseInstances.dms1.test1.findAll();
    let records2 = await databaseInstances.dms2.test1.findAll();
    console.log(records);
    console.log(records2);
  } catch (error) {
    console.log(error);
  }
};
