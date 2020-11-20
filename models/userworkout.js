'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWorkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserWorkout.belongsTo(models.User)
      UserWorkout.belongsTo(models.Workout)
    }
  };
  UserWorkout.init({
    UserId: DataTypes.INTEGER,
    WorkoutId: DataTypes.INTEGER,
    completeTime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserWorkout',
  });
  return UserWorkout;
};