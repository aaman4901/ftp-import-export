module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  DATABASE: {
    CREDENTIALS: {
      USER: process.env.DATABASE_USER,
      PASSWORD: process.env.DATABASE_PASSWORD,
      HOST: process.env.DATABASE_HOST,
      PORT: process.env.DATABASE_PORT,
      DIALECT: process.env.DATABASE_DIALECT,
      SEQUELIZE_ALTER: process.env.DATABASE_DATABASE_SEQUELIZE_ALTERNAME,
      CHARSET: process.env.DATABASE_CHARSET,
      COLLATE: process.env.DATABASE_COLLATE
    },
    NAMES: [process.env.DATABASE_NAME1, process.env.DATABASE_NAME2]
  },
  FTP: {
    HOST: process.env.FTP_HOST,
    USER: process.env.FTP_USER,
    PASSWORD: process.env.FTP_PASSWORD
  }
};
