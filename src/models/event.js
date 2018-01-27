'use strict';

module.exports = function(sequelize, DataTypes) {
  const Event = sequelize.define('event',
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
      date_start: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isNull: false,
        }
      },
      date_end: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isNull: true,
        }
      }
    }
  );

  return Event;
};