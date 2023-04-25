const Sequelize = require('sequelize');

const test1 = {
  modelName: 'test1',
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
    tableName: 'test1',
    timestamps: false
  }
};
module.exports = test1;
