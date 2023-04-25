const ftp = require('basic-ftp');
const config = require('../config/config');

exports.downloadFileFromFTP = async (localFile, remotePath) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: config.FTP.HOST,
      user: config.FTP.USER,
      password: config.FTP.PASSWORD
      // secure: true
    });

    // download the remote file located to remotePath and store it to localFile
    await client.downloadToDir(localFile, remotePath);
  } catch (error) {
    console.log(error);
    throw error;
  }
  client.close();
};
