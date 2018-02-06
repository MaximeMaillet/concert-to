const model = require('../models/index');
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

  User.prototype.isValidPassword = (goodPassword, password) => {
    return bcrypt.compareSync(password, goodPassword);
  };

  const ArtistLikes = sequelize.define('artist_likes', {

  }, {
    hooks: {
      afterBulkCreate: (entity) => {
        const elasticHook = require('../helpers/index').elasticHook;
        elasticHook.addArtistLike(entity[0].dataValues.artistId, entity[0].dataValues.userId);
      },
      afterBulkDelete: (entity) => {
        const elasticHook = require('../helpers/index').elasticHook;
        elasticHook.removeArtistLike(entity.where.artistId[0], entity.where.userId);
      }
    }
  });

  User.associate = (models) => {
    User.belongsToMany(models.artist, {
      through: ArtistLikes,
      as: 'Likes',
    });
  };

  return User;
};