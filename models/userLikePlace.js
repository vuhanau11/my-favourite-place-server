'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class user_like_place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  user_like_place.init(
    {
      place_id: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user_like_place',
    }
  )
  return user_like_place
}
