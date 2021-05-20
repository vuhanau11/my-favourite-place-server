'use strict'

module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define('Place', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Tên địa điểm không được để trống',
        },
        len: {
          args: [0, 255],
          msg: 'Tên địa điểm không được quá 255 ký tự',
        },
      },
    },
    description: DataTypes.TEXT,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    image: DataTypes.STRING,
    status: DataTypes.INTEGER,
    userId: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: true,
        isInt: true,
      },
    },
  })

  place.associate = (models) => {
    place.belongsTo(models.User, { foreignKey: 'userId' })
    place.hasMany(models.user_like_place, { foreignKey: 'placeId' })
  }

  return place
}
