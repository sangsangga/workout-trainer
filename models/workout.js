'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Workout.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startTime: DataTypes.DATE,
    repetition: DataTypes.INTEGER,
    level: DataTypes.STRING,
    set: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Workout',
  });
  return Workout;
};