const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const config = require('../config/config');
const MODEL_PATH = path.resolve(__dirname + '/../models');

exports.getSqlConnection = () => {
  try {
    let databaseInstances = {};
    config.DATABASE.NAMES.forEach((DATABASE_NAME) => {
      databaseInstances[DATABASE_NAME] = new Sequelize(
        DATABASE_NAME,
        config.DATABASE.CREDENTIALS.USER,
        config.DATABASE.CREDENTIALS.PASSWORD,
        {
          host: config.DATABASE.CREDENTIALS.HOST,
          port: config.DATABASE.CREDENTIALS.PORT,
          dialect: config.DATABASE.CREDENTIALS.DIALECT,
          charset: config.DATABASE.CREDENTIALS.CHARSET,
          collate: config.DATABASE.CREDENTIALS.COLLATE,
          freezeTableName: true,
          // dialectOptions: {
          //   ssl: true,
          //   native: true
          // },
          hooks: {
            beforeCreate(rec, opts) {
              let creationDate = new Date();
              rec.dataValues.created_at = creationDate;
              rec.dataValues.updated_at = creationDate;
            },
            beforeUpdate(rec, options) {
              rec.dataValues.updated_at = new Date();
            },
            beforeBulkCreate(rec, opts) {
              let creationDate = new Date();
              for (let i in rec) {
                rec[i].created_at = creationDate;
                rec[i].updated_at = creationDate;
              }
            },
            beforeBulkUpdate(rec, options) {
              rec.attributes.updated_at = new Date();
              rec.fields.push('updated_at');
            }
          },
          benchmark: false,
          pool: {
            max: 5,
            min: 0,
            idle: 10000,
            acquire: 30000
          }
        }
      );
    });

    // Initializing models here
    const models = fs.readdirSync(MODEL_PATH);
    const dbModels = [];
    models.forEach((model) => {
      if (model.endsWith('.js')) {
        const dbModel = require(`${MODEL_PATH}/${model}`);
        dbModels.push(dbModel);
      }
    });
    for (let databaseInstance in databaseInstances) {
      dbModels.forEach((dbModel) => {
        databaseInstances[databaseInstance][dbModel.modelName] =
          databaseInstances[databaseInstance].define(
            dbModel.modelName,
            dbModel.attributes,
            dbModel.options
          );
      });
    }

    for (let databaseInstance in databaseInstances) {
      databaseInstances[databaseInstance]
        .authenticate()
        .then(() => {
          // databaseInstances[databaseInstance].sync();
          console.log(`connected with database ${databaseInstance}`);
        })
        .catch((error) => {
          console.log(
            `error occured in connecting with database ${databaseInstance}: ${error}`
          );
        });
    }
    return databaseInstances;
  } catch (error) {
    console.log(error);
  }
};
