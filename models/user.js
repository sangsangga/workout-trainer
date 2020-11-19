'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Workout,{through:'UserWorkouts'})
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    weigth: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance,option)=>{
    instance.password = bcrypt.hashSync(instance.password)
  })
  return User;
};