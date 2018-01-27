'use strict';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Your email is invalid'
          },
          notEmpty: true,
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: (user) => {
          if (user.changed('password')) {
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeBulkUpdate: (user) => {
          if (user.fields.indexOf('password') !== -1) {
            user.attributes.password = bcrypt.hashSync(user.attributes.password, salt);
          }
        }
      }
    }
  );
  return User;
};