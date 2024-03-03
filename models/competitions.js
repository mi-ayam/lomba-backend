'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class competitions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  competitions.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    registration_fee: DataTypes.INTEGER,
    prize: DataTypes.INTEGER,
    registration_deadline: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'competitions',
  });
  return competitions;
};