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
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Name is required'
          },
        }
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
  );

  Artist.associate = (models) => {
    Artist.hasMany(models.event, {
      as: 'Events'
    });

    Artist.belongsToMany(models.user, {
      through: 'artist_likes'
    });
  };

  return Artist;
};