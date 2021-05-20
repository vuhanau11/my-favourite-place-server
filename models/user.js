'use strict'

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: DataTypes.STRING,
    token: DataTypes.STRING,
  })

  user.associate = (models) => {
    user.hasMany(models.Place, { foreignKey: 'userId' })
  }

  return user
}
