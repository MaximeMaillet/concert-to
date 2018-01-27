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
        unique: {
          args: true,
          msg: 'Your email is already in use'
        },
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Email is required'
          },
          isEmail: {
            args: true,
            msg: 'Your email is invalid'
          },
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Password is required'
          },
          min: {
            args: 5,
            msg: 'You should have password with 5 chars. minimum'
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'User name is required'
          }
        }
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