'use strict';
const { data } = require('autoprefixer');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  registration.init({
    userID: DataTypes.INTEGER,
    competitionID: DataTypes.INTEGER,
    status : DataTypes.STRING,
    vaNumber : DataTypes.STRING,
    order_id : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'registration',
  });
  return registration;
};