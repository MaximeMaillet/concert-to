'use strict';
const Event = require('./event');

const model = require('../models/index');

module.exports = function(sequelize, DataTypes) {
  const Artist = sequelize.define('artist',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        }
      },
    },
  );

  Artist.associate = (models) => {
    Artist.hasMany(models.event, {
      as: 'Events'
    });
  };

  return Artist;
};