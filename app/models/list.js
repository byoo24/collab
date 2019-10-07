"use strict";

var uuid = require('uuid/v4');

module.exports = function (sequelize, DataTypes) {
  var List = sequelize.define('list', {
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
    cardIds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
  }, {
    freezeTableName: true
  });

  List.associate = function (models) {
    List.belongsTo(models.board);
    List.hasMany(models.card);
  };

  return List;
};