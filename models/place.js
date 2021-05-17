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
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 5000],
          msg: 'Mô tả địa điểm không được quá 5000 ký tự',
        },
      },
    },
    longitude: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: true,
        len: {
          args: [0, 255],
          msg: 'Kinh độ không được quá 255 ký tự',
        },
      },
    },
    latitude: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: true,
        len: {
          args: [0, 255],
          msg: 'Vĩ độ không được quá 255 ký tự',
        },
      },
    },
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
  }

  return place
}
