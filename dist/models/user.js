"use strict";

var uuid = require('uuid/v4');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: function defaultValue() {
        return uuid();
      }
    },
    username: {
      type: DataTypes.STRING,
      length: 60,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      length: 60,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      length: 60,
      allowNull: false
    },
    personalBoardIds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
  }, {
    freezeTableName: true
  });

  User.associate = function (models) {
    User.hasMany(models.board);
  };

  return User;
};