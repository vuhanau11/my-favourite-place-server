'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class user_like_place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Place, { foreignKey: 'placeId' })
    }
  }
  user_like_place.init(
    {
      placeId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user_like_place',
    }
  )
  return user_like_place
}
