const Sequelize = require('sequelize');

const dealers = {
  modelName: 'dealers',
  attributes: {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.CHAR(50),
      allowNull: false
    },
    phone: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    email: {
      type: Sequelize.CHAR(250),
      allowNull: false
    },
    pan_number: {
      type: Sequelize.CHAR(20),
      allowNull: false
    },
    city: {
      type: Sequelize.CHAR(50),
      allowNull: false
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE
    }
  },
  options: {
    tableName: 'dealers',
    timestamps: false,
    indexes: [
      {
        name: 'unique_phone',
        unique: true,
        fields: ['phone']
      },
      {
        name: 'index_name',
        unique: false,
        fields: ['name']
      }
    ]
  }
};
module.exports = dealers;
