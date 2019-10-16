"use strict";

var uuid = require('uuid/v4');

module.exports = function (sequelize, DataTypes) {
  var Card = sequelize.define('card', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: function defaultValue() {
        return uuid();
      }
    },
    name: {
      type: DataTypes.STRING,
      length: 60,
      allowNull: false
    },
    description: DataTypes.TEXT
  }, {
    freezeTableName: true
  });

  Card.associate = function (models) {
    Card.belongsTo(models.list);
  };

  return Card;
};