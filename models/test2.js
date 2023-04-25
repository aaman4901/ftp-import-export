const Sequelize = require('sequelize');

const test2 = {
  modelName: 'test2',
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(50)
    }
  },
  options: {
    tableName: 'test2',
    timestamps: false
  }
};
module.exports = test2;
